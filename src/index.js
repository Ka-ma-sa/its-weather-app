function updateWeather(response) {
	console.log(response);
	let currentTemp = document.querySelector("#current-temp");
	let cityName = document.querySelector("#city-name");
	let weatherCondition = document.querySelector("#weather-condition");
	let weatherHumidity = document.querySelector("#humidity");
	let weatherWind = document.querySelector("#wind-speed");
	let time = document.querySelector("#date-time");
	let date = new Date(response.data.time * 1000);
	let icon = document.querySelector("#weather-icon");

	currentTemp.innerHTML = Math.round(response.data.temperature.current);
	cityName.innerHTML = response.data.city;
	weatherCondition.innerHTML = response.data.condition.description;
	weatherHumidity.innerHTML = response.data.temperature.humidity;
	weatherWind.innerHTML = response.data.wind.speed;
	time.innerHTML = formateDate(date);
	icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;
	getForecast(response.data.city);
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

function formatTime(timestamp) {
	let date = new Date(timestamp * 1000);
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[date.getDay()];
}

function getForecast(city) {
	let apiKey = "7baftbbf50402a793aa44f3065a0o1bd";
	let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

	axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
	let forecastHtml = "";
	response.data.daily.forEach(function (day, index) {
		if (index < 5) {
			forecastHtml =
				forecastHtml +
				`
			<div class="weather-forecast-day">
			<div class="forecast-date">${formatTime(day.time)}</div>
			<img src ="${day.condition.icon_url}" class="forecast-icon"/> 
			<div class="forecast-temp">
				<span class="forecast-temperature high">${Math.round(
					day.temperature.maximum
				)}</span>
				<span class="forecast-temperature">${Math.round(day.temperature.minimum)}</span>
			</div>
		</div>
		`;
		}
	});

	let forecast = document.querySelector("#weather-forecast");
	forecast.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", updateCity);

searchCity("Hong Kong");
