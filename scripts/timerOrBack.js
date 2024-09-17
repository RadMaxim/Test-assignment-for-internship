import { data_weather } from "./background.js";
let current_mode = "";
const list_time = data_weather.map((elem) => ({
  beginning: Number(elem.time.trim().replaceAll(" ", "").split(/[:-]/)[0]),
  end: Number(elem.time.trim().replaceAll(" ", "").split(/[:-]/)[2]),
}));
console.log(list_time);

function getFormattedTime() {
  const now = new Date();
  const hours = now.getHours();

  if (current_mode !== timeOfDay(hours, list_time)) {
    current_mode = timeOfDay(hours, list_time);
    document.querySelector("body").className = current_mode;
  }
  const option = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };

  return now.toLocaleTimeString("en-US", option);
}
let timer = document.getElementById("timer");
setTimeout(function run() {
  timer.innerHTML = getFormattedTime();
  setTimeout(run, 1000);
}, 1000);

const timeOfDay = (hours, list_time) => {
  for (let index = 0; index < data_weather.length; index++) {
    if (hours >= list_time[index].beginning && hours < list_time[index].end) {
      return data_weather[index].mode;
    }
  }
  return data_weather[0].mode;
};
