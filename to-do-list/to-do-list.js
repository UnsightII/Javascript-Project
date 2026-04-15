const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const container = document.querySelector('.task-container');

let tasks = [];

// LOAD tasks when page starts
window.addEventListener('DOMContentLoaded', () => {
  tasks = getStorage();
  renderTasks();
});

// ADD task
btn.addEventListener('click', () => {
  const value = input.value.trim();
  if (value === '') return;

  tasks.push(value);          // 1. add to array
  saveStorage(tasks);         // 2. save to storage
  renderTasks();              // 3. update UI

  input.value = '';
});

// RENDER all tasks
function renderTasks() {
  container.innerHTML = ''; // clear first

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const delBtn = document.createElement("button");

    p.textContent = task;
    delBtn.textContent = "Delete";

    div.classList.add("divTask");
    delBtn.classList.add("del-btn");

    div.appendChild(p);
    div.appendChild(delBtn);
    container.appendChild(div);

    // DELETE task
    delBtn.addEventListener('click', () => {
      tasks.splice(index, 1);   // remove from array
      saveStorage(tasks);       // save updated array
      renderTasks();            // re-render UI
    });
  });
}

// GET from storage
function getStorage() {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
}

// SAVE to storage
function saveStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}