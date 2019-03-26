const bgBody = document.querySelector("body");

function randomNumber() {
  const num = Math.floor(Math.random() * 10) + 1;
  return num;
}

function loadBgImage() {
  const image = new Image();
  image.classList.add("bgImage");
  image.src = `images/${randomNumber()}.jpg`;
  bgBody.appendChild(image);
}

function init() {
  loadBgImage();
}

init();
