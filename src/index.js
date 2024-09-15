function updateWeather(response) {
	console.log(response);
	let currentTemp = document.querySelector("#current-temp");
	let cityName = document.querySelector("#city-name");

	cityName.innerHTML = response.data.city;
	currentTemp.innerHTML = Math.round(response.data.temperature.current);
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
