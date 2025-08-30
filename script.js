async function getWeatherData(location) {
  // unitGroup = US / metric
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&key=5V22ZU37ED7EQAUDSSPDTRUJM`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function processData() {
  // filter the data you need only
  const data = await getWeatherData("Alexandria");
  // Extra data: icon, windspeed
  let currentWeather = {
    temp: data.currentConditions.temp,
    feelslike: data.currentConditions.feelslike,
    humidity: data.currentConditions.humidity,
    conditions: data.currentConditions.conditions,
    datetime: data.currentConditions.datetime
  };
  return currentWeather;
}

processData();


// TODO: try catch for handling errors
// TODO: HTML elements
// TODO: Styling
