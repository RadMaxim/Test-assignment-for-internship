import { LOCBases, KEY_LOK } from "./private.js";
import { getCurrentWeather } from "./ApiWeather.js";
const getCurrentCity = async () => {
  navigator.geolocation.getCurrentPosition(async (position) => {

    const urlApi = new URL(LOCBases);
    urlApi.searchParams.append("lat", position.coords.latitude);
    urlApi.searchParams.append("lon", position.coords.longitude);
    const option = {
      method: "GET",
      headers: {
        Authorization: `Token ${KEY_LOK}`,
        "Content-Type": "application/json",
      },}
    try {
      const data = await fetch(urlApi.toString(), option)
        .then(async (elem) => await elem.json())
        .then((elem) => elem.suggestions[0].data.city)
        .catch((elem)=>{console.log(elem)
        })
      
      document.getElementById("city").innerHTML = data || "Краснодар";
      getCurrentWeather(data);
        
      
    } catch {
      console.error("Mistake of API");
    }
  });
};

getCurrentCity();
