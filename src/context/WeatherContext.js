import React, { createContext, useState, useEffect } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(
    () => localStorage.getItem("lastCity") || ""
  );
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    localStorage.setItem("lastCity", city);
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        weatherData,
        setWeatherData,
        error,
        setError,
        unit,
        setUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
