Weather Dashboard

A weather dashboard that allows users to search for real-time weather data of a city, including temperature, humidity, wind speed, chance of rain, clouds and weather conditions. Built using React, Axios for API requests, and Vanilla CSS for responsive design.

Features:

Weather Details:
- Temperature: Displays the current temperature in Celsius or Fahrenheit.
- Humidity: Shows the current humidity level as a percentage.
- Wind Speed: Displays the current wind speed in km/h or mph.
- Rain: Show the chance of rain in percenatage.
- Clouds: In percenatage the app, show user how cloudy it is in percenatage.
- Weather Condition Icon: A graphical representation of the current weather (e.g., sunny, cloudy, rainy).

City Search Functionality:
Search bar for entering the name of a city.
Fetches and displays weather data for the specified city upon submission.
Handles invalid city names or errors with user-friendly error messages.
Responsive UI Design
Built with Vanilla CSS to ensure the design is responsive and adapts to various screen sizes (desktop, tablet, mobile).
Visually appealing and user-friendly interface.
Real-Time Weather Updates
Automatically updates weather data every few minutes to provide the most current information.
Optionally includes a refresh button to manually update the weather data.
Error Handling
Proper error handling for issues like network errors, invalid API responses, or incorrect city names.
Displays user-friendly error messages or alerts for such cases.
Technical Setup

Project Setup:
The project was initialized using vite with React.
Vanilla CSS is used for styling, ensuring a clean, responsive design.
API Integration

Fetching Data:
Uses axios to make requests to the weather API.
Handles asynchronous data fetching and displays the weather data in a structured format.

User Interface Components
SearchBar: Allows users to input a city name.
WeatherCard: Displays the fetched weather data in a structured layout.
ErrorMessage: Shows error messages if issues arise.

State Management:
Utilizes React’s useState and useEffect hooks to manage data fetching, user input, and UI updates.
State is handled within functional components.

Deployment:
The app is deployed on Vercel and is accessible online.
The deployment link can be found below:
Deployment Link: Weather Dashboard (fe-capstone-project-weather-git-109515-tanyas-projects-cfc64ae7.vercel.app)

Stretch Goals:

Weekly Weather Forecast: Add a 5-day weather forecast showing daily high and low temperatures.
Theme Customization: Change background hues based on time of day.
Geolocation API: Automatically detect the user’s location using the browser’s Geolocation API and show their local weather.


