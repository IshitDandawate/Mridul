
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import sys
import time
from transformers import pipeline

app = Flask(__name__)
CORS(app)
print("Starting this app")

distilled_student_sentiment_classifier = pipeline(
    model="lxyuan/distilbert-base-multilingual-cased-sentiments-student", 
    return_all_scores=True
)

def delayTime(t):
    tstart = time.time()
    while(time.time() - tstart < t):
        pass

@app.route("/")
def hello():
    print('Hello', file=sys.stdout)
    return "Hello I'm under the water"

@app.route("/dataLogger", methods = ['GET', 'POST'])
def dataLogger():
    print('DataLogger', file=sys.stdout)
    if(request.method == 'POST'):
        print(request.json, file=sys.stdout)
        Answer = {"Title": "Good"}
        return Answer
    return "Good to go :)"

@app.route("/sentiment", methods = ['POST'])
def sentiment():
    print(request.json, file=sys.stdout)
    sent = distilled_student_sentiment_classifier(request.json['Title'])
    Answer = {"Title": sent[0]}
    return Answer

@app.route("/echo", methods = ['GET', 'POST'])
def echo():
    Req = request.json
    print('Echo {0}'.format(Req), file=sys.stdout)
    sent = distilled_student_sentiment_classifier(Req['Title'].lower())
    Answer = {"echo": sent[0]}
    return Answer

if __name__ == "__main__":
    app.run(debug = False, port = 5050)