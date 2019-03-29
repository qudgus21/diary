const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos";
let toDos = [];
let count = 0;

function reveal(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const parseToDos = JSON.parse(loadedToDos);
  console.log(parseToDos);
  for(i=0 ; i<parseToDos.length;i++){
    toDo =parseToDos[i].text

    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    const btnCheck = document.createElement("button");
    const btnEdit = document.createElement("button");//Edit button
    btnEdit.innerHTML="Edit";//Edit button
    btnEdit.classList.add("editBtn")// Edit button
    btnCheck.innerHTML="✔";
    btnCheck.classList.add("btnCheck");
    span.innerHTML = toDo;
    btn.innerText = "❌";
    btn.addEventListener("click", handleDelete);
    btn.classList.add("toDoBtn");
    li.classList.add("toDoList");
    li.id=parseToDos[i].id  //중요   li에 id 부여합니다.
    li.appendChild(span);
    li.appendChild(btn);
    li.appendChild(btnCheck);
    li.appendChild(btnEdit);//Edit button
    btnEdit.addEventListener('click',handleEdit);//Edit button
    btnCheck.addEventListener('click',handleCheck);
    toDoList.appendChild(li);
    // toDoobj를 깔끔하게 청소한다. 
    // li.id = toDos.length + 1 + count;
    // toDoObj = {
    //   text: toDo,
    //   id: toDos.length + 1 + count
    // };
    // toDos.push(toDoObj);
    // saveToDo();
 
  }
}


function deleteAllLi(event){
  while(toDoList.hasChildNodes()){
    toDoList.removeChild(toDoList.firstChild);
  }
  
}

function handleEditSubmit(event){
  event.preventDefault();
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const parseToDos = JSON.parse(loadedToDos); 
 
  const value = event.target.querySelector("input").value;
  const objNum = event.target.parentNode.id;
 
  //이거번째까아니라 objnum이라는 id 값을 가진 곳의 텍스트가 value 가되야한다. 이거부터 고쳐보자
  for(i=0 ; i<parseToDos.length ; i++){
    if(parseToDos[i]["id"]=== parseInt(objNum)){
      parseToDos[i].text=value;
    }
  }
 
  toDos = parseToDos;
  saveToDo();
  deleteAllLi();
  // loadToDos();
  const b = localStorage.getItem(TODOS_LS);
  reveal()
}
// Storage.removeItem() 

function createEditElement(event){
  const li= event.target.parentNode;
  const form = document.createElement("form");
  const input = document.createElement("input");
  form.classList.add("editForm");
  input.type= "text";
  input.placeholder="Write it down here";
  input.classList.add("editList");
  form.appendChild(input);
  li.appendChild(form);
  form.addEventListener('submit',handleEditSubmit)
}

function handleEdit(event){
  const checkForm = event.target.parentNode.querySelector("form")
  console.log(event.target);
  if(checkForm===null){
    createEditElement(event);
  }else{
    event.target.parentNode.removeChild(checkForm);
  }
}

function handleCheck(event){
  const span = event.target.parentNode.querySelector("span");
  const LineClass = span.classList.value;
  if(LineClass===""){
    span.classList.add("centerLine");
  }else{
    span.classList.remove("centerLine");
  }
}

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
  const btnCheck = document.createElement("button");
  const btnEdit = document.createElement("button");//Edit button
  btnEdit.innerHTML="Edit";//Edit button
  btnEdit.classList.add("editBtn")// Edit button
  btnCheck.innerHTML="✔";
  btnCheck.classList.add("btnCheck");
  span.innerHTML = toDo;
  btn.innerText = "❌";
  btn.addEventListener("click", handleDelete);
  btn.classList.add("toDoBtn");
  li.classList.add("toDoList");
  li.appendChild(span);
  li.appendChild(btn);
  li.appendChild(btnCheck);
  li.appendChild(btnEdit);//Edit button
  btnEdit.addEventListener('click',handleEdit);//Edit button
  btnCheck.addEventListener('click',handleCheck);
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
