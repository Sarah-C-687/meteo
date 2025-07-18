function refreshWeather(response){
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");
  let timeElement = document.querySelector("#current-time");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let weatherIconElement = document.querySelector("#weather-icon");
  
  let date = new Date(response.data.time * 1000);
  
  cityElement.innerHTML = response.data.city ;
  timeElement.innerHTML = formatDate(date);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeedElement.innerHTML = response.data.wind.speed;
  temperatureElement.innerHTML = Math.round(temperature);
  weatherIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date){
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
  let apiKey = "37063o4363aac71b7ded9aft7ef085f0";
  let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast (city) {
  let apiKey = "37063o4363aac71b7ded9aft7ef085f0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log (response.data);
  let days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml = 
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">⛅️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature"><strong>19°</strong></div>
          <div class="weather-forecast-temperature">13°</div>
        </div>
      </div>
      `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;

}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Montreal");