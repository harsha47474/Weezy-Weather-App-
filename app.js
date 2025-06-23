const apiKey = "62cc6ef6ba7bddfdab8ca24b73eb976f";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function checkWeather(city = "Berlin") {
    try {
        const response = await fetch(`${baseUrl}&q=${city}&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }
        
        const data = await response.json();
        console.log(data);

        // Update displays
        document.querySelector(".city").textContent = `Weather of ${data.name}`;
        document.querySelector(".coord").innerHTML=`Co-ordinates : (${data.coord.lat},${data.coord.lon})`

        /* Temperature */
        document.querySelector(".temp").textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
        document.querySelector(".min-temp").textContent = `Min Temperature: ${Math.round(data.main.temp_min)}°C`;
        document.querySelector(".max-temp").textContent = `Max Temperature: ${Math.round(data.main.temp_max)}°C`;
        document.querySelector(".feels-like").textContent = `Feels Like: ${Math.round(data.main.feels_like)}°C`;

        /* Humidity */
        document.querySelector(".humid").textContent = `Humidity: ${data.main.humidity}%`;

        /* Other */
        document.querySelector(".pressure").textContent = `Pressure: ${data.main.pressure} hPa`;
        document.querySelector(".sea-level").textContent = data.main.sea_level ? 
            `Sea Level: ${data.main.sea_level} hPa` : "Sea Level: N/A";
        document.querySelector(".grnd-level").textContent = data.main.grnd_level ? 
            `Ground Level: ${data.main.grnd_level} hPa` : "Ground Level: N/A";
        
    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Error: " + error.message);
    }
}


document.querySelector(".search-btn").addEventListener("click", (e) => {
    e.preventDefault(); 
    const city = document.querySelector(".search").value.trim();
    if (city) {
        checkWeather(city);
    }
});

document.querySelectorAll('.city-option').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const city = e.target.getAttribute('data-city');
        checkWeather(city);
        
        // Optional: Update search box with selected city
        document.querySelector('.search').value = city;
    });
});


checkWeather();