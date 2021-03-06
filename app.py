import time
import board
import multiprocessing
from multiprocessing import Value, Lock
import json
import datetime
import adafruit_dht
from flask import Flask, jsonify, render_template
from flask_cors import CORS, cross_origin

dhtSensor = adafruit_dht.DHT22(board.D4)

app = Flask(__name__, static_folder='./build/static/', template_folder='./build', static_url_path='/static')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def worker(file_in_use):
    data = {}
    data['temperatures'] = []
    data['humidities'] = []
    while True:
        #if len(data['temperatures']) > 500, data.pop(0)
        humidity, temperature = sensor()
        if humidity == None or temperature == None:
                time.sleep(0.5)
                humidity, temperature = sensor()

        timestamp = datetime.datetime.now().isoformat()

        if temperature == None or humidity == None:
            continue

        print("current hum: " + str(humidity) + "current temp: " + str(temperature))

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
        humidity = None
        temperature = None
        try:
                humidity = dhtSensor.humidity
                temperature = dhtSensor.temperature
        except RuntimeError:
                print("Could not get the readings")
        return humidity, temperature

@app.route("/")
def mainpage():
    return render_template('index.html')


@app.route('/api/sensors/house/current_data')
@cross_origin()
def data():
        humidity, temperature = sensor()
        if humidity == None or temperature == None:
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
    app.run(port=3000, host='0.0.0.0')
