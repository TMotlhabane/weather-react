import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import WeatherForecast from "./WeatherForecast";
import WeatherIcon from "./WeatherIcon";
import axios from "axios";
import "./WeatherSearch.css";

export default function WeatherSearch(props) {
  let [city, setCity] = useState(props.defaultCity);
  let [weather, setWeather] = useState({});
  let [loaded, setLoaded] = useState(false);

  function getWeather(response) {
    setLoaded(true);
    setWeather({
      coordinates:response.data.coord,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
    });
  }

function handleSubmit(event){
  event.preventDefault();
  search();
}

  function search() {
    let apiKey = `c6f8ef4575250284954db9f4dfa7a996`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(getWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className= "row">
            <div className= "col-6">
          <input type="search" onChange={updateCity} />
          </div>
         <div className= "col-3">
          <input type="submit" value="Search" />
          </div>
          </div>
        </form>
        <h1>
          {weather.city}
          <ul>
            <li> <FormattedDate date={weather.date} /> </li>
            <li>
              {weather.description}
            </li>
          </ul>
        </h1>
        <div className="row">
          <div className="col-6">
   <div className="WeatherIcon">
    <WeatherIcon code={weather.icon} size={52} />
   </div>
         
          <span> <strong>{Math.round(weather.temperature)}</strong> </span> 

<span>°C</span> 
         
          </div>
          <div className="col-6">
            <ul>
  <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          </ul>
          </div>
    
      </div>
<WeatherForecast coordinates={weather.coordinates} />

      </div>


);
  } else {search() ; return "loading..." }
  ;
}
