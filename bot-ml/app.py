#import required packages
from flask import Flask, request, send_file
import pickle
import logging

def create_bot_app():

    #create a Flask object
    app = Flask("bot_model")

    #load the ml model which we have saved earlier in .pkl format
    model = pickle.load(open('decision-tree-bot-model.pkl', 'rb'))

    @app.route("/heartbeatCheck", methods=['GET'])
    def heartbeatCheck():
        return "Hi there! The service is up and running"


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
            print("From ML: ", flush = True)
            print(request.get_json(), flush=True)

            screen_name = request.values.get('screen_name')
            print("screen name:")
            print(screen_name )
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


    @app.route("/getNerdStats", methods=['GET'])
    def getNerdStats():
        filename = "Correlationdata.png"
        return send_file(filename, mimetype='image/gif')


# The dense or sparsenes of this regular expression plot displays that fact that bot have less friends and ends up following others.
    @app.route("/getBotNonBotPlot", methods=['GET'])
    def getBotNonBotPlot():
        filename = "./images/plot.png"
        return send_file(filename, mimetype='image/gif')

# Spearman's correlation coefficient, (ρ, also signified by rs) measures the strength and direction of association between two ranked variables.
# This image provides how each of feature is ranked/weighed against the other. 
# verified, listed_count, friends_count, followers_count have found to have strong correlation.
    @app.route("/getCorrelationData", methods=['GET'])
    def getCorrelationData():
        filename = "./images/Correlationdata.png"
        return send_file(filename, mimetype='image/gif')


# Among other features, teh top 5 featues carrying maximum weight in determining the bot'ness of a user
    @app.route("/getTop5Features", methods=['GET'])
    def getTop5Features():
        filename = "./images/top5features.png"
        return send_file(filename, mimetype='image/gif')

# This tree structure defines into how many leafs and depth the classfier went along with feature weightage to arrive at classifying a bot vs non bot
    @app.route("/getDecisionTree", methods=['GET'])
    def getDecisionTree():
        filename = "./images/DecisionTree.png"
        return send_file(filename, mimetype='image/gif')

# The ROC curve is plotted with TPR against the FPR where TPR is on the y-axis and FPR is on the x-axis.
# It is one of the most important evaluation metrics for checking any classification model’s performance.
#  A good ROC curve here indicates that the probability of fidning the bot is high
    @app.route("/getROCCurve", methods=['GET'])
    def getROCCurve():
        filename = "./images/ROCCurve.png"
        return send_file(filename, mimetype='image/gif')

#The confusion_matrix function evaluates classification accuracy by computing the confusion matrix with each row corresponding to 
# the true class (Wikipedia and other references may use different convention for axes).
# By definition, entry  in a confusion matrix is the number of observations actually in group , but predicted to be in group .
    @app.route("/getNormalizedConfusionMatrix", methods=['GET'])
    def getNormalizedConfusionMatrix():
        filename = "./images/ConfusionMtrx-normalized.png"
        return send_file(filename, mimetype='image/gif')

#A default or denormalized confusion matrix
    @app.route("/getDeNormalizedConfusionMatrix", methods=['GET'])
    def getDeNormalizedConfusionMatrix():
        filename = "./images/ConfusionMtrx-not-normalized.png"
        return send_file(filename, mimetype='image/gif')

    return app

    

if __name__=="__main__":
    app = create_bot_app()
#     #run method starts our web service
#     #Debug : as soon as I save anything in my structure, server should start again
    app.run(debug=True, host='0.0.0.0', port=5002)