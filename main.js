async function fetchWeatherData(city){
    /* can get an API key from https://openweathermap.org/api sign up */
    const apiKEY = "";
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
    const weatherIcon = document.querySelector(".weather-icon");
    const inputCard = document.querySelector(".input_card");
    const weatherType = document.querySelector(".weather_type");
    const response = await fetch(apiURL + "&appid=" + apiKEY + "&q=" + city);
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
    document.querySelector(".wind").innerHTML = data.wind.speed + ' km/h';

    /* According to the API documentation
    The weather id value in the API response indicates the weather type - https://openweathermap.org/weather-conditions
    Code Range     Type
    2xx            Thunderstorm
    3xx            Drizzle
    5xx            Rain
    6xx            Snow
    7xx            Atmosphere (Mist)
    800            Clear Sky
    80x            Clouds
    */
    if(data.weather[0].id >= 200 && data.weather[0].id < 300){
        weatherIcon.src = "images/thunderstorm.png";
        inputCard.style.background = 'linear-gradient(135deg, #1F64C8, #0A3472)';
        weatherType.innerHTML = data.weather[0].main;
    }
    if(data.weather[0].id >= 300 && data.weather[0].id < 500){
        weatherIcon.src = "images/drizzle.png";
        inputCard.style.background = 'linear-gradient(135deg, #F1F7BC, #5299FF)';
        weatherType.innerHTML = data.weather[0].main;
    }
    if(data.weather[0].id >= 500 && data.weather[0].id < 600){
        weatherIcon.src = "images/rain.png";
        inputCard.style.background = 'linear-gradient(135deg, #6BC1E5, #249ECF)';
        weatherType.innerHTML = data.weather[0].main;
    }
    if(data.weather[0].id >= 600 && data.weather[0].id < 700){
        weatherIcon.src = "images/snow.png";
        inputCard.style.background = 'linear-gradient(135deg, #BFD6F7, #94BCF7)';
        weatherType.innerHTML = data.weather[0].main;
    }
    if(data.weather[0].id >= 700 && data.weather[0].id < 800){
        weatherIcon.src = "images/mist.png";
        inputCard.style.background = 'linear-gradient(135deg, #B2BABB, #72EAF8)';
        weatherType.innerHTML = data.weather[0].main;
    }
    if(data.weather[0].id == 800){
        weatherIcon.src = "images/clear.png";
        inputCard.style.background = 'linear-gradient(135deg, #F0FA5D, #5DFAFA)';
        weatherType.innerHTML = data.weather[0].main;
    }
    if(data.weather[0].id > 800){
        weatherIcon.src = "images/clouds.png";
        inputCard.style.background = 'linear-gradient(135deg, #D7DBDE, #A5A6A7)';
        weatherType.innerHTML = data.weather[0].main;
    }
}

/* these next 2 functions are only to get the weather data of the user's current location when the site is first opened */
/* making use of the in built geolocation API of HTML */
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log('GeoLocation API Not supported by browser');
    }
}

async function showPosition(position){  
    var x = "Your current location is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " +    position.coords.longitude + ")";  
    console.log(x);

    /* convert coordinates to city */

    /* get geoapify API key by signing up and making a reverse geocoding key - https://myprojects.geoapify.com/login */
    const response = await fetch("https://api.geoapify.com/v1/geocode/reverse?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&apiKey=" + "");
    const data = await response.json();
    console.log(data.features[0].properties.city);
    fetchWeatherData(data.features[0].properties.city);
}


