import React from "react";

const getCurrentDayAndTime = (timezone) => {
  const currentDate = new Date(); // Get the current date
  const localTime = new Date(currentDate.getTime() + timezone * 1000); 
  const options = { hour: '2-digit', minute: '2-digit', hour12: false };
  return `${localTime.toLocaleDateString('en-US', { weekday: 'short' })}, ${localTime.toLocaleTimeString('en-US', options)}`;
}
const OverviewWeather =({ weatherData }) => {
  if(!weatherData) {
    return <div>Loading current weather...</div> // In the case that the weatherData variable is empty, the code will return this message
  }

  return (
    <div className="overview">

      <div className="temp_1">

      <h2>{weatherData.name}</h2> {/* City name */}
      <p>{getCurrentDayAndTime(weatherData.timezone)}</p>
      <p>{Math.round(weatherData.main.temp_min)}°C |  {Math.round(weatherData.main.temp_max)}°C</p>
      <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="icon_1"
          />

         
      <p className="temp"> {Math.round(weatherData.main.temp)}<span>°</span></p> 
      <p>{weatherData.weather[0].description}</p> {/* Weather description */}
      

      </div>
     
      <div className="grid-container">

         <p className="grid-item">    {/*Humidity* */}
          <img width="55" height="55" src="https://img.icons8.com/ios/50/moisture.png" alt="moisture"/> <br />humidity
          <br />{weatherData.main.humidity}%
        </p>

        <p className="grid-item"> {/*Wind */}
        <img width="55" height="55" src="https://img.icons8.com/ios/50/wind--v1.png" alt="wind--v1"/><br />wind
          <br />{Math.round(weatherData.wind.speed * 3.6)} km/h
          </p>

        <p className="grid-item">{/*Rain */}
        <img width="55" height="55" src="https://img.icons8.com/ios/50/rain--v1.png" alt="rain--v1"/><br />rain<br />
         {weatherData.rain && weatherData.rain['1h'] ? `${Math.min(weatherData.pop * 100, 100)}%` : '0%'}
          </p>

        <p className="grid-item"> {/*Clouds */}
        <img width="55" height="55" src="https://img.icons8.com/pastel-glyph/64/clouds.png" alt="clouds"/><br />clouds<br />
        {weatherData.clouds.all}%  
        </p>

      </div>
      

    </div>
  );
}

export default OverviewWeather;

