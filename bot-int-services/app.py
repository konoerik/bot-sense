from flask import Flask, request, render_template

import requests
import logging

#create a Flask object
app = Flask("bot_int_services")

s_handler = logging.StreamHandler()
s_handler.setLevel(logging.INFO)
app.logger.addHandler(s_handler)

#define the route(basically url) to which we need to send http request
#HTTP GET request method
@app.route('/',methods=['GET'])

#create a function Home that will return index.html(which contains html form)
#index.html file is created seperately
def Home():
    return render_template('index.html')

@app.route('/testPredict', methods=['GET','POST'])
def testPredict():
    if request.method == 'POST':
        screen_name = request.form['screen_name']
        followers_count = int(request.form['followers_count'])
        friends_count = int(request.form['friends_count'])
        verified = request.form['verified']
        statuses_count = int(request.form['statuses_count'])
        listed = request.form['listed']
        verified = False
        listed_count_binary = False
        # print("screenName:" + screen_name)
        # print("followers_count:" + str(followers_count))

        post_data = {'screen_name': request.form['screen_name'], 'followers_count':int(request.form['followers_count']), 'friends_count':int(request.form['friends_count']),
                    'verified':  request.form['verified'], 'listed_count_binary':'False', 'statuses_count': int(request.form['statuses_count']), 'listed':request.form['listed']}

        print(post_data)
        response = requests.post("http://bot-ml:5002/predict", post_data)
        print(response.content, flush=True)

        return render_template('index.html',prediction_text=response.content)
    else:
         return render_template('index.html')



def callMLService():
    response = requests.get("http://localhost:5000/helloWorld")
    logging.info(response.content)


if __name__=="__main__":
#     #run method starts our web service
#     #Debug : as soon as I save anything in my structure, server should start again
    app.run(debug=True, host='0.0.0.0', port=5001)
