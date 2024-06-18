import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const apiKey = 'c44112c3aa67d9b3b3808ae183a04e53';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    setWeather(data);
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    fetchWeather();
  };

  return (
    <>
      <section>
        <p id="heading"><span className="fancy">WEATHER FORECAST</span></p>
        <div className="container">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {weather && <div className="weather-location">{weather.name}</div>}
        <div className="containerTop">
          {weather && (
            <div className="weather-info">
              <h2>Temperature</h2>
              <p>{weather.main.temp}°C</p>
            </div>
          )}
          {weather && (
            <div className="weather-info1">
              <h2>Weather</h2>
              <p>{weather.weather[0].description}</p>
            </div>
          )}
        </div>
        <div className="containerBottom">
          {weather && (
            <div className="weather-info2">
              <h2>Humidity</h2>
              <p>{weather.main.humidity}%</p>
            </div>
          )}
          {weather && (
            <div className="weather-info3">
              <h2>Wind Speed</h2>
              <p>{weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
