#!/usr/bin/env python
# coding: utf-8

# # Install at CMD

# pip install flask
# pip install tweepy
# pip install flask-restful
# pip install python-dotenv

# # User Authentication Endpoint

# In[1]:


from flask import Flask, render_template, request, redirect, session, jsonify
from flask_restful import Api, Resource
from dotenv import load_dotenv
from os import environ
import json
import tweepy
import webbrowser
load_dotenv()

# Flask object is generated and developer keys are assigned
app = Flask(__name__)
callbackurl = 'http://127.0.0.1:5000/callback'
consumer_key = environ['consumer_key']
consumer_secret = environ['consumer_secret']

# Redirect to twitter authentication
@app.route('/')
def auth():
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret, callbackurl)
    return redirect(auth.get_authorization_url())

# Assigns and sets users key and secret then redirects to a url
@app.route('/callback')
def botsense_callback():
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret, callbackurl)
    token = request.args.get('oauth_token')
    verifier = request.args.get('oauth_verifier')
    auth.request_token = {'oauth_token': token,
                             'oauth_token_secret': verifier}
    auth.get_access_token(verifier)
    key = auth.access_token
    secret = auth.access_token_secret
    session['key'] = key
    session['secret'] = secret
    
    #return render_template('home.html')
    
    # TESTING
    #return redirect('/api/v1/friendsList')
    return redirect('/api/v1/followerList')
    #return redirect('/api/v1/unfollowUser')
    #return redirect('/api/v1/blockUser')
    #return redirect('/api/v1/predict')


# # Friends List Endpoint

# In[2]:


@app.route('/api/v1/friendsList', methods = ['GET'])
def friendsList():   
    key = session['key']
    secret = session['secret']
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(key, secret)
    api = tweepy.API(auth)
    
    # TEST: Using friends to create custom dictionary for 1 friend
    friends = tweepy.Cursor(api.friends).items(1)
    
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
    
    return json.dumps(userInfo)


# # Follower List Endpoint

# In[3]:


@app.route('/api/v1/followerList', methods = ['GET'])
def followerList():   
    key = session['key']
    secret = session['secret']
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(key, secret)
    api = tweepy.API(auth)
    
    # TEST: Using followers to create custom dictionary for 1 follower
    followers = tweepy.Cursor(api.followers).items(1)
    
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
    
    return json.dumps(userInfo)


# # Unfollow User Endpoint (Not tested)

# In[4]:


@app.route('/api/v1/unfollowUser', methods = ['POST'])
def unfollowUser():
    key = session['key']
    secret = session['secret']
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(key, secret)
    api = tweepy.API(auth)
    
    #For 1 user
    screen_name = request.form['screen_name']
    api.destroy_friendship(screen_name)


# # Block User Endpoint (Not tested)

# In[5]:


@app.route('/api/v1/blockUser', methods = ['POST'])
def blockUser():
    key = session['key']
    secret = session['secret']
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(key, secret)
    api = tweepy.API(auth)

    #For 1 user
    screen_name = request.form['screen_name']
    api.create_block(screen_name)


# # Predict Endpoint (Not tested)

# In[6]:


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


# In[7]:


#@app.route('/api/v1/Userlist', methods = ['GET'])
#def Userlist():   
#    key = session['key']
#    secret = session['secret']
#    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
#    auth.set_access_token(key, secret)
#    api = tweepy.API(auth)
    
    # Assigns friends and follower user objects from twitter to variables
#    friends = tweepy.Cursor(api.friends).items(20)
#    followers = tweepy.Cursor(api.followers).items(20)
    
    # Creates a list of screen_names from the follower and friend user objects
#    friendList = [user.screen_name for user in friends]
#    followerList = [user.screen_name for user in followers]
    
    # Combines lists and removes duplicates if any exist
#    knownUsers = friendList + followerList
#    knownUsers = list(set(knownUsers))
    
#    return json.dumps(knownUsers)


# # Main

# In[ ]:


if __name__=='__main__':
    app.secret_key = environ['sessions_key']
    app.run(debug=False)

