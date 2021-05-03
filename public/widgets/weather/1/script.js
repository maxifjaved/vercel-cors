const CORS_ANYWHERE_URL = "https://cors-anywhere.herokuapp.com/";
const OPEN_WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const OPEN_WEATHER_APP_ID = "3d3b5a9ac6383aca1ebce6fe9865189d";

const getOpenWeatherJSON = (openWeatherUrl) => {
	fetch(CORS_ANYWHERE_URL + openWeatherUrl)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if (data.cod != 200) {
				document.querySelector('#weatherWidgetHolder').innerHTML = `<h1>${data.message}</h1>`
				return true;
			}
			document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
			document.querySelector(".temp").innerHTML = data.main.temp.toFixed(1);
			document.querySelector(".hum").innerHTML = data.main.humidity;
			document.querySelector(".icon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.weather[0]["icon"] + ".png'>";
			document.querySelector(".weather").innerHTML = data.weather[0]["description"];
		})
}

const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city');

if (city) {
	let openWeatherUrl = OPEN_WEATHER_BASE_URL + "?q=" + city + "&units=metric&appid=" + OPEN_WEATHER_APP_ID;
	getOpenWeatherJSON(openWeatherUrl);
} else {
	if (navigator && navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((pos) => {
			const {latitude, longitude} = pos.coords;
			let openWeatherUrl = OPEN_WEATHER_BASE_URL + "?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + OPEN_WEATHER_APP_ID;
			getOpenWeatherJSON(openWeatherUrl);
		}, () => alert("Failed to locate your city. Please make sure you allowed location services."));
	}
}
