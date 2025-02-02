import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import styles from "../styles/WeatherCard.module.css";
import {
  BsFillSunriseFill,
  BsFillSunsetFill,
  BsSunFill,
  BsThermometerHalf,
  BsWind,
} from "react-icons/bs";
import { BiSolidDroplet } from "react-icons/bi";

const WeatherCard = () => {
  const { weatherData, unit } = useContext(WeatherContext);

  if (!weatherData) return null;

  const { main, wind, weather, name } = weatherData;

  function getFormattedDateTime(timestamp) {
    const date = new Date(timestamp * 1000);

    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  }

  function getFormattedTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  }

  return (
    <div className={styles.weatherCard}>
      <div className={styles.text}>{getFormattedDateTime(weatherData.dt)}</div>

      <div className={styles.cityName}>
        {name}, {weatherData["sys"]["country"]}
      </div>

      <div className={styles.tempData}>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
        />

        <div className={styles.temp}>
          {Math.floor(main.temp)}
          {unit === "imperial" ? "°F" : "°C"}
        </div>

        <div className={styles.tempDetails}>
          <div className={styles.singleDetail}>
            <BsThermometerHalf />
            <div>Feels like:</div>
            <div className={styles.text}>
              {Math.floor(main.feels_like)}
              {unit === "imperial" ? "°F" : "°C"}
            </div>
          </div>

          <div className={styles.singleDetail}>
            <BiSolidDroplet />
            <div>Humidity:</div>
            <div className={styles.text}>{main.humidity}%</div>
          </div>

          <div className={styles.singleDetail}>
            <BsWind />
            <div> Wind:</div>
            <div className={styles.text}>
              {Math.floor(wind.speed)}
              {unit === "imperial" ? "mph" : "km/hr"}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sunDetails}>
        <div className={styles.iconTimeContainer}>
          <BsFillSunriseFill />
          <div className={styles.text}>
            Rise : <span>{getFormattedTime(weatherData.sys.sunrise)}</span>{" "}
          </div>
        </div>
        <div className={styles.divider}>|</div>
        <div className={styles.iconTimeContainer}>
          <BsFillSunsetFill />
          <div className={styles.text}>
            Sunset : <span>{getFormattedTime(weatherData.sys.sunset)}</span>
          </div>
        </div>
        <div className={styles.divider}>|</div>
        <div className={styles.iconTimeContainer}>
          <BsSunFill />
          <div className={styles.text}>
            High : <span>{Math.floor(main["temp_max"])}°</span>
          </div>
        </div>
        <div className={styles.divider}>|</div>
        <div className={styles.iconTimeContainer}>
          <BsSunFill />
          <div className={styles.text}>
            Low : <span>{Math.floor(main["temp_min"])}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
