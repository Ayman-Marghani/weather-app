# Weather App 🌤️

## 📖 Project Description
A simple and responsive weather dashboard built with **HTML, CSS, and JavaScript** that fetches real-time weather data using the [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api/).  
It displays current temperature, conditions, humidity, feels-like temperature, wind speed, and updates in a clean, user-friendly interface.  

🔗 **[Live Demo](https://ayman-marghani.github.io/weather-app/)**  

## ✨ Features
- Search by city name  
- Displays:
  - Current temperature  
  - Weather conditions with icons  
  - Feels like temperature  
  - Humidity percentage  
  - Wind speed  
  - Last updated time  
- Loading state while fetching data  
- Error handling for invalid or unavailable locations  
- Responsive design for mobile and desktop  



## 🛠️ Learned Skills
- Using **fetch API** with `async/await`  
- Handling API responses and errors with `try/catch`  
- DOM manipulation and dynamic content rendering  
- Managing **loading, success, and error states**  
- Implementing **responsive design** with CSS Grid & Flexbox  
- Working with third-party APIs  



## 💻 Technologies Used
- **HTML5**  
- **CSS3** (responsive design, custom styles)  
- **JavaScript (ES6+)** (fetch API, async/await, DOM manipulation)  
- **npm** (project setup and deployment)  
- **Visual Crossing API** (weather data)  
- **Flaticon** (weather icons)  



## 📂 Project Structure
```bash
weather-app/
├── src/                  # Source files
│   ├── index.html        # Main HTML file
│   ├── styles.css        # CSS styles
│   ├── script.js         # JavaScript functionality
│   └── icons/            # Weather icons (from Flaticon)
├── package.json          # npm configuration & scripts
├── package-lock.json     # npm lock file
├── README.md             # Project documentation
├── .gitignore            # Ignored files/folders (node_modules, dist, etc.)
├── dist/                 # Production build (auto-generated)
└── node_modules/         # Dependencies (auto-generated)
```

## ⚙️ Setup and Usage
1. Clone this repository:
   ```bash
   git clone https://github.com/ayman-marghani/weather-app.git
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run start
    ```

4. Enter a city name and hit search to view the weather details.

⚠️ Note: You will need a Visual Crossing API key to replace in script.js.


## Credits
- UI Design: Claude

- Weather Data: [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)

- Icons: [Flaticon Weather Pack](https://www.flaticon.com/packs/weather-161)

