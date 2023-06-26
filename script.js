// JavaScript code
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const addButton = document.getElementById("add-button");
const listContainer = document.getElementById("list-container");

addButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;
  const taskTime = timeInput.value;

  if (taskText === '') {
    alert("You must enter a task");
    return;
  }

  const li = document.createElement("li");

  const checkmark = document.createElement("span");
  checkmark.className = "checkmark";
  checkmark.addEventListener("click", toggleTask);

  const taskLabel = document.createElement("span");
  taskLabel.className = "task-text";
  taskLabel.innerText = taskText;

  const dateTimeLabel = document.createElement("span");
  dateTimeLabel.className = "date-time-text";
  dateTimeLabel.innerText = formatDate(taskDate) + " " + formatTime(taskTime);

  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerText = "\u00d7";
  deleteBtn.addEventListener("click", deleteTask);

  li.appendChild(checkmark);
  li.appendChild(taskLabel);
  li.appendChild(dateTimeLabel);
  li.appendChild(deleteBtn);
  listContainer.appendChild(li);

  taskInput.value = '';
  dateInput.value = '';
  timeInput.value = '';

  saveData();
}

function toggleTask() {
  const taskLabel = this.nextElementSibling;
  taskLabel.classList.toggle("checked");
  this.classList.toggle("checked");
  saveData();
}

function deleteTask(event) {
  const taskItem = event.target.parentElement;
  taskItem.remove();
  saveData();
}

function saveData() {
  const tasks = Array.from(listContainer.getElementsByTagName("li")).map(li => {
    const taskLabel = li.querySelector(".task-text");
    const dateTimeLabel = li.querySelector(".date-time-text");
    return {
      text: taskLabel.innerText,
      dateTime: dateTimeLabel.innerText,
      completed: taskLabel.classList.contains("checked")
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (savedTasks) {
    savedTasks.forEach(function(task) {
      const li = document.createElement("li");

      const checkmark = document.createElement("span");
      checkmark.className = "checkmark";
      if (task.completed) {
        checkmark.classList.add("checked");
      }
      checkmark.addEventListener("click", toggleTask);

      const taskLabel = document.createElement("span");
      taskLabel.className = "task-text";
      taskLabel.innerText = task.text;
      if (task.completed) {
        taskLabel.classList.add("checked");
      }

      const dateTimeLabel = document.createElement("span");
      dateTimeLabel.className = "date-time-text";
      dateTimeLabel.innerText = task.dateTime;

      const deleteBtn = document.createElement("span");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerText = "\u00d7";
      deleteBtn.addEventListener("click", deleteTask);

      li.appendChild(checkmark);
      li.appendChild(taskLabel);
      li.appendChild(dateTimeLabel);
      li.appendChild(deleteBtn);
      listContainer.appendChild(li);
    });
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

function formatTime(timeString) {
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  const time = new Date(`1970-01-01T${timeString}`);
  return time.toLocaleTimeString(undefined, options);
}

showTasks();
