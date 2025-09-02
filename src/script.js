const form = document.querySelector("form");
const locationInput = document.querySelector("input");
const addressElem = document.querySelector(".address");
const timeElem = document.querySelector(".time");
const displayContainer = document.querySelector(".display-container");
const iconElem = document.querySelector(".icon");
const conditionsElem = document.querySelector(".conditions");
const tempElem = document.querySelector(".temp");
const feelsLikeElem = document.querySelector(".feels_like");
const humidityElem = document.querySelector(".humidity");
const windSpeedElem = document.querySelector(".wind_speed");

// Input: location (city) String
// Output: Weather data (JSON)
async function getWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&key=5V22ZU37ED7EQAUDSSPDTRUJM`;
  try {
    const response = await fetch(url);
    // if response is ok convert data to json
    if (response.ok) {
      const weatherData = await response.json();
      return weatherData;
    }
    else {
      return null;
    }
  } catch (error) {
    console.error(error.message);
  }
}
// Input: location (city) String
// Output: weather object (temperature, feels like temperature, weather condition, weather icon, humidity, wind speed, last updated time, location) 
async function processData(location) {
  // filter the data you need only
  const weatherData = await getWeatherData(location);
  if (!weatherData) {
    return null;
  }
  let currentWeather = {
    temp: weatherData.currentConditions.temp,
    feelslike: weatherData.currentConditions.feelslike,
    conditions: weatherData.currentConditions.conditions,
    icon: weatherData.currentConditions.icon,
    humidity: weatherData.currentConditions.humidity,
    windspeed: weatherData.currentConditions.windspeed,
    datetime: weatherData.currentConditions.datetime,
    address: weatherData.resolvedAddress
  };
  return currentWeather;
}
// Input: weather object (temperature, feels like temperature, weather condition, weather icon, humidity, wind speed, last updated time, location) 
// This function updates the DOM elements on the webpage with the weather data received from the API
// It formats and displays the weather information in a user-friendly way (capitalizes address, formats time to 12-hour format, rounds numbers, etc.)
function displayWeather(weatherData) {
  displayContainer.style.display = "grid";

  iconElem.setAttribute("src", `icons/${weatherData.icon}.png`);
  iconElem.setAttribute("alt", `${weatherData.conditions} icon`);
  // Capitalize the address
  const capitalizedAddress = weatherData.address.charAt(0).toUpperCase() + weatherData.address.slice(1);
  addressElem.textContent = capitalizedAddress;
  // Convert time from "hh:mm:ss" format to "hh:mm AM or PM" format
  const timeString = weatherData.datetime;
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes), 0);
  timeElem.textContent = `Last Updated: ${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })}`;

  conditionsElem.textContent = weatherData.conditions;
  tempElem.textContent = `${Math.round(weatherData.temp)}°C`;
  humidityElem.textContent = `${Math.round(weatherData.humidity)}%`;
  feelsLikeElem.textContent = `${Math.round(weatherData.feelslike)}°C`;
  windSpeedElem.textContent = `${Math.round(weatherData.windspeed)} km/h`;
}
// Helper function
function clearWeatherData() {
  displayContainer.style.display = "none";
  timeElem.textContent = "";
}
// This function handles error cases when the weather data cannot be retrieved (invalid location, API error, etc.)
// It displays an error message to the user and clears/resets all weather data fields to prevent showing outdated information
function displayError() {
  // Show Error msg
  addressElem.textContent = "City not found. Please try again.";
  clearWeatherData();
}
// Display loading text and hide current weather data
function displayLoading() {
  addressElem.textContent = "Loading...";
  clearWeatherData();
}
// location form submission event handler
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const location = locationInput.value;
  displayLoading();
  const weatherData = await processData(location);
  // If the location is found display the data, otherwise display error
  if (weatherData) {
    displayWeather(weatherData);
  }
  else {
    displayError();
  }
})