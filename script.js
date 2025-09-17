document.addEventListener("DOMContentLoaded", () => {
  const weatherSubmit = document.getElementById("weather-submit");
  const weatherCity = document.getElementById("weather-city");
  const weatherInfo = document.getElementById("weather-info");
  const weatherTemperature = document.getElementById("weather-temperature");
  const weatherDescription = document.getElementById("weather-description");
  const errorMessage = document.getElementById("error-message");
  weatherSubmit.addEventListener("click", async () => {
    const weatherInput = document.getElementById("weather-input").value.trim();
    if (weatherInput == "") return;
    const API_KEY = "b00643489f67b6f926eb50e3fa3aa3de";
    try {
      const weatherData = await fetchWeather(weatherInput, API_KEY);
    } catch (error) {
      displayErrorMessage(error);
    }
  });

  async function fetchWeather(weatherInput, key) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput}&appid=${key}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found.");
    }
    const data = await response.json();
    displayWeatherData(data);
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    errorMessage.classList.add("hidden");
    weatherInfo.classList.remove("hidden");
    weatherCity.textContent = name;
    weatherTemperature.textContent = `Temperature : ${main.temp}`;
    weatherDescription.textContent = `Description : ${weather[0].description}`;
    // weatherTemperature.textContent.weather
  }

  function displayErrorMessage(error) {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = error;
  }
});
