const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos";
let toDos = [];
let count = 0;

function handleDelete(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDo = toDos.filter(function(todo) {
    return todo.id !== parseInt(li.id);
  });
  toDos = cleanToDo;
  saveToDo();
  count++;
}

function saveToDo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(toDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btn = document.createElement("button");
  span.innerHTML = toDo;
  btn.innerText = "❌";
  btn.addEventListener("click", handleDelete);
  btn.classList.add("toDoBtn");
  li.classList.add("toDoList");
  li.appendChild(span);
  li.appendChild(btn);
  toDoList.appendChild(li);
  li.id = toDos.length + 1 + count;
  toDoObj = {
    text: toDo,
    id: toDos.length + 1 + count
  };
  toDos.push(toDoObj);
  saveToDo();
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(1);
  currentToDo = toDoInput.value;
  paintToDo(currentToDo);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function(todo) {
      paintToDo(todo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
