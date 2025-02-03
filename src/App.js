import React, { useContext, useEffect } from "react";
import { WeatherProvider, WeatherContext } from "./context/WeatherContext";
import { fetchWeather } from "./services/weatherApi";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorDisplay";
import classes from "./styles/App.module.css";

const AppContent = () => {
  const { city, unit, setWeatherData, setError } = useContext(WeatherContext);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setWeatherData(null);
      if (city !== "") {
        try {
          const data = await fetchWeather(city, unit);
          // console.log("data : ", data);
          setWeatherData(data);
        } catch (error) {
          setError(error.message);
          setWeatherData(null);
        }
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [city, setWeatherData, setError, unit]);

  return (
    <div className={classes.app}>
      <h1>Weather Dashboard</h1>
      <SearchBar />
      <ErrorMessage />
      <WeatherCard />
    </div>
  );
};

const App = () => (
  <WeatherProvider>
    <AppContent />
  </WeatherProvider>
);

export default App;
