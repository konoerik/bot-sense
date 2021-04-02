#import required packages
from flask import Flask, render_template, request
import jsonify
import requests
import pickle
import numpy as np
import sklearn
from sklearn.preprocessing import StandardScaler
import logging

#create a Flask object
app = Flask("bot_model")

#load the ml model which we have saved earlier in .pkl format
model = pickle.load(open('decision-tree-bot-model.pkl', 'rb'))

@app.route("/helloWorld", methods=['GET'])
def helloWorld():
    return "Hi there!"


#HTTP POST request method
#define the route for post method 
@app.route("/predict", methods=['POST'])

#define the predict function which is going to predict the results from ml model based on the given values through html form
def predict():
    #Fuel_type_Petrol is used in the html form and therefore we are initiating Fuel_Type_Diesel as zero 
    Fuel_Type_Diesel=0
    if request.method == 'POST':
        #Use request.form to get the data from html form through post method.
        #these all are nothing but features of our dataset(ml model)
        # print(request.values)
        # print(json_data, flush=True)
        # print("TRYING VALUES NOW", flush=True)
        # print(request.values.get('screen_name'), flush=True)
        
        screen_name = request.values.get('screen_name')
        followers_count = request.values.get('followers_count')
        friends_count = request.values.get('friends_count')
        verified = request.values.get('verified')
        listed = request.values.get('listed')
        verified = False
        listed_count_binary = False


        statuses_count = request.values.get('statuses_count')
        print("statuses_count:")
        print(statuses_count)

        if verified == "True":
             verified = True

        if listed == "True":
            listed_count_binary = True
     
        screen_name_binary = True
        name_binary = False
        description_binary = False
        status_binary = True
    
        prediction=model.predict([[screen_name_binary, name_binary, description_binary, status_binary, verified, followers_count, friends_count, statuses_count, listed_count_binary]])
        app.logger.info(prediction)
        output=round(prediction[0],2)
        
        #condition for invalid values
        if output<0:
            # return render_template('index.html',prediction_text="Sorry, Not enough detail")
            return "Sorry, Not enough detail"
        
        #condition for prediction when values are valid
        else:
            # return render_template('index.html',prediction_text="Is the user a bot? : {}".format("True" if output == 1 else "False"))
            return "Is the user a bot? : {}".format("True" if output == 1 else "False")

        
    #html form to be displayed on screen when no values are inserted; without any output or prediction
    else:
        return "index.html"


if __name__=="__main__":
#     #run method starts our web service
#     #Debug : as soon as I save anything in my structure, server should start again
    app.run(debug=True, host='0.0.0.0', port=5002)
