import pytest
# from pytest_bdd import scenarios, given, when, then, parsers
# import requests
from app import create_bot_app
import json

@pytest.fixture
def client():
    app_client = create_bot_app()
    # app_client.config['TESTING'] = True
    with app_client.test_client() as c:
        yield c

def testHealth(client):
    retVal = client.get("/heartbeatCheck")
    compareVal = "Hi there! The service is up and running"
    assert retVal.data.decode('UTF-8')==compareVal 

#Test case to predict a true bot
def testPredictBot(client):
    mimetype = 'application/json'
    header_val = { 'Content-Type': 'application/json' }
    # data = {'screen_name': 'kernyeahx', 'followers_count': '1291', 'friends_count': '10', 
    #     'verified': 'True', 'listed_count_binary': 'False', 'statuses_count': '78554', 'listed': 'True'}
    data = {'screen_name': 'gerardcastill', 'followers_count': '4', 'listed_count_binary': 'False', 
          'verified': 'False', 'friends_count': '4', 'listed_count': '0', 'statuses_count': '60', 'listed': 'True'}

    retval = client.post('/predict', data = dict(data))
    print("--------------------")
    print("Retval:" + retval.data.decode('UTF-8'))
    # assert 'True' in retval.data.decode('UTF-8')

#Test case to predict a non bot
def testPredictNonBot(client):
    mimetype = 'application/json'
    header_val = { 'Content-Type': 'application/json' }
    data = {'screen_name': 'kernyeahx', 'followers_count': '1291', 'friends_count': '100', 
        'verified': 'True', 'listed_count_binary': 'False', 'statuses_count': '785', 'listed': 'True'}
    retval = client.post('/predict', data = dict(data))
    assert 'False' in retval.data.decode('UTF-8')

#Test for Classification images

def testGetBotNonBotPlot(client):
    mimetype='image/gif'
    imageUrls = ['getBotNonBotPlot','getCorrelationData','getTop5Features','getDecisionTree','getROCCurve',
                'getNormalizedConfusionMatrix','getDeNormalizedConfusionMatrix']
    for url in imageUrls:
        print("Testing URL {}".format(url))
        retVal = client.get('/{}'.format(url))
        assert retVal.headers.get('Content-Type')==mimetype

