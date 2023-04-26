let searchHistory = JSON.parse(localStorage.getItem("data"));

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
        
    }, 
    
    searchHistory: function(searchParam) {
        const { maxHistoryLength } = 5;
        const { history } = JSON.parse(localStorage.getItem('data') || '[]');
        const { isHistoryMaxed } = history.length === maxHistoryLength;
        const { workingHistory } = isHistoryMaxed ? history.slice(1) : history;
        const { updatedHistory } = workingHistory.concat(searchParam);
      
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      }
      
      updateSearchHistoryUi: function() { 
        const { history } = JSON.parse(localStorage.getItem('data') || '[]');
      
        $('#history').empty().append(history.map(v => `
          <ul>
            <li class="fa fa-long-arrow-right icons"></li>
            <li class="list-title">${v}</li>
          </ul>
        `).join(''));
      }
    
    /*searchHistory: function(searchParam) {
        const { maxLength } = 5;
        const {}

        localStorage.setItem("data", JSON.stringify(data));
    }*/
        
        
    
    search: function () {
        this.fetchWeather(document.querySelector("#searchCity").value);
    }
};

document.querySelector("#btn-search").addEventListener("click", function() {
    weather.search();
});

document.querySelector("#searchCity").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})