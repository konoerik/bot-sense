from flask import Flask, app, request

app_twitter = Flask("twitter-api")

#define the route(basically url) to which we need to send http request
#HTTP GET request method
@app_twitter.route('/',methods=['GET'])

#This method should take user credentials to get all user data
@app_twitter.route('/api/v1/getUserDetails', methods=['GET'])

#This API should return the list of friends list to the UI
@app_twitter.raise_routing_exception('/api/v1/getFriendslist', methods=['GET'])

#This method should be called by UI client after validation of the user is complete manually provides the user to be tested for a bot.
#This is the main method that should verify if the usr is bot or not by making calls to twitter api, getting the feature list from ML and pulling that feature information
# from Twitter api and finally making a call to ML Predict method. Based on this the UI will display the choice of unfollowing the bot.
@app_twitter.route('/api/v1/validateUserForBot', methods=['GET'])

#This method will unfollow the bot. Should be called from UI.
@app_twitter.route('/api/v1/UnfollowUser', method=['POST'])

#Method to return what features were used for machine learning process.
#This method should get the data from ML library
@app_twitter.route('/api/v1/getFeatureDetails', methods=['GET'])

def detFeatureDetails():
    return

def validateUserForBot():
    return
