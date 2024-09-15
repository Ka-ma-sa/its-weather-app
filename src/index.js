function updateCity(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#form-input");
	let cityName = document.querySelector("#city-name");
	cityName.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", updateCity);
