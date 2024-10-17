import React, { useState } from 'react'; // Import React and useState for managing state in the component
import axios from 'axios'; // Import Axios to handle API requests

// This is the Weather component responsible for fetching and displaying weather data
const Weather = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const fetchWeather = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; //Weather API in metric 
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      // Weatger fetching logic
      const response = await axios.get(url);
      const weatherData = response.data; 

      // Forecast fetching logic
      const forecastResponse = await axios.get(forecastUrl);
      const forecastData = forecastResponse.data.list;
      
      onSearch(weatherData, forecastData) 
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  //Search Form
  return (
    <div className='nav'>
      <form onSubmit={handleSubmit} className='search' id="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className="search__input"
        />
        <button type="submit" className="search__button" id="search-button">
        <i className="ri-search-2-line search__icon"></i>
        <i className="ri-close-line search__close"></i>
        </button>
      </form>
    </div>
  );
};


export default Weather;
