const API_KEY = "3555118449400d0117b5e1e1b36b73eb";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = async (city, unit) => {
  try {
    let api = `${BASE_URL}/weather?q=${city}&APPID=${API_KEY}&units=${unit}`;

    const response = await fetch(api);

    if (!response.ok) {
      throw new Error("City not found");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchLongitudeLatitide = async (city) => {
  try {
    let api = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

    const response = await fetch(api);
    const json = await response.json();

    if (!response.ok) {
      throw new Error("City not found");
    }
    return [json[0]["lat"], json[0]["lon"]];
  } catch (error) {
    throw error;
  }
};
