function updateWeather(response) {
	console.log(response);
	let currentTemp = document.querySelector("#current-temp");
	let cityName = document.querySelector("#city-name");
	let weatherCondition = document.querySelector("#weather-condition");
	let weatherHumidity = document.querySelector("#humidity");
	let weatherWind = document.querySelector("#wind-speed");
	let time = document.querySelector("#date-time");
	let date = new Date(response.data.time * 1000);

	currentTemp.innerHTML = Math.round(response.data.temperature.current);
	cityName.innerHTML = response.data.city;
	weatherCondition.innerHTML = response.data.condition.description;
	weatherHumidity.innerHTML = response.data.temperature.humidity;
	weatherWind.innerHTML = response.data.wind.speed;
	time.innerHTML = formateDate(date);
}

function formateDate(date) {
	let mins = date.getMinutes();
	let hours = date.getHours();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];

	if (mins < 10) {
		mins = `0${mins}`;
	}

	if (hours < 10) {
		hours = `0${hours}`;
	}

	return `${day}, ${hours}:${mins}`;
}

function searchCity(city) {
	let apiKey = `7baftbbf50402a793aa44f3065a0o1bd`;
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
	axios.get(apiUrl).then(updateWeather);
}

function updateCity(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#form-input");
	searchCity(searchInput.value);
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", updateCity);

searchCity("Hong Kong");
