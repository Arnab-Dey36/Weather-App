const apiKey = "2bc20c06e25285dbdcda1f05c272e509";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    //when the city is not found
    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";

      // Clear previous weather data
      document.querySelector(".temp").innerHTML = "";
      document.querySelector(".city").innerHTML = "";
      document.querySelector(".humidity").innerHTML = "";
      document.querySelector(".wind").innerHTML = "";
      document.querySelector(".weather-icon").src = "";

    
      return;
    }
    else {
        const data = await response.json();
        console.log(data);
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            document.querySelector(".weather-icon").src = "./Picture/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            document.querySelector(".weather-icon").src = "./Picture/clear.png";
        } else if (data.weather[0].main == "Rain") {
            document.querySelector(".weather-icon").src = "./Picture/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            document.querySelector(".weather-icon").src = "./Picture/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            document.querySelector(".weather-icon").src = "./Picture/mist.png";
        } else if (data.weather[0].main == "Snow") {
            document.querySelector(".weather-icon").src = "./Picture/snow.png";
        }
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }

}
searchBtn.addEventListener("click", () => {
  const city = searchInput.value;
  checkWeather(city);
});
