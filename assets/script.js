/*let searchHistory = JSON.parse(localStorage.getItem("data"));*/



let weather = {
    "apiKey": "3e3fd5adbe0d665d9c408101d56eac67",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=imperial&appid=" 
        + this.apiKey
    )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Current Conditions in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
       
        localStorage.setItem("name", JSON.stringify(name));
        
    },  
    
    displayRecent: function (name) {
        this.fetchWeather(document.querySelector("#cityList").value);
    },

    search: function () {
        this.fetchWeather(document.querySelector("#searchCity").value);
    }
};




document.querySelector("#btn-search").addEventListener("click", function(event) {
    weather.search();
    event.preventDefault()
});

document.querySelector("#searchCity").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
        event.preventDefault();
    }
})





