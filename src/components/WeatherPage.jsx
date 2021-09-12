import React, { useState } from 'react';
import './css/weatherPage.scss';
import Clock from 'react-live-clock';
import 'moment-timezone';
import moment from 'moment';

function WeatherPage() {

    const weatherApiKey = "181657822429b70119aedd3c19bb7bc8";
    const weatherBase = "https://api.openweathermap.org/data/2.5/";

      const search = evt => {
        if (evt.key === "Enter") {
          fetch(`${weatherBase}weather?q=${input}&units=metric&APPID=${weatherApiKey}`)
            .then(res => res.json())
            .then(result => {
              setWeather(result);
              setInput('');
            });
        }
      }

    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({});

    const getInput = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="weather-page-container">
            <div className="weather-page">
                <div className="clock-container">
                    {moment().format('MMMM Do YYYY')}
                    <Clock className="clock" format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
                </div>
                <div className="weather-page-title">
                    <h2>Enter the location</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="location-search-box form-control" 
                        value={input}
                        onChange={getInput}
                        onKeyPress={search}
                    />
                </form>
                {(typeof weather.main != "undefined") ? (
                <div className="weather-container">
                    <div className="weather-location">
                        <div className="location">The current weather for <b>{weather.name} {weather.sys?.country}</b> is</div>
                    </div>

                    <div className="weather-icon-temp">
                        <div className="temp">
                            <div className="temp-of-weather"><h2>{Math.round(weather.main?.temp)}°c {(weather.main?.temp > 16) ? ("Warm") : ("Cold")}</h2></div>
                            <div className="type-of-weather"><h3>{(weather.weather[0].description)}</h3></div>
                            <div className="div-temperatures">
                                <div className="min-temp"><h3>Min. temp: {Math.round(weather.main.temp_min)}°c</h3></div>
                                <div className="max-temp"><h3>Max. temp: {Math.round(weather.main.temp_max)}°c</h3></div>
                            </div>
                            <div className="pressure-and-humidity">
                                <div className="pressure"><h3>Pressure: {weather.main.pressure}Pa</h3></div>
                                <div className="humidity"><h3>Humidity: {weather.main.humidity}%</h3></div>
                            </div>
                        </div>
                    </div>
                </div>
                ) : ('')}
            </div>
        </div>
    )
}

export default WeatherPage;
