import React, { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { fetchWeather } from "../services/weatherApi";
import styles from "../styles/SearchBar.module.css";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const { city, setCity, unit, setUnit, setWeatherData, setError } =
    useContext(WeatherContext);
  const [input, setInput] = useState(city);

  const handleSearch = async () => {
    if (input !== "") {
      try {
        setError(null);
        const data = await fetchWeather(input, unit);
        setCity(input);
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Please search for city...");
      setWeatherData(null);

      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search for city.."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.input}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <div className={styles.buttonContainer}>
        <BsSearch onClick={handleSearch} className={styles.button} />
      </div>

      <div className={styles.unitContainer}>
        <div
          className={`${styles.unit} ${
            unit === "metric" ? styles.selected : ""
          } ${input === "" ? styles.disabled : ""}`}
          onClick={() => input !== "" && setUnit("metric")}
        >
          °C
        </div>
        <div
          className={`${styles.unit} ${
            unit === "imperial" ? styles.selected : ""
          } ${input === "" ? styles.disabled : ""}`}
          onClick={() => input !== "" && setUnit("imperial")}
        >
          °F
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
