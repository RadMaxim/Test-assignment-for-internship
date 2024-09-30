import { LOCBases, KEY_LOK } from "./private.js";
import { getCurrentWeather } from "./ApiWeather.js";
const cityID = document.getElementById("city");
const CACHE_DURATION = 60 * 60 * 1000;
const getCurrentCity = async () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const urlApi = new URL(LOCBases);
    let lat = position.coords.latitude.toFixed(4);
    let lon = position.coords.longitude.toFixed(4);
    const cacheKey = `loc_${lat}_${lon}`;

    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = Date.now();
      if (currentTime - parsedData.timestamp < CACHE_DURATION) {
        console.log("Старые данные о геолокации");
        console.log(parsedData.data);
        updateLocUI(parsedData.data);

        return;
      } else {
        localStorage.removeItem(cacheKey);
      }
    }

    urlApi.searchParams.append("lat", lat);
    urlApi.searchParams.append("lon", lon);
    const option = {
      method: "GET",
      headers: {
        Authorization: `Token ${KEY_LOK}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const data = await fetch(urlApi.toString(), option);

      if (!data.ok) {
        throw new Error("Problem of API");
      }

      const dataJSON = await data.json();
      const city = dataJSON?.suggestions[0]?.data?.city || "Краснодар";
      const cacheEntry = {
        timestamp: Date.now(),
        data: city,
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));

      updateLocUI(city);
    } catch (error) {
      console.error(error);
    }
  });
};

getCurrentCity();
const updateLocUI = (city) => {
  getCurrentWeather(city);
  if (cityID) {
    if (city) {
      cityID.textContent = city;
    } else {
      cityID.textContent = "Краснодар";
    }
  }
};
