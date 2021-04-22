from flask import Flask, render_template, request, redirect, session, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from flask import jsonify
from dotenv import load_dotenv
from os import environ
import time
import json
import requests
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
PROFILE_INFO = None

@app.route('/')
def home():
    return jsonify("This is the home page")

@app.route('/api/v1/auth', methods=['GET'])
def auth():
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    return jsonify(auth.get_authorization_url())

@app.route('/callback')
def botsense_callback():
    global ACCESS_TOKEN, ACCESS_TOKEN_SECRET, API, PROFILE_INFO
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

@app.route('/api/v1/apiReady', methods=['GET'])
def api_ready():  
    while API == None:
        time.sleep(0.5)
    return jsonify("Ready")

@app.route('/api/v1/profile', methods=['GET'])
def profile():  
    PROFILE_INFO = API.me()._json
    return jsonify(PROFILE_INFO)

@app.route('/api/v1/getUser', methods=['POST'])
def getUser():  
    user = API.destroy_friendship(request.json['screen_name'])
    userInfo = []   # Keeping it as a list, in line with other previous APIs
    userFeatures = {}
    userFeatures["name"] = user.name
    userFeatures["profile_image_url_https"] = user.profile_image_url_https
    userFeatures["screen_name"] = user.screen_name
    userFeatures["followers_count"] = user.followers_count
    userFeatures["friends_count"] = user.followers_count
    userFeatures["verified"] = user.verified
    userFeatures["statuses_count"] = user.statuses_count
    userFeatures["listed_count"] = user.listed_count
    userInfo.append(userFeatures)
    return jsonify(userInfo)

@app.route('/api/v1/friendsList', methods = ['GET'])
def friendsList():
    # TEST: Using friends to create custom dictionary for 1 friend
    friends = tweepy.Cursor(API.friends).items(10)
    
    # Creates a dictionary for every user and appends it to the userInfo list
    userInfo = []
    for user in friends:
        userFeatures = {}
        userFeatures["name"] = user.name
        userFeatures["profile_image_url_https"] = user.profile_image_url_https
        userFeatures["screen_name"] = user.screen_name
        userFeatures["followers_count"] = user.followers_count
        userFeatures["friends_count"] = user.followers_count
        userFeatures["verified"] = user.verified
        userFeatures["statuses_count"] = user.statuses_count
        userFeatures["listed_count"] = user.listed_count
        userInfo.append(userFeatures)
    
    return jsonify(userInfo)

@app.route('/api/v1/followersList', methods = ['GET'])
def followersList():   
    # TEST: Using followers to create custom dictionary for 1 follower
    followers = tweepy.Cursor(API.followers).items(10)
    
    # Creates a dictionary for every user and appends it to the userInfo list
    userInfo = []
    for user in followers:
        userFeatures = {}
        userFeatures["name"] = user.name
        userFeatures["profile_image_url_https"] = user.profile_image_url_https
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
    try:
        API.destroy_friendship(request.json['screen_name'])
        return jsonify("Successfully unfollowed!")
    except tweepy.error.TweepError as e:
        return jsonify("Error Occured: {}".format(e.args))
    

@app.route('/api/v1/blockUser', methods = ['POST'])
def blockUser():
    try:
        API.create_block(request.json['screen_name'])
        return jsonify("Successfully blocked!")
    except tweepy.error.TweepError as e:
        return jsonify("Error Occured: {}".format(e.args))


@app.route('/api/v1/predict', methods = ['POST'])
def predict():
    user_info = request.json
    rsp = requests.post("http://localhost:5002/predict", data=user_info)
    return jsonify(rsp._content.decode('ascii'))

if __name__ == '__main__':
    app.run(debug=True)
