const weatherIcons = {
  "clear-day": "☀️",
  "clear-night": "🌙",
  "partly-cloudy-day": "🌤️",
  "partly-cloudy-night": "🌥️",
  "cloudy": "☁️",
  "rain": "🌧️",
  "snow": "❄️",
  "fog": "🌫️",
  "wind": "💨"
};  
const form = document.querySelector("form");
const locationInput = document.querySelector("input");
const addressElem = document.querySelector(".address");
const iconElem = document.querySelector(".icon");
const tempElem = document.querySelector(".temp");
const feelsLikeElem = document.querySelector(".feels_like");
const conditionsElem = document.querySelector(".conditions");
const humidityElem = document.querySelector(".humidity");
const windSpeedElem = document.querySelector(".wind_speed");
const timeElem = document.querySelector(".time");

async function getWeatherData(location) {
  // unitGroup = US / metric
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&key=5V22ZU37ED7EQAUDSSPDTRUJM`;
  try {
    const response = await fetch(url);
    if (response.status == 200) {
      const weatherData = await response.json();
      return weatherData;
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function processData(location) {
  // filter the data you need only
  const weatherData = await getWeatherData(location);
  if (!weatherData) {
    return null;
  }
  // Extra data: icon, windspeed
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
  console.l
  return currentWeather;
}

function displayWeather(weatherData) {
  iconElem.textContent = weatherIcons[weatherData.icon] || "❔";
  // Capitalize the address
  const capitalizedAddr = weatherData.address.charAt(0).toUpperCase() + weatherData.address.slice(1);
  addressElem.textContent = capitalizedAddr;
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

  tempElem.textContent = `${Math.round(weatherData.temp)}°C`;
  conditionsElem.textContent = weatherData.conditions;
  humidityElem.textContent = `${Math.round(weatherData.humidity)}%`;
  feelsLikeElem.textContent = `${Math.round(weatherData.feelslike)}°C`;
  windSpeedElem.textContent = `${Math.round(weatherData.windspeed)} km/h`;
}

function displayError() {
  addressElem.textContent = "The address you entered is not valid!";
  // Empty weather data fields
  timeElem.textContent = "";
  iconElem.textContent = "";
  tempElem.textContent = "";

  conditionsElem.textContent = "-";
  humidityElem.textContent = "-";
  feelsLikeElem.textContent = "-";
  windSpeedElem.textContent = "-";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const location = locationInput.value;
  const weatherData = await processData(location);
  if (weatherData) {
    displayWeather(weatherData);
  }
  else {
    displayError();
  }
})
