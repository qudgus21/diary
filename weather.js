const COORDS = "coords";
const KEY = "262982f6f64a6c497e6a5d3ebca4e8ae";
const weather = document.querySelector(".js-weather");
const MY_WEATHER = "myWeather";

function callApi(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`
  )
    .then(function(response) {
    
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerHTML = `온도: ${temperature}<br>
                           위치: ${place}`;
    });
}

function saveCoords(lat, lon) {
  const coordsObj = {
    lat: lat,
    lon: lon
  };
  localStorage.setItem(MY_WEATHER, JSON.stringify(coordsObj));
}

function coordsSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  callApi(lat, lon);
  saveCoords(lat, lon);
}

function coordsFail(position) {
  console.log("fail");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(coordsSuccess, coordsFail);
}

function loadWeather() {
  const loadedWeather = localStorage.getItem(MY_WEATHER);
  if (loadedWeather === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedWeather);
    callApi(parseCoords.lat, parseCoords.lon);
  }
}

function init() {
  loadWeather();
}

init();
