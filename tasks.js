let list_tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
window.addEventListener("load", () => {
  showAllTask(list_tasks);
});

document.getElementById("addTask").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    list_tasks.push(e.target.value);
    localStorage.setItem("tasks", JSON.stringify(list_tasks));
    showAllTask(list_tasks);
  }
});

const showAllTask = (arr) => {
  let Alltask_container = document.querySelector(".Alltask_container");

  let divs = Array.from(arr).reduce((buf, val) => {
    buf += `<div class="task">
     
    <input type="checkbox"/>
              <p>${val}</p>
              <button class="removeTask">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m680-240-56-56 182-184-182-184 56-56 240 240-240 240Zm-400 0L40-480l240-240 56 56-182 184 182 184-56 56Zm40-200q-17 0-28.5-11.5T280-480q0-17 11.5-28.5T320-520q17 0 28.5 11.5T360-480q0 17-11.5 28.5T320-440Zm160 0q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm160 0q-17 0-28.5-11.5T600-480q0-17 11.5-28.5T640-520q17 0 28.5 11.5T680-480q0 17-11.5 28.5T640-440Z"/></svg>
              </button>
            </div>`;
    return buf;
  }, "");
  Alltask_container.innerHTML = divs;
};
// const allRemove = document.getElementsByClassName("removeTask");
// console.log(allRemove);
// for (let index = 0; index < Array.from(allRemove).length; index++) {
//   console.log(allRemove[index]);

// }
////////////////////////////////////////////////////

Array.from(allRemove).forEach((elem) => {
  console.log(elem);
  console.log("ef");

  elem.addEventListener("onClick", (e) => {
    console.log(e);
  });
});
