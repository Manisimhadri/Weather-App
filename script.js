const apiKey = `e66aec222a9015463c9e489144cbafff`

async function fetchWeatherData(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

        if(!response.ok){
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        // console.log(data);
        // console.log(data.main.temp);
        // console.log(data.name);
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // console.log(data.visibility);
        updateWeatherUI(data);
    }catch(e){
        console.error(error);
    }
}


const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibilityVal = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text")
const dateVal = document.querySelector(".date");

const descriptionIcon = document.querySelector(".description i");

function updateWeatherUI(data){
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}℃`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibilityVal.textContent = `${data.visibility/1000} km`;
    descriptionText.textContent = data.weather[0].description;
    
    const currentDate = new Date();
    dateVal.textContent = currentDate.toDateString();

    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`
}  

const formElement = document.querySelector(".search-form");
const inpElement = document.querySelector(".city-input");

formElement.addEventListener('submit',function(e){
    e.preventDefault();

    const city = inpElement.value;

    if(city !== ''){
        fetchWeatherData(city);
        inpElement.value = "";
    }

})

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "cloud",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "blur_on",
        Smoke: "smoking_rooms",
        Haze: "wb_cloudy",
        Fog: "cloud_queue",
    };
    return iconMap[weatherCondition] || "help_outline";
}

