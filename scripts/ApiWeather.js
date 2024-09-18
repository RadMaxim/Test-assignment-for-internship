import { KEY_WEATHER, weatherBases } from "./private.js";
const getCurrentWeather = async (city) => {
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
    if (data.ok) {
      const { current } = await data.json();
      const { condition, temp_c } = current;
      const { icon } = condition;
      document.querySelector("#weather").innerHTML = temp_c;
      document.querySelector("#state_weather").setAttribute("src", icon);
    }
  } catch {
    if (1==1) 
    console.error("Error fetching weather data: ");
    document.querySelector("#weather").innerHTML = "Error loading weather data";
  }
};
export { getCurrentWeather };
