import { KEY_WEATHER, weatherBases } from "./private.js";
const CACHE_DURATION = 60 * 60 * 1000;
const weather = document.getElementById("weather");
const state_weather = document.getElementById("state_weather");
const getCurrentWeather = async (city) => {
  const cacheKey = `weather_${city}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    const currentTime = Date.now();
    if (currentTime - parsedData.timestamp < CACHE_DURATION) {
      console.log("Используется кешированные данные");
      updateWeatherUI(parsedData.data);
      return;
    } else {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const url = new URL(weatherBases);
    url.searchParams.append("key", KEY_WEATHER);
    url.searchParams.append("q", city);
    const option = {
      method: "GET",
      headers: {
        Authorization: `Token ${KEY_WEATHER}`,
        "Content-Type": "application/json",
      },
    };
    const data = await fetch(url.toString(), option);
    if (!data.ok) {
      throw new Error("Problem of API");
    }
    const dataJSON = await data.json();
    let temperature = dataJSON?.current?.temp_c;
    let icon = dataJSON?.current?.condition?.icon;
    const weatherData = {
      temperature,
      icon,
    };
    updateWeatherUI(weatherData);
    const cacheEntry = {
      timestamp: Date.now(),
      data: weatherData,
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
  } catch {
    if (weather) {
      weather.textContent = "Error loading weather data";
    }
  }
};
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 500);
});
const updateWeatherUI = (weatherData) => {
  const { temperature, icon } = weatherData;

  if (weather) {
    weather.textContent = temperature;
  }
  if (state_weather) {
    state_weather.setAttribute("src", icon);
  }
};
export { getCurrentWeather };
