/**
 * Fetches and displays the current weather and 7-day forecast for a user-specified city
 * using the Open-Meteo Geocoding and Forecast APIs.
 *
 * The function:
 * - Validates city input from the DOM (#cityInput)
 * - Retrieves latitude and longitude for the city
 * - Fetches current weather and daily forecast
 * - Converts temperature to Fahrenheit if the checkbox (#tempToggle) is selected
 * - Displays weather information and forecast in the #weatherOutput element
 *
 * @returns {void} This function does not return a value; it updates the DOM directly.
 *
 * @example
 * // HTML setup:
 * // <input id="cityInput" />
 * // <input type="checkbox" id="tempToggle" />
 * // <div id="weatherOutput"></div>
 * getWeather();
 *
 * // Output (in the DOM):
 * // Current Weather for Paris, FR
 * // Temperature: 18.4 °C
 * // Wind Speed: 12 km/h
 * // 7-Day Forecast...
 *
 * @error
 * - Displays an error message in #weatherOutput if:
 *   - The city input is empty
 *   - The city is not found by the geocoding API
 *   - A network/API error occurs
 */

async function getWeather() {
    const cityInput = document.getElementById("cityInput").value.trim();
    const output = document.getElementById("weatherOutput");
    output.textContent = "";

    if (!cityInput) {
        output.textContent = "Please enter a city name.";
        return;
    }

    output.textContent = "Fetching weather data...";

    try {
        const city = cityInput.toLowerCase();
        const { latitude, longitude, name, country } = await fetchCoordinates(city);
        const weatherData = await fetchWeather(latitude, longitude);

        displayWeather(name, country, weatherData, output);

    } catch (error) {
        output.innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
        console.error("Weather fetching failed:", error);
    }
}

async function fetchCoordinates(city) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;
    const response = await fetch(geoUrl);
    if (!response.ok) throw new Error("Geocoding API request failed.");

    const data = await response.json();
    if (!data.results || data.results.length === 0) throw new Error("City not found. Please try another one.");

    const { latitude, longitude, name, country } = data.results[0];
    return { latitude, longitude, name, country };
}

async function fetchWeather(latitude, longitude) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&hourly=relativehumidity_2m,precipitation&timezone=auto`;
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error("Weather API request failed.");
    return await response.json();
}

function displayWeather(name, country, weatherData, output) {
    const { current_weather: current, daily, hourly } = weatherData;
    const isFahrenheit = document.getElementById("tempToggle").checked;
    const tempUnit = isFahrenheit ? "F" : "C";
    const convert = (temp) => isFahrenheit ? (temp * 9 / 5) + 32 : temp;

    const nowHourIndex = new Date().getHours();
    const currentHumidity = hourly?.relativehumidity_2m?.[nowHourIndex] ?? "N/A";
    const currentPrecip = hourly?.precipitation?.[nowHourIndex] ?? "N/A";

    let html = `<strong>Current Weather for ${name}, ${country}</strong><br>
                Temperature: ${convert(current.temperature).toFixed(1)} °${tempUnit}<br>
                Wind Speed: ${current.windspeed} km/h<br>
                Humidity: ${currentHumidity}%<br>
                Precipitation: ${currentPrecip} mm<br><br>
                <strong>7-Day Forecast:</strong><br>`;

    const days = Math.min(7, daily.time.length);
    for (let i = 0; i < days; i++) {
        const icon = getIcon(daily.weathercode[i]);
        html += `${daily.time[i]}<br>
                 <img src="${icon}" alt="icon" width="32" />
                 Max: ${convert(daily.temperature_2m_max[i]).toFixed(1)} °${tempUnit}, 
                 Min: ${convert(daily.temperature_2m_min[i]).toFixed(1)} °${tempUnit}, 
                 Precip: ${daily.precipitation_sum?.[i] ?? "N/A"} mm<br><br>`;
    }

    output.innerHTML = html;
}

/**
 * Returns the corresponding weather icon URL for a given Open-Meteo weather code.
 *
 * Weather codes are mapped to emoji-style weather icons from Icons8.
 * Unknown or unmapped codes return a generic "question mark" icon.
 *
 * @param {number} code - The Open-Meteo weather condition code.
 * @returns {string} The URL of the icon representing the weather condition.
 *
 * @example
 * const iconUrl = getIcon(0);
 * // iconUrl => "https://img.icons8.com/emoji/48/sun-emoji.png"
 *
 * const unknownIcon = getIcon(123);
 * // unknownIcon => "https://img.icons8.com/emoji/48/question-mark.png"
 */
function getIcon(code) {
    if ([0].includes(code)) return "https://img.icons8.com/emoji/48/sun-emoji.png";
    if ([1, 2, 3].includes(code)) return "https://img.icons8.com/emoji/48/sun-behind-cloud.png";
    if ([45, 48].includes(code)) return "https://img.icons8.com/emoji/48/fog.png";
    if ([51, 53, 55, 61, 63, 65].includes(code)) return "https://img.icons8.com/emoji/48/cloud-with-rain.png";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "https://img.icons8.com/emoji/48/cloud-with-snow.png";
    if ([95, 96, 99].includes(code)) return "https://img.icons8.com/emoji/48/cloud-with-lightning-and-rain.png";
    return "https://img.icons8.com/emoji/48/question-mark.png";
}
