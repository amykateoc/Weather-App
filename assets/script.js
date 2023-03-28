//to get current weather: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=c94f954caeea54a371fb219758378b8b
//geocoder: http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=c94f954caeea54a371fb219758378b8b

//Search Bar Variables
var CityNameEl = document.getElementById('cityName');
var searchBtn = document.querySelector('searchEl');

//Current Weather Variables
var currentWeather = document.getElementById('tempEl');
var currentWeatherTitle = document.getElementById('Ctitle');

//Forecast Variables
var forecastTitle = document.getElementById('Ftitle');
var fDayOne = document.getElementById('dayOne');
var fDayTwo = document.getElementById('dayTwo');
var fDayThree = document.getElementById('dayThree');
var fDayFour = document.getElementById('dayFour');
var fDayFive = document.getElementById('dayFive');

var today = dayjs();
var todaysDate = document.getElementById('currentDay');

var weatherIcon = document.getElementById('iconEl');


function getWeather() {
    getCurrentWeather();
    getForecast();
}


function getCurrentWeather() {
    var city = document.querySelector('.inputEl').value;
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=c94f954caeea54a371fb219758378b8b';
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        // console.log(data.city.name);
        CityNameEl.textContent = "City Name: " + data.name;
        currentWeatherTitle.textContent = "Current Conditions";
        todaysDate.textContent = today;
        currentWeather.textContent = "Temp: " + data.main.temp + "  Humidity: " + data.main.humidity + "%  Wind speed: " + data.wind.speed + "mph";
        if (data.main.humidity > 90) {
            weatherIcon.setAttribute ('src', '/Users/amydipiazza/bootcamp/challenges/challenge6/assets/icons/icons8-rainy-weather-60.png')
        }
        else if (data.main.temp > 75) {
            weatherIcon.setAttribute ('src', '/Users/amydipiazza/bootcamp/challenges/challenge6/assets/icons/icons8-sun-48.png')
        }
        else if (data.main.temp < 32) {
            weatherIcon.setAttribute ('src', 'Users/amydipiazza/bootcamp/challenges/challenge6/assets/icons/icons8-snowflake-50.png')   
        }
        else if (data.wind.speed > 20) {
            weatherIcon.setAttribute ('src', '/Users/amydipiazza/bootcamp/challenges/challenge6/assets/icons/icons8-windy-48.png')
        }
        else {
            weatherIcon.setAttribute ('src', '/Users/amydipiazza/bootcamp/challenges/challenge6/assets/icons/icons8-partly-cloudy-day-30.png')   
        }
    })
};



function getForecast() {
    var  days = 5;
    var city = document.querySelector('.inputEl').value;
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial' + '&cnt=' + days + '&appid=c94f954caeea54a371fb219758378b8b'


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // var results = document.createElement('div');
            // results.textContent = data;
            console.log(data)
            console.log(data.city.name);
            CityNameEl.textContent = "City Name: " + data.city.name;
            for (var i = 0; i < data.list.length; i++) {
                console.log(data.list[i].main.humidity);
                forecastTitle.textContent = "Five Day Forecast";
                fDayOne.textContent = "Temp: " + data.list[0].main.temp + " Humidity: " + data.list[0].main.humidity + "% Wind speed: " + data.list[0].wind.speed + "mph";

                fDayTwo.textContent = "Temp: " + data.list[1].main.temp + " Humidity: " + data.list[1].main.humidity + "% Wind speed: " + data.list[1].wind.speed + "mph";

                fDayThree.textContent = "Temp: " + data.list[2].main.temp + " Humidity: " + data.list[2].main.humidity + "% Wind speed: " + data.list[2].wind.speed + "mph";

                fDayFour.textContent = "Temp: " + data.list[3].main.temp + " Humidity: " + data.list[3].main.humidity + "% Wind speed: " + data.list[3].wind.speed + "mph";

                fDayFive.textContent = "Temp: " + data.list[4].main.temp + " Humidity: " + data.list[4].main.humidity + "% Wind speed: " + data.list[4].wind.speed + "mph";
            }
        })
        
}


var searchBtn = document.querySelector('.searchEl');
searchBtn.addEventListener('click', getWeather);


//TO DO: Replace api keys in link when fetching certain cities
//TO DO: use geocoder api to convert city names to coordinates to be used in weather api
//TO DO: add event listeners to each preset city button with proper coordinates