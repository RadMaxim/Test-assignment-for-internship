import { KEY_WEATHER, weatherBases } from "./private.js";
const getCurrentWeather = async (city) => {
  let api = weatherBases + KEY_WEATHER + "&q=" + city;
  const data = await fetch(api);
  if (data.ok) {
    const { current } = await data.json();
    const {condition,temp_c } = current;
    const {icon, text} = condition;
    document.querySelector("#weather").innerHTML = temp_c;
    document.querySelector("#state_weather").setAttribute("src",icon)
  }
};
export { getCurrentWeather };
