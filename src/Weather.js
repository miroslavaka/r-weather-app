import React, { useState } from 'react';
import axios from 'axios';

import WeatherInfo from './WeatherInfo';

import './Weather.css';

export default function Weather(props) {
  // let [weatherData, setWeatherData] = useState({});
  // const [ready, setReady] = useState(false);

  let [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function getData(response) {
    console.log(response.data.city);
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

  function handleCityChange(event) {
    console.log(event.target.value);
    setCity(event.target.value);
  }

  function search() {
    const apiKey = '29ftabd3cca96b8ca93fb50focaf8da4';
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getData);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.. "
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
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
        '
        <WeatherInfo data={weatherData} />
      </div>
    );
  } else {
    // const apiKey = '29ftabd3cca96b8ca93fb50focaf8da4';
    //let city = 'London';
    // let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}&units=metric`;
    // let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    // axios.get(apiUrl).then(getData);
    search();

    return 'Loading...';
  }
}
