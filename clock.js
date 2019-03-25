const clock = document.querySelector(".clock-js");
const monthDay = document.querySelector(".date-js");

function transMonth(month) {
  month += 1;
  if (month === 12) {
    month = 1;
  }
  return month;
}

function getTime() {
  const date = new Date();
  const month = date.getMonth();
  const changedMonth = transMonth(month);
  const day = date.getDate();
  monthDay.innerHTML = `${changedMonth}/${day}`;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clock.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
