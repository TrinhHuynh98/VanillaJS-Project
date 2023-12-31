const api = {
  key: "701e02d4ee35526abd6876e38aa547ba",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", handleQuery);

function handleQuery(event) {
  if (event.keyCode == 13) {
    getResult(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResult(param) {
  fetch(`${api.base}weather?q=${param}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
}

function displayResult(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_item = document.querySelector(".current .weather");
  weather_item.innerText = weather.weather[0].main;

  let min_max_temp = document.querySelector(".current .min-max-temp");
  min_max_temp.innerText = `${Math.round(
    weather.main.temp_min
  )}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
