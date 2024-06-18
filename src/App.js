import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    const apiKey = 'c44112c3aa67d9b3b3808ae183a04e53';
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
      setWeather(null);
    } finally {
      setLoading(false);
      setCity(''); // Clear the input box after fetching data
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  return (
    <>
      <section>
        <p id="heading"><span className="fancy">WEATHER FORECAST</span></p>
        <div className="container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={city}
              onChange={handleInputChange}
              placeholder="Enter city name"
            />
            <button type="submit">Search</button>
          </form>
        </div>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {weather && !loading && !error && (
          <>
            <div className="weather-location">{weather.name}</div>
            <div className="containerTop">
              <div className="weather-info">
                <h2>Temperature</h2>
                <p>{weather.main?.temp}°C</p>
              </div>
              <div className="weather-info1">
                <h2>Weather</h2>
                <p>{weather.weather[0]?.description}</p>
              </div>
            </div>
            <div className="containerBottom">
              <div className="weather-info2">
                <h2>Humidity</h2>
                <p>{weather.main?.humidity}%</p>
              </div>
              <div className="weather-info3">
                <h2>Wind Speed</h2>
                <p>{weather.wind?.speed} m/s</p>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default App;
