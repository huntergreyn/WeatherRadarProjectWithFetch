// Function to fetch and display weather data
function getWeather() {
    const apiKey = '71b8b738502f9c25a53b9ade7373330d';
    //  Get access to the city name entered by the user
    const city = document.getElementById('city').value;
    
    // cheack if the city name is entered
    if (!city) {
        alert('Please enter a city');
        return;
    }
// construct urls to the fetch
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Fetch for cuurent url data
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });
 
    // Fetch for forecast url data
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

// function to display surrent weather data
// get access to the elements in html by DOM
function displayWeather(data) {
    const tempDivInfo = document.getElementById('tempDiv');
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const weatherIcon = document.getElementById('weatherIcon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear any previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    // check if the API returned an error (if city not found)
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // create html elements to display weather information
        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;
        // html
        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
            <p>برنامه نویس خوب استاد خاطری هستی🤗</p>
            <p>چون هوا خوبه، اینجانب امیرحسین خاطری تصمیم دارم انتخاب ساعت کلاس هارو به برنامه نویس های  فول استک این کلاس بسپارم🌷</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}
// function to dipaly hourly forecast data
function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        // create html element to display hourly forecast for each time slot
        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}