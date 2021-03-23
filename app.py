import time
import board
import multiprocessing
from multiprocessing import Value, Lock
import json
import datetime
import adafruit_dht
from flask import Flask, jsonify, render_template, send_from_directory
from flask_cors import CORS, cross_origin

dhtSensor = adafruit_dht.DHT22(board.D4)

app = Flask(__name__, static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def worker(file_in_use):
    data = {}
    data['temperatures'] = []
    data['humidities'] = []
    while True:
        humidity, temperature = sensor()
        if humidity == 0 or humidity == 'null' or temperature == 0 or temperature == 'null':
                time.sleep(0.5)
                humidity, temperature = sensor()

        timestamp = datetime.datetime.now().isoformat()

        if temperature == 'null' or humidity == 'null':
            continue

        print("hum: " + str(humidity) + " temp: " + str(temperature))
        data['temperatures'].append({'x': timestamp, 'y': temperature})
        data['humidities'].append({'x': timestamp, 'y': humidity})

        file_in_use.value = 1

        try:
            with open('data.json', 'w') as outfile:
                json.dump(data, outfile)
        except EnvironmentError:
            print("Unable to save data.json")

        file_in_use.value = 0

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

@app.route("/")
def hello():
    return app.send_static_file('index.html')


@app.route('/api/sensors/house/current_data')
@cross_origin()
def data():
        humidity, temperature = sensor()
        if humidity == 0 or temperature == 0:
                time.sleep(0.5)
                humidity, temperature = sensor()

        print("hum: " + str(humidity) + " temp: " + str(temperature))
        return jsonify(humidity=humidity, temperature=temperature)

@app.route('/api/sensors/house/history_data')
@cross_origin()
def historical_data():
    global file_in_use
    if bool(file_in_use) is True:
        print("file in use, waiting 2 secs")
        time.sleep(2)

    with open('data.json') as json_file:
        data = json.load(json_file)

    return jsonify(data)


if __name__ == '__main__':
    global file_in_use
    file_in_use = Value('i', 0)
    p = multiprocessing.Process(target=worker, args=(file_in_use, ))
    p.start()
    app.run(port=3001, host='0.0.0.0')
