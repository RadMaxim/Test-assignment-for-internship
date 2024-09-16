import { KEY_LOK, KEY_WEATHER, LOCBases, weatherBases } from "./private.js";

const getCurrentWeather = async (city) => {
  let api = weatherBases + KEY_WEATHER + "&query=" + city;

  const data = await fetch(api);
  if (data.ok) {
    const dataJSON = await data.json();
    console.log(dataJSON);

    const { temperature, weather_code, weather_icons } = dataJSON.current;
    document.getElementById("weather").innerHTML = temperature;
  }
};
const getCurrentCity = async () => {
  const data = await fetch(LOCBases + KEY_LOK);
  if (data.ok) {
    const dataJSON = await data.json();
    document.getElementById("country").innerHTML = dataJSON.country;
    document.getElementById("city").innerHTML = dataJSON.city || "Minsk";

    getCurrentWeather(dataJSON.city);
    return { city: dataJSON.city, country: dataJSON.country };
  }
  return "Краснодар";
};

getCurrentCity();
