import './App.css';
import WeatherSearch from "./WeatherSearch.js";

function App() {
  return (
    <div className="App">
    <div className ="container">

   <WeatherSearch defaultCity="Meyerton"/>
   <footer>
    This project was coded by Tumelo B Motlhabane and is {" "} <a href="https://github.com/TMotlhabane/weather-react" target="_blank" rel="noopener noreferrer"> open-sourced on Github </a>{" "}
and hosted on Netify
   </footer>
   
   </div>
    </div>
  );
}

export default App;
