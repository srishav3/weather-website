const searchButton = document.querySelector(".search button");
const apiKey = "5d9f674aa6e8dd91fd905d0b4fa1cced";

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const searchCity = document.querySelector(".search input").value.trim();
    const weatherIcon = document.querySelector(".weather-icon");
    const cityName = document.querySelector(".city");
    const temperature = document.querySelector(".temp");
    const humidity = document.querySelector(".humidity");
    const wind = document.querySelector(".wind");
    const weather = document.querySelector(".weather");
    const errorDiv = document.querySelector(".error");

    async function display(searchCity, apiKey) {
        try {
            const data = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + `&APPID=${apiKey}` + "&units=metric");
            if (!data.ok) {
                throw new Error("Incorrect city name");
            }
            const response = await data.json();
            console.log(response);
            errorDiv.classList.add("hidden");
            weather.classList.remove("hidden");
            temperature.textContent = `${Math.floor(response.main.temp)}°C`;
            cityName.textContent = `${response.name}`;
            wind.textContent = `${response.wind.speed} km/hr`;
            humidity.textContent = `${response.main.humidity}%`

            if (response.weather[0].main === "Clouds") {
                weatherIcon.src = "images/clouds.png";
            }
            else if (response.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear.png";
            }
            else if (response.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain.png";
            }
            else if (response.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            }
            else if (response.weather[0].main === "Mist") {
                weatherIcon.src = "images/mist.png";
            }
            else if (response.weather[0].main === "Snow") {
                weatherIcon.src = "images/snow.png";
            }

            weather.classList.remove("hidden");

        } catch (error) {
            weather.classList.add("hidden");
            errorDiv.textContent = error.message;
            errorDiv.classList.remove("hidden");
        }

    }

    display(searchCity,apiKey);
})
//https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5d9f674aa6e8dd91fd905d0b4fa1cced
