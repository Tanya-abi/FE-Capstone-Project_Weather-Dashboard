import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './components/search';
import OverviewWeather from './components/current';
import FiveDayForecast from './components/forecast';
import './index.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);// Overview weather variables 
  const [forecastData, setForecastData] = useState([]);// Forecast weather variables that is empty and ready to receive information from the API
  const [geoLocation, setGeoLocation] = useState({ lat: null, lon: null }); //geoLocation variables that will be used to store coordinates extracted from the API using latitude and longitude
  const [error, setError] = useState(null);// Error variables for storing error messages
  const [style, setStyle] = useState({ backgroundColor: '', textColor: '' });// style variables for storing background and text colors that will be used on weather app


//Function to change hues according to time of the day. The function will change background and text colours according to time of the day
  const getBackgroundAndTextColor = () => {
    const currentHour = new Date().getHours(); 
    let backgroundColor = '';
    let textColor = '';

    if (currentHour >= 6 && currentHour < 12) {
     
       backgroundColor = '#D3E8FA'; 
      textColor = '#303543'; 
    } else if (currentHour >= 12 && currentHour < 18) {
      
      backgroundColor = '#FBBE00'; 
      textColor = '#303543'; 
    } else if (currentHour >= 18 && currentHour < 21) {
      
      backgroundColor = 'rgba(120, 115, 167, 0.39)'; 
      textColor = '#FFFFFF'; 
    } else {
      
      backgroundColor = '#303543'; 
      textColor = '#E2EAF2'; 
    }

    return { backgroundColor, textColor };
  };

  // Function to fetch current weather data based on user's coordinates
  const fetchWeatherByCoordinates = async (lat, lon) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Access API key from .env

    // URLs for current weather and 5-day forecast
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      // Fetch current weather
      const weatherResponse = await axios.get(currentWeatherUrl);
      setWeatherData(weatherResponse.data); // Store current weather data

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(forecastUrl);
      setForecastData(forecastResponse.data.list); // Store 5-day forecast data
    } catch (error) {
      setError('Error fetching weather data'); // Set error message if request fails
      errorMessages(error);
    }
  };

  // Error Messages to be logged to console
  const errorMessages = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          setError('Error 400 - Bad Request');
        case 404:
          setError('Error 404 - City not Found. Please check the spelling and try again.');
          break;
        case 401:
          setError('Error 401 - Unauthorized. Please check your API key.');
          break;
        case 500:
          setError('Error 500 - Unexpected Error. Please try again later.');
          break;
        case 409:
          setError('Error 429 - Too Many Requests.');
          break;
        default:
          setError(`Error: ${error.response.data.message}`);
      }
    } else if (error.request) {
      setError('Network error. Please check your internet connection and try again.');
    } else {
      setError(`Error: ${error.message}`);
    }
    console.error('Error fetching weather data:', error);
  };

  const handleSearchWeather = (newWeatherData, newForecastData) => {
    setWeatherData(newWeatherData); // Update current weather with search results
    setForecastData(newForecastData); // Update forecast with search results
  };

  //Refresh button
  const refreshWeather = () => {
    if (geoLocation.lat && geoLocation.lon) {
      fetchWeatherByCoordinates(geoLocation.lat, geoLocation.lon);
    } else {
      setError('Location not available to refresh weather.');
    }
  };


  // function to get user location using longitude and latitude
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords; // Get user's coordinates
            setGeoLocation({ lat: latitude, lon: longitude });
            fetchWeatherByCoordinates(latitude, longitude); // Fetch weather data using coordinates
          },
          (error) => {
            setError('Unable to retrieve location'); // Set error if geolocation fails
            console.error('Error getting location:', error);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.'); // Handle unsupported geolocation
      }
    };

    // Set background and text color based on the current time
    const colors = getBackgroundAndTextColor();
    setStyle(colors);

    getUserLocation(); // Get user location on component mount
  }, []); // Empty dependency array to run this effect only once

  return (

    <div style={{ backgroundColor: style.backgroundColor, color: style.textColor, minHeight: '100vh' }}>
      

      
      <button onClick={refreshWeather} className='refresh_button'>
        <img width="20" height="20"  color='white' src="https://img.icons8.com/windows/32/refresh.png" alt="refresh"/>
      </button>

      {/* SearchWeather Component allows searching for a city's weather */}
      <Weather onSearch={handleSearchWeather} />

      {/* Display current weather data if available */}
      {weatherData && <OverviewWeather weatherData={weatherData} />}

          {/* If there is an error, display it */}
    {error && (
      <div className="error-message">
        <p>{error && <setError/>}</p>
      </div>
    )}

      {/* Display forecast data if available */}
      {forecastData.length > 0 && <FiveDayForecast forecastData={forecastData} />}

      <footer className="footer">
        <small>
          <p>&copy; <span id="currentYear">{new Date().getFullYear()}</span> Coded by Tanyaradzwa Chigwida.</p>
        </small>
      </footer>
    </div>
  );
};

export default App;

