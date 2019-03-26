const greetingForm = document.querySelector(".js-greeting_form");
const greetingInput = greetingForm.querySelector("input");
const greeting = document.querySelector(".js-greeting");
const MY_NAME = "myName";

function handleClick(event) {
  const text = event.target;
  const h4 = text.parentNode;
  while (h4.hasChildNodes()) {
    h4.removeChild(h4.firstChild);
  }
  greetingInput.value = "";
  askForName();
}

function changeName() {
  const div = document.createElement("div");
  div.classList.add("changing_name");
  div.innerText = "click here to change name";
  greeting.appendChild(div);
  div.addEventListener("click", handleClick);
}

function changeGreet(greet) {
  if (6 <= greet && greet < 12) {
    greet = "morning";
  } else if (12 <= greet && greet < 18) {
    greet = "afternoon";
  } else {
    greet = "evening";
  }
  return greet;
}

function paintName(name) {
  greetingForm.classList.remove("showing");
  greeting.classList.add("showing");
  var greet = getTime(); //This is function in clock.js(how can i use local variable in another function?)
  greet = changeGreet(greet);
  const div = document.createElement("div");
  div.classList.add("greeting_name");
  div.innerHTML = `Good ${greet} ${name}`;
  greeting.appendChild(div);
  changeName();
}

function saveName(text) {
  localStorage.setItem(MY_NAME, text);
}

function setName(event) {
  event.preventDefault();
  const myName = greetingInput.value;
  paintName(myName);
  saveName(myName);
}

function askForName() {
  greetingForm.classList.add("showing");
  greetingForm.addEventListener("submit", setName);
}

function loadName() {
  loadedName = localStorage.getItem(MY_NAME);
  if (loadedName === null) {
    askForName();
  } else {
    paintName(loadedName);
  }
}

function init() {
  loadName();
}

init();
