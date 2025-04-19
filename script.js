// const apiKey = `e66aec222a9015463c9e489144cbafff`

// async function fetchWeatherData(city){
//     try{
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

//         if(!response.ok){
//             throw new Error("Unable to fetch weather data");
//         }
//         const data = await response.json();
//         // console.log(data);
//         // console.log(data.main.temp);
//         // console.log(data.name);
//         // console.log(data.wind.speed);
//         // console.log(data.main.humidity);
//         // console.log(data.visibility);
//         updateWeatherUI(data);
//     }catch(e){
//         console.error(error);
//     }
// }


// const cityName = document.querySelector(".city");
// const temperature = document.querySelector(".temp");
// const windSpeed = document.querySelector(".wind-speed");
// const humidity = document.querySelector(".humidity");
// const visibilityVal = document.querySelector(".visibility-distance");
// const descriptionText = document.querySelector(".description-text")
// const dateVal = document.querySelector(".date");

// const descriptionIcon = document.querySelector(".description i");

// function updateWeatherUI(data){
//     cityName.textContent = data.name;
//     temperature.textContent = `${Math.round(data.main.temp)}℃`;
//     windSpeed.textContent = `${data.wind.speed} km/h`;
//     humidity.textContent = `${data.main.humidity}%`;
//     visibilityVal.textContent = `${data.visibility/1000} km`;
//     descriptionText.textContent = data.weather[0].description;
    
//     const currentDate = new Date();
//     dateVal.textContent = currentDate.toDateString();

//     const weatherIconName = getWeatherIconName(data.weather[0].main);
//     descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`
// }  

// const formElement = document.querySelector(".search-form");
// const inpElement = document.querySelector(".city-input");

// formElement.addEventListener('submit',function(e){
//     e.preventDefault();

//     const city = inpElement.value;

//     if(city !== ''){
//         fetchWeatherData(city);
//         inpElement.value = "";
//     }

// })

// function getWeatherIconName(weatherCondition) {
//     const iconMap = {
//         Clear: "wb_sunny",
//         Clouds: "cloud",
//         Rain: "umbrella",
//         Thunderstorm: "flash_on",
//         Drizzle: "grain",
//         Snow: "ac_unit",
//         Mist: "blur_on",
//         Smoke: "smoking_rooms",
//         Haze: "wb_cloudy",
//         Fog: "cloud_queue",
//     };
//     return iconMap[weatherCondition] || "help_outline";
// }


const apiKey = `e66aec222a9015463c9e489144cbafff`

// DOM Elements
const loadingElement = document.querySelector('.loading');
const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibilityVal = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const dateVal = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");
const formElement = document.querySelector(".search-form");
const inpElement = document.querySelector(".city-input");
const weatherApp = document.querySelector('.weather-app');
const weatherIcon = document.querySelector('.weather-icon');
const body = document.body;

// Background images for different weather conditions
const backgroundImages = {
    Clear: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    Clouds: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    Rain: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    Thunderstorm: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    Snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    Mist: 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    Smoke: 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    Haze: 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    Fog: 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
};

// Show loading spinner
function showLoading() {
    loadingElement.style.display = 'flex';
    weatherApp.style.opacity = '0.5';
}

// Hide loading spinner
function hideLoading() {
    loadingElement.style.display = 'none';
    weatherApp.style.opacity = '1';
}

// Update background based on weather condition
function updateBackground(weatherCondition) {
    // Update gradient background
    const backgrounds = {
        Clear: 'linear-gradient(135deg, #00b4db, #0083b0)',
        Clouds: 'linear-gradient(135deg, #606c88, #3f4c6b)',
        Rain: 'linear-gradient(135deg, #373B44, #4286f4)',
        Thunderstorm: 'linear-gradient(135deg, #2C3E50, #3498db)',
        Snow: 'linear-gradient(135deg, #E3FDF5, #FFE6FA)',
        Mist: 'linear-gradient(135deg, #606c88, #3f4c6b)',
        Smoke: 'linear-gradient(135deg, #606c88, #3f4c6b)',
        Haze: 'linear-gradient(135deg, #606c88, #3f4c6b)',
        Fog: 'linear-gradient(135deg, #606c88, #3f4c6b)',
    };
    
    document.body.style.background = backgrounds[weatherCondition] || backgrounds.Clear;
    
    // Update background image
    const imageUrl = backgroundImages[weatherCondition] || backgroundImages.Clear;
    
    // Remove the background-loaded class to reset the animation
    body.classList.remove('background-loaded');
    
    // Set the background image
    body.style.setProperty('--bg-image', `url(${imageUrl})`);
    
    // Add a small delay to ensure the transition works properly
    setTimeout(() => {
        body.classList.add('background-loaded');
    }, 50);
}

// Preload background images
function preloadBackgroundImages() {
    Object.values(backgroundImages).forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Animate value changes
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const animate = () => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            return;
        }
        element.textContent = Math.round(current);
        requestAnimationFrame(animate);
    };
    
    animate();
}

async function fetchWeatherData(city) {
    try {
        showLoading();
        
        // Common city name corrections
        const cityCorrections = {
            'vishakapatnam': 'visakhapatnam',
            'vizag': 'visakhapatnam',
            'bangalore': 'bengaluru',
            'bombay': 'mumbai',
            'calcutta': 'kolkata',
            'madras': 'chennai'
        };
        
        // Convert to lowercase for comparison
        const normalizedCity = city.toLowerCase().trim();
        const correctedCity = cityCorrections[normalizedCity] || city;
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${correctedCity}&units=metric&appid=${apiKey}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`City "${city}" not found. Please check the spelling or try a different city name.`);
            } else {
                throw new Error("Unable to fetch weather data. Please try again later.");
            }
        }
        
        const data = await response.json();
        
        // Log the raw API response for verification
        console.log('Raw API Response:', {
            city: data.name,
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            visibility: data.visibility,
            weather: data.weather[0],
            timestamp: new Date(data.dt * 1000).toLocaleString(),
            timezone: data.timezone
        });

        // Validate the data
        if (!data.main || !data.weather || !data.weather[0]) {
            throw new Error("Invalid data received from the weather API");
        }

        updateWeatherUI(data);
    } catch (error) {
        console.error('Error details:', error);
        alert(error.message || "Error fetching weather data. Please try again.");
    } finally {
        hideLoading();
    }
}

function updateWeatherUI(data) {
    // Update background
    updateBackground(data.weather[0].main);
    
    // Update weather icon in the top right if it exists
    if (weatherIcon) {
        const weatherIconName = getWeatherIconName(data.weather[0].main);
        weatherIcon.textContent = weatherIconName;
    }
    
    // Animate city name change
    cityName.style.opacity = '0';
    setTimeout(() => {
        cityName.textContent = data.name;
        cityName.style.opacity = '1';
    }, 300);

    // Update date with animation
    const currentDate = new Date();
    dateVal.textContent = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Validate temperature before updating
    const temp = Math.round(data.main.temp);
    if (isNaN(temp) || temp < -100 || temp > 100) {
        console.error('Invalid temperature value:', data.main.temp);
        temperature.textContent = '--';
    } else {
        // Animate temperature change
        const currentTemp = parseInt(temperature.textContent) || 0;
        animateValue(temperature, currentTemp, temp, 1000);
    }

    // Validate wind speed before updating
    const wind = Math.round(data.wind.speed);
    if (isNaN(wind) || wind < 0) {
        console.error('Invalid wind speed value:', data.wind.speed);
        windSpeed.textContent = '-- km/h';
    } else {
        // Animate wind speed
        const currentWind = parseInt(windSpeed.textContent) || 0;
        animateValue(windSpeed, currentWind, wind, 1000);
        windSpeed.textContent = `${wind} km/h`;
    }

    // Validate humidity before updating
    const humid = data.main.humidity;
    if (isNaN(humid) || humid < 0 || humid > 100) {
        console.error('Invalid humidity value:', data.main.humidity);
        humidity.textContent = '--%';
    } else {
        // Animate humidity
        const currentHumidity = parseInt(humidity.textContent) || 0;
        animateValue(humidity, currentHumidity, humid, 1000);
        humidity.textContent = `${humid}%`;
    }

    // Validate visibility before updating
    const vis = Math.round(data.visibility/1000);
    if (isNaN(vis) || vis < 0) {
        console.error('Invalid visibility value:', data.visibility);
        visibilityVal.textContent = '-- km';
    } else {
        // Animate visibility
        const currentVisibility = parseInt(visibilityVal.textContent) || 0;
        animateValue(visibilityVal, currentVisibility, vis, 1000);
        visibilityVal.textContent = `${vis} km`;
    }

    // Update weather description with animation
    descriptionText.style.opacity = '0';
    setTimeout(() => {
        descriptionText.textContent = data.weather[0].description;
        descriptionText.style.opacity = '1';
    }, 300);

    // Update weather icon with animation
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.style.transform = 'scale(0)';
    setTimeout(() => {
        descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
        descriptionIcon.style.transform = 'scale(1)';
    }, 300);
}  

formElement.addEventListener('submit',function(e){
    e.preventDefault();

    const city = inpElement.value.trim();

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

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    hideLoading();
    preloadBackgroundImages();
    
    // Set initial background
    body.style.setProperty('--bg-image', `url(${backgroundImages.Clear})`);
    body.classList.add('background-loaded');
});


