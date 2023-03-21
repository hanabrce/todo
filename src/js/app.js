import "../scss/app.scss";

const input = document.getElementById("task");
const form = document.querySelector("form");
const btn = document.getElementById("btn--add");
const text = document.querySelector("h2");
const deleteAllBtn = document.querySelector(".btn--delete-all");  
const h3 = document.getElementsByTagName("h3");
let svg = document.getElementsByClassName('svg');

let taskArray = [];

// on load
window.onload = function () {
    const storedTaskValues = JSON.parse(localStorage.getItem("tasks"));
    if (storedTaskValues != null) {
      input.value = "";
      storedTaskValues.forEach((e) => taskArray.push(e));
      taskArray.forEach((e) => addTask(e.name, e.id, e.important));
      taskArray.forEach((imp) => checkImportant(imp.important, imp.id));
      topText();
    } else {
      input.value = "";
      topText();
    }
};


// item example
function Task(name) {
    this.name = name;
    this.id = Date.now();
    this.important = false;
}


// crate new task and add to array
function newTask(task) {
    let newTask = new Task(task);
    taskArray.push(newTask);
    return newTask;
} 


// preventing refresh
form.addEventListener("click", function (e) {
    e.preventDefault();
});


// when adding a new task
btn.addEventListener("click", function () {
    if (input.value != "" && input.value.length <= 30) {
      const task = newTask(input.value);
      addTask(task.name, task.id, task.important);
      input.value = "";
      localStorage.setItem("tasks", JSON.stringify(taskArray));
      topText();
    } else if (input.value.length > 30) {
      alert("Task name is too long!")
    } else {
      alert("Add a task!");
    }
});


function addTask(task, id, important) {
  const li = document.createElement("li");
  const h3 = document.createElement("h3");
  const textLi = document.createTextNode(task);
  const button = document.createElement("button");
  const button1 = document.createElement("button");
  const div = document.createElement("div");

  // delete button
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"> <path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path> </svg>';
  button.addEventListener("click", function (e) {
    let elementIndex = taskArray.findIndex(element => element.id == id);

    button.parentElement.parentElement.remove();
    taskArray.splice(elementIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    topText();
  });

  // important button
  button1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"> <path d="M2.2,16.06L3.88,12L2.2,7.94L6.26,6.26L7.94,2.2L12,3.88L16.06,2.2L17.74,6.26L21.8,7.94L20.12,12L21.8,16.06L17.74,17.74L16.06,21.8L12,20.12L7.94,21.8L6.26,17.74L2.2,16.06M13,17V15H11V17H13M13,13V7H11V13H13Z" /> </svg>';
  button1.addEventListener("click", function(el) {
    let elementIndex = taskArray.findIndex(element => element.id == id);
    let svg = document.getElementsByClassName('svg');
    
    switch(important) {
      case false:
        h3.classList.add("important");
        svg[elementIndex].setAttribute('fill', '#bab86c');
        important = true;
        taskArray[elementIndex].important = true;
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        break;
      case true:
        h3.classList.remove("important");
        svg[elementIndex].setAttribute('fill', '#000000');
        important = false;
        taskArray[elementIndex].important = false;
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        break;
    }
  });
  
  // adding style and elements to list
  h3.append(textLi);
  div.append(button1);
  div.append(button);
  li.classList.add("tasks__item");
  li.setAttribute("style", "opacity: 1");
  li.append(h3);
  li.append(div);
  
  document.querySelector(".tasks").append(li); 
}


// top text
function topText() {
  switch(taskArray.length) {
      case 0:
          text.innerHTML = "super, si brez opravil <span>:)</span>";
          break;
      case 1:
          text.innerHTML = "Čaka te <span>1</span> opravilo.";
          break;
      case 2:
          text.innerHTML = "Čakata te <span>2</span> opravili.";
          break;
      case 3:
          text.innerHTML = "Čakajo te <span>3</span> opravila.";
          deleteAllBtn.classList.remove("btn--delete-all--active");
          break;
      case 4:
          text.innerHTML = "Čakajo te <span>4</span> opravila.";
          deleteAllBtn.classList.add("btn--delete-all--active");
          break;
      default:
          text.innerHTML = `Čaka te <span>${taskArray.length}</span> opravil.`;
          deleteAllBtn.classList.add("btn--delete-all--active");
          break;
}}; 


// delete all
deleteAllBtn.addEventListener("click", function () {
  document.querySelectorAll(".tasks__item").forEach((e) => e.remove());
  localStorage.clear();
  taskArray = [];
  topText();
  deleteAllBtn.classList.remove("btn--delete-all--active");
});


// important tasks inicial check
function checkImportant(imp, id) {
  let elementIndex = taskArray.findIndex(element => element.id == id);

  if (imp == true) {
    h3[elementIndex].classList.add("important");
    svg[elementIndex].setAttribute('fill', '#bab86c');
  };
}
