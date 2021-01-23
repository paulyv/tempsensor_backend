import adafruit_dht
import time
import board
import multiprocessing
import json
import datetime
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

dhtSensor = adafruit_dht.DHT22(board.D4)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def worker():
    data = {}
    data['temperatures'] = []
    data['humidities'] = []
    while True:

        humidity, temperature = sensor()
        if humidity == 0 or humidity == 'null' or temperature == 0 or temperature == 'null':
                time.sleep(0.5)
                humidity, temperature = sensor()
        timestamp = datetime.datetime.now().isoformat()
        data['temperatures'].append({'x': timestamp, 'y': temperature})
        data['humidities'].append({'x': timestamp, 'y': humidity})
        with open('data.json', 'w') as outfile:
            json.dump(data, outfile)
        time.sleep(120)

def sensor():
        humidity = 0
        temperature = 0
        try:
                humidity = dhtSensor.humidity
                temperature = dhtSensor.temperature
        except RuntimeError:
                print("Could not get the readings")
        return humidity, temperature

@app.route('/')
def index():
        return "Hello Temperature Station"

@app.route('/api/sensors/bedroom/data')
@cross_origin()
def data():
        humidity, temperature = sensor()
        if humidity == 0 or temperature == 0:
                time.sleep(0.5)
                humidity, temperature = sensor()

        return jsonify(humidity=humidity, temperature=temperature)

@app.route('/api/sensors/bedroom/history')
@cross_origin()
def historical_data():
    with open('data.json') as json_file:
        data = json.load(json_file)
    return jsonify(data)



if __name__ == '__main__':
        p = multiprocessing.Process(target=worker)
        p.start()
        app.run(port=3000, host='0.0.0.0')
