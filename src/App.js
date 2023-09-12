import React, { useState } from 'react';
import './App.css';

const api = {
  key: "e62b4ecd86a99904e1eb62ce60ddf97e",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {
const [query, setQuery] = useState('');
const [weather, setWeather] = useState({});

// how to fetch data from the weather API
const search = evt => {
  if (evt.key === "Enter") {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
  }
} 

  const dateBuilder = function(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];     // get days of a week (local time) as indexes
    let date = d.getDate();       // get days of a month (local) as numbers
    let month = months[d.getMonth()];       // get months of a year as indexes
    let year = d.getFullYear();         // get full year as a whole number

    return `${day}, ${month} ${date}, ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? 
    ((weather.main.temp <= 13) ? 'app cloud'
    : (weather.main.temp > 13 && weather.main.temp < 17) ? 'app foggy'
    : (weather.main.temp >= 17 && weather.main.temp < 21) ? 'app pink'
    : (weather.main.temp >= 21 && weather.main.temp < 25) ? 'app warm'
    : 'app')
    : 'app'}>


        <main>
          <div className="search-box">
            <input type="text" className="search-bar" placeholder="Search Location ...." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}></input>
          </div>

          {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
  <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>  
          </div>

          <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}&#8451;</div>
          <div className="feel">Feels like: {Math.round(weather.main.feels_like)}&#8451;</div>
          <div className="weather">Weather: {weather.weather[0].main}</div>
          <div className="wind">Wind: {weather.wind.speed}m/s</div>
          <div className="humidity">Humidity: {weather.main.humidity}%</div>
          </div>
          </div>
          ) : ('')}
        </main>
    </div>
  )
}


//continue from 13:19

export default App;
