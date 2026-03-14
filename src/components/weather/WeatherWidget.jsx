import { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

async function getWeather() {
  const ENDPOINT =
    "https://api.open-meteo.com/v1/forecast?latitude=7.07&longitude=125.61&hourly=temperature_2m";
  const response = await fetch(ENDPOINT);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();

  return {
    time: data?.hourly?.time?.[0],
    temperature: data?.hourly?.temperature_2m?.[0],
  };
}

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getWeather()
      .then((result) => {
        if (!isMounted) return;
        setWeather(result);
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Unable to load weather data.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="weather-card">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="weather-card error">{error}</div>;
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="weather-card">
      <h3>Weather (Davao)</h3>
      <p className="weather-temp">{weather.temperature}°C</p>
      <p className="weather-time">as of {weather.time}</p>
    </div>
  );
}

export default WeatherWidget;

