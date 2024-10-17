import React from 'react';

//Function to group forecast data by day and calculate the average temperature for each day
  const groupForecastByDay = ( forecastData) => {
    const days = {};

    forecastData.forEach((forecast) => {
      const date = new Date(forecast.dt_txt); // Get the full date
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day of the week

      // If the day hasn't been added yet, initialize it
      if (!days[dayOfWeek]) {
        days[dayOfWeek] = {
          temps: [],
          averageTemp: 0,
          minTemp: forecast.main.temp, // Initialize minTemp with the first temperature
          maxTemp: forecast.main.temp, // Initialize maxTemp with the first temperature
          icon: forecast.weather[0].icon,
        };
      }

      // Push the temperature for each forecast into the corresponding day's array
      days[dayOfWeek].temps.push(forecast.main.temp);

      // Update the min and max temperatures for the day
    if (forecast.main.temp < days[dayOfWeek].minTemp) {
      days[dayOfWeek].minTemp = forecast.main.temp;
    }
    if (forecast.main.temp > days[dayOfWeek].maxTemp) {
      days[dayOfWeek].maxTemp = forecast.main.temp;
    }
    });

    // Calculate the average temperature for each day
    for (const day in days) {
      const temps = days[day].temps;
      const totalTemp = temps.reduce((total, temp) => total + temp, 0);
      days[day].averageTemp = totalTemp / temps.length; // Average temperature in Kelvin
    }

    return days; // Return the grouped and averaged forecast data
  };

  
const FiveDayForecast = ({ forecastData }) => {
  
    const dailyForecasts = groupForecastByDay(forecastData); // Group forecast by day and calculate averages


  return(
    <div className='forecast'>

        {Object.keys(dailyForecasts).map((day) => (
            <div key={day}> 
            <div className='days'>
            <h3>{day}</h3> {/* Display day of the week */}
            <img
                src={`http://openweathermap.org/img/wn/${dailyForecasts[day].icon}@2x.png`}
                alt="Weather Icon"
                className='forecast_icon'
            />
            {/* <p>
              {Math.round(dailyForecasts[day].averageTemp)}°C
              </p> */}

              <p>{Math.round(dailyForecasts[day].minTemp)}°C <br/> {Math.round(dailyForecasts[day].maxTemp)}°C</p> {/* Display min/max temperature */} 
            
          </div>
            </div>
        ))}
    </div>
    );
};

export default FiveDayForecast;




