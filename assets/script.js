let weather = {
    "apiKey": "3e3fd5adbe0d665d9c408101d56eac67",
    fetchWeather: function () {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Raleigh&appid=3e3fd5adbe0d665d9c408101d56eac67"
        ).then((response) => response.json())
        .then((data) => console.log(data));
    }
}