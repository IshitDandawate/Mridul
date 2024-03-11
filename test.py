from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import sys
import time

app = Flask(__name__)
CORS(app)

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
        Answer = {"title": "Good"}
        return Answer
    return "Good to go :)"

@app.route("/echo", methods = ['GET', 'POST'])
def echo():
    delayTime(1)
    Req = request.json
    print('Echo {0}'.format(Req), file=sys.stdout)
    return Req

if __name__ == "__main__":
    app.run()