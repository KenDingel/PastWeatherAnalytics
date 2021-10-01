from flask import Flask, render_template
import weather

app = Flask(__name__)


@app.route('/')
def Index():
    return render_template("index.html", root='')


@app.route('/Visuals.js')
def serverStatic():
    return render_template("Visuals.js", root='')


@app.route('/weather')
def staticServerWeather():
    return weather.get_weather_data()


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=False)
