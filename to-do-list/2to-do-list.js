const container = document.querySelector('.task-container');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

let tasks = [];


window.addEventListener('DOMContentLoaded',()=>{

  tasks = getStorage();
  renderTasks();
});
btn.addEventListener('click',()=>{
  const value = input.value.trim();

  if(value === '') return;

  tasks.push(value);
  saveStorage(tasks);
  renderTasks();

  input.value = '';
});

function renderTasks(){
  container.innerHTML = '';

  tasks.forEach((task,index)=>{
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

  delBtn.addEventListener('click',()=>{
    tasks.splice(index, 1);
    saveStorage(tasks);
    renderTasks();
  });
  });
}
function saveStorage(tasks){
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
function getStorage(){
  let data = localStorage.getItem('tasks');
  return data? JSON.parse(data):[];
}