import { LOCBases, KEY_LOK } from "./private.js";
import { getCurrentWeather } from "./ApiWeather.js";
const getCurrentCity = async () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `${LOCBases}?lat=${latitude}&lon=${longitude}`;
    console.log(url);
    
    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${KEY_LOK}`,
        "Content-Type": "application/json",
      },
    });
    if (data.ok) {
      let { suggestions } = await data.json();
      let loc = suggestions[0].data.city;
      document.getElementById("city").innerHTML = loc || "Краснодар";
      getCurrentWeather(loc);
    } else {
      console.error("Mistake of API");
    }
  });
};
getCurrentCity();
