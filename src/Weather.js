import React, { useState } from 'react';
import axios from 'axios';
import FormattedDate from './FormattedDate';

import './Weather.css';

export default function Weather(props) {
  // let [weatherData, setWeatherData] = useState({});
  // const [ready, setReady] = useState(false);

  let [weatherData, setWeatherData] = useState({ ready: false });

  function getData(response) {
    console.log(response.data);
    setWeatherData({
      city: response.data.city,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
      description: response.data.condition.description,
      date: new Date(response.data.time * 1000),
      iconUrl: response.data.condition.icon_url,
      icon: response.data.condition.icon,
      ready: true,
    });
    //setReady(true);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.. "
                className="form-control"
                autoFocus="on"
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <h1>{weatherData.city}</h1>
        <ul>
          <li>
            <FormattedDate date={weatherData.date} />
          </li>
          <li className="text-capitalize">{weatherData.description}</li>
        </ul>
        <div className="row mt-3">
          <div className="col-6">
            <div className="clearfix">
              <div className="float-left">
                <img
                  src={weatherData.iconUrl}
                  alt={weatherData.icon}
                  className="float-left"
                  width="64px"
                />
              </div>
              <div className="float-left">
                <span className="temperature">{weatherData.temperature}</span>
                <span className="unit">°C</span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <ul>
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Wind: {weatherData.wind}km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = '29ftabd3cca96b8ca93fb50focaf8da4';
    let city = 'London';
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getData);

    return 'Loading...';
  }
}
