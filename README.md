# 🌤️ Simple Weather App

A lightweight weather app that allows users to search for any city and fetch current weather conditions—including temperature, wind speed, and a 7-day forecast—using the [Open-Meteo API](https://open-meteo.com/). The app supports temperature conversion to Fahrenheit and provides icons for visual weather representation.

---

## 📦 Project Overview

This weather app is built using HTML, CSS, and JavaScript. It fetches:

- **Current weather** data (temperature and wind speed)
- **7-day forecast** (max/min temperatures and weather codes)
- Converts temperatures to **Celsius or Fahrenheit**
- Displays **weather icons** for clarity
- Handles **invalid city names** and displays helpful error messages

---

## 🛠️ Installation Instructions

1. **Clone the repository** or download the ZIP:
   ```bash
   git clone https://github.com/Svyatoslavpech/Weather-App.git
   ```

2. **Open the app**:
   Open `index.html` in any modern web browser (e.g., Chrome, Firefox).

> ⚠️ No build or dependency installation is required — this is a static client-side app.

---

## 🚀 Usage Guide

1. Open `index.html` in your browser.
2. Enter a city name (e.g., `New York`, `Paris`, `Tokyo`) into the input field.
3. Optionally, check the box to display temperature in Fahrenheit.
4. Click **"Get Weather"**.
5. View the current weather and a 7-day forecast with icons.

---

## 🧪 Example Output

**Input:** `"Chicago"` with Fahrenheit toggle ON  
**Output:**

```
Current Weather for Chicago, US
Temperature: 75.2 °F
Wind Speed: 10 km/h

7-Day Forecast:
2025-06-13
☀️ Max: 80.6 °F, Min: 68.0 °F
...
```

(Sample icons such as ☀️, 🌧️, ❄️ are displayed depending on the weather code.)

---

## ✨ Features

- 🌎 Geolocation via Open-Meteo Geocoding API  
- 🌤️ Real-time weather data (temperature, wind, weather code)
- 🌡️ Toggle between Celsius and Fahrenheit
- 🧭 Weather icons based on Open-Meteo codes
- 🛡️ Error handling for invalid input or failed fetch
- 🧪 Automated test suite using Mocha + Chai
- 📜 Logging in dev console for debugging
- 📋 Structured output for current and forecasted weather

---

## ⚠️ Error Handling

- Empty input → `Please enter a city name.`
- Invalid city → `City not found. Please try another one.`
- Network/API failure → `An error occurred while fetching data.`

Implemented via input checks and `try-catch` blocks with user feedback.

---

## 🌐 API Information

This app uses:

- **Geocoding API**  
  `https://geocoding-api.open-meteo.com/v1/search?name={city}`

- **Weather Forecast API**  
  `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&...`

These APIs are **free to use and do not require an API key**.

---

## 🔬 Testing

Automated tests are provided using **Mocha** and **Chai** via `test.html`.  
The test suite includes:

- ✅ City input validation (empty strings, spaces)
- ✅ City name encoding (`São Paulo`)
- ✅ Invalid coordinate rejection
- ✅ Case-insensitive input comparisons
- ✅ DOM loading message confirmation
- ✅ Weather icon mapping logic in `getIcon()`

---

## 🧩 Future Improvements

- 📍 Add browser geolocation support
- 🌍 Multi-language or locale options
- 📊 Weather trends and charts
- 🌓 Dark mode support
- ⚙️ Modular JavaScript for scalability
- 💾 Cache recent city results

---

## 📁 Project Structure

```
.
├──config/              # Configuration modules used throughout the Weather-App
│   └── example.env     # A safe-to-share example showing the variable names needed
├──public/              # Static assets that are served directly to the browser
│   └──icons/           # Image files used to visually represent content in the Weather-App
│   └── test-weather.js # Mocha/Chai tests
├── .gitignore          # Specifies which files and directories Git should ignore when committing changes
├── style.css           # Basic styling
├── index.html          # Main UI
├── test.html           # Test runner
├── main.js             # Contains the core JavaScript logic for the Weather-App
├── script.js           # Weather logic
├── test.js             # Contains unit tests for the Weather-App, written using **Mocha** and **Chai**
└── README.md           # This file
```

---

## 🙌 Contributions

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)