from flask import Flask, render_template, request, redirect, session, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from flask import jsonify
from dotenv import load_dotenv
from os import environ
import json
import tweepy
import webbrowser
import uuid
load_dotenv()

# Create Flask app
app = Flask('IntegrationServices')
app.secret_key = str(uuid.uuid1())
CORS(app)

# From developer.twitter.com/botsense
CONSUMER_KEY = 'L2l43uNjk2Hm6ouTq23so8IuG'
CONSUMER_SECRET = 'krKx9txNzaBrkcGeUfSfGhiJhY5NdU3m3K8qe3sAwkRlfGhcMv'
ACCESS_TOKEN = None
ACCESS_TOKEN_SECRET = None
CALLBACKURL = 'http://127.0.0.1:5000/callback'
API = None

@app.route('/')
def home():
    return jsonify("This is the home page")

# @app.route('/auth')
# def auth():
#     auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
#     return jsonify(auth.get_authorization_url())

@cross_origin()
@app.route('/api/v1/auth', methods=['GET'])
def auth():
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    return jsonify(auth.get_authorization_url())

@app.route('/callback')
def botsense_callback():
    global ACCESS_TOKEN, ACCESS_TOKEN_SECRET, API
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET, CALLBACKURL)
    token = request.args.get('oauth_token')
    verifier = request.args.get('oauth_verifier')
    auth.request_token = {'oauth_token': token,
                             'oauth_token_secret': verifier}
    auth.get_access_token(verifier)
    key = auth.access_token
    secret = auth.access_token_secret
    session['key'] = key
    session['secret'] = secret
    ACCESS_TOKEN = key
    ACCESS_TOKEN_SECRET = secret
    API = tweepy.API(auth)
    
    return "All done! This would not even be visible in production environment!"

@cross_origin()
@app.route('/api/v1/friendsList', methods = ['GET'])
def friendsList():
    # TEST: Using friends to create custom dictionary for 1 friend
    friends = tweepy.Cursor(API.friends).items(1)
    
    # Creates a dictionary for every user and appends it to the userInfo list
    userInfo = []
    for user in friends:
        userFeatures = {}
        userFeatures["screen_name"] = user.screen_name
        userFeatures["followers_count"] = user.followers_count
        userFeatures["friends_count"] = user.followers_count
        userFeatures["verified"] = user.verified
        userFeatures["statuses_count"] = user.statuses_count
        userFeatures["listed_count"] = user.listed_count
        userInfo.append(userFeatures)
    
    return jsonify(userInfo)

@app.route('/api/v1/followerList', methods = ['GET'])
def followerList():   
    # TEST: Using followers to create custom dictionary for 1 follower
    followers = tweepy.Cursor(API.followers).items(1)
    
    # Creates a dictionary for every user and appends it to the userInfo list
    userInfo = []
    for user in followers:
        userFeatures = {}
        userFeatures["screen_name"] = user.screen_name
        userFeatures["followers_count"] = user.followers_count
        userFeatures["friends_count"] = user.followers_count
        userFeatures["verified"] = user.verified
        userFeatures["statuses_count"] = user.statuses_count
        userFeatures["listed_count"] = user.listed_count
        userInfo.append(userFeatures)
    
    return jsonify(userInfo)

@app.route('/api/v1/unfollowUser', methods = ['POST'])
def unfollowUser():
    #For 1 user
    screen_name = request.form['screen_name']
    API.destroy_friendship(screen_name)

@app.route('/api/v1/blockUser', methods = ['POST'])
def blockUser():
    #For 1 user
    screen_name = request.form['screen_name']
    API.create_block(screen_name)

@app.route('/api/v1/predict', methods = ['POST'])
def predict():
    screen_name = request.form['screen_name']
    followers_count = int(request.form['followers_count'])
    friends_count = int(request.form['friends_count'])
    verified = request.form['verified']
    statuses_count = int(request.form['statuses_count'])
    listed = request.form['listed']
    listed_count_binary = False

    #For 1 user
    post_data = {'screen_name': request.form['screen_name'], 'followers_count':int(request.form['followers_count']), 'friends_count':int(request.form['friends_count']),
                'verified':  request.form['verified'], 'listed_count_binary':'False', 'statuses_count': int(request.form['statuses_count']), 'listed':request.form['listed']}

    return requests.post("http://bot-ml:5002/predict", post_data)

if __name__ == '__main__':
    app.run(debug=True)
