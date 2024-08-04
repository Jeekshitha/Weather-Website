document.getElementById('weather-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const apiKey = 'b0cc17fc050c219106a1deb5109101f2';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod === 200) {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const weatherIcon = data.weather[0].icon;
            updateWeatherInfo(temperature, description, weatherIcon);
        } else {
            alert('Location not found.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});

function updateWeatherInfo(temperature, description, weatherIcon) {
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('description').textContent = description;

    const weatherAnimation = document.getElementById('weather-animation');
    weatherAnimation.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">`;

    // Update animation based on description
    if (description.includes('clear')) {
        weatherAnimation.className = 'weather-animation sunny';
    } else if (description.includes('cloud')) {
        weatherAnimation.className = 'weather-animation cloudy';
    } else if (description.includes('rain')) {
        weatherAnimation.className = 'weather-animation rainy';
    } else if (description.includes('snow')) {
        weatherAnimation.className = 'weather-animation snowy';
    } else {
        weatherAnimation.className = 'weather-animation default';
    }
}
