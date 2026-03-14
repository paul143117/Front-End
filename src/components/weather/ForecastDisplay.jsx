function ForecastDisplay({ forecast }) {
  if (!forecast || !forecast.length) {
    return <p className="weather-forecast-empty">No forecast available.</p>;
  }

  return (
    <ul className="weather-forecast">
      {forecast.map((item) => (
        <li key={item.time} className="weather-forecast-item">
          <span>{item.time}</span>
          <span>{item.temperature}°C</span>
        </li>
      ))}
    </ul>
  );
}

export default ForecastDisplay;

