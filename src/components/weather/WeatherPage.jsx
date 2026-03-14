import { useEffect, useState, useCallback } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

const DEFAULT_LAT = 7.07;
const DEFAULT_LON = 125.61;
const DEFAULT_CITY = "Davao";

function weatherCodeToIcon(code) {
  if (code == null) return "—";
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "⛅";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "🌨️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95 && code <= 99) return "⛈️";
  return "☁️";
}

function weatherCodeToLabel(code) {
  if (code == null) return "—";
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Cloudy";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 85 && code <= 86) return "Snow showers";
  if (code >= 95 && code <= 99) return "Thunderstorm";
  return "Cloudy";
}

async function searchCity(name) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  const hit = data?.results?.[0];
  if (!hit) throw new Error("City not found");
  return { name: hit.name, lat: hit.latitude, lon: hit.longitude };
}

async function fetchForecast(lat, lon) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("current", "temperature_2m,relative_humidity_2m,wind_speed_10m");
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,weathercode");
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 429) throw new Error("Too many requests. Please try again later.");
    throw new Error("Weather data unavailable.");
  }
  return res.json();
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function WeatherPage() {
  const [cityInput, setCityInput] = useState("");
  const [location, setLocation] = useState({ name: DEFAULT_CITY, lat: DEFAULT_LAT, lon: DEFAULT_LON });
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const loadWeather = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchForecast(lat, lon);
      const cur = data?.current;
      const dailyData = data?.daily;
      setCurrent({
        temperature: cur?.temperature_2m,
        humidity: cur?.relative_humidity_2m,
        windSpeed: cur?.wind_speed_10m,
        time: data?.current_weather?.time || new Date().toISOString(),
      });
      const days = (dailyData?.time || []).slice(0, 5).map((time, i) => ({
        time,
        max: dailyData?.temperature_2m_max?.[i],
        min: dailyData?.temperature_2m_min?.[i],
        code: dailyData?.weathercode?.[i],
      }));
      setDaily(days);
    } catch (e) {
      setError(e.message || "Unable to load weather.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(location.lat, location.lon);
  }, [location.lat, location.lon, loadWeather]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const name = cityInput.trim();
    if (!name) return;
    setSearchError(null);
    try {
      const loc = await searchCity(name);
      setLocation(loc);
    } catch (e) {
      setSearchError(e.message || "City not found. Try another name.");
    }
  };

  const handleUseLocation = () => {
    setSearchError(null);
    if (!navigator.geolocation) {
      setSearchError("Geolocation is not supported.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const data = await fetchForecast(latitude, longitude);
          setLocation({ name: "Your location", lat: latitude, lon: longitude });
          setCurrent({
            temperature: data?.current?.temperature_2m,
            humidity: data?.current?.relative_humidity_2m,
            windSpeed: data?.current?.wind_speed_10m,
            time: data?.current_weather?.time,
          });
          const dailyData = data?.daily;
          const days = (dailyData?.time || []).slice(0, 5).map((time, i) => ({
            time,
            max: dailyData?.temperature_2m_max?.[i],
            min: dailyData?.temperature_2m_min?.[i],
            code: dailyData?.weathercode?.[i],
          }));
          setDaily(days);
        } catch (err) {
          setError(err.message || "Unable to load weather.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setSearchError("Location access denied or unavailable.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="page weather-page">
      <h1>Weather</h1>

      <form className="weather-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by city name..."
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          className="weather-search-input"
        />
        <button type="submit" className="portal-btn">Search</button>
        <button type="button" className="portal-btn weather-btn-secondary" onClick={handleUseLocation}>
          Use my location
        </button>
      </form>
      {searchError && <p className="weather-error-msg">{searchError}</p>}

      {loading && (
        <div className="weather-loading">
          <LoadingSpinner />
        </div>
      )}

      {error && !loading && (
        <div className="weather-card weather-card--error">
          <p>{error}</p>
          <button type="button" className="portal-btn" onClick={() => loadWeather(location.lat, location.lon)}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && current && (
        <>
          <div className="weather-current-card">
            <h2 className="weather-location">{location.name}</h2>
            <div className="weather-current-main">
              <span className="weather-current-temp">{Math.round(current.temperature)}°C</span>
              <p className="weather-current-time">Updated {current.time ? new Date(current.time).toLocaleTimeString() : "—"}</p>
            </div>
            <div className="weather-current-details">
              <div className="weather-detail">
                <span className="weather-detail-label">Humidity</span>
                <span className="weather-detail-value">{current.humidity ?? "—"}%</span>
              </div>
              <div className="weather-detail">
                <span className="weather-detail-label">Wind speed</span>
                <span className="weather-detail-value">{current.windSpeed ?? "—"} km/h</span>
              </div>
            </div>
          </div>

          <h3 className="weather-forecast-title">5-day forecast</h3>
          <div className="weather-forecast-grid">
            {daily.map((day) => (
              <div key={day.time} className="weather-forecast-card">
                <div className="weather-forecast-icon" title={weatherCodeToLabel(day.code)}>
                  {weatherCodeToIcon(day.code)}
                </div>
                <div className="weather-forecast-date">{formatDate(day.time)}</div>
                <div className="weather-forecast-temps">
                  <span>{Math.round(day.max ?? 0)}°</span>
                  <span className="weather-forecast-min"> / {Math.round(day.min ?? 0)}°</span>
                </div>
                <div className="weather-forecast-label">{weatherCodeToLabel(day.code)}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherPage;
