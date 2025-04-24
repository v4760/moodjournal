import axios from 'axios';

export async function fetchWeather(lat, lon) {
  const key = process.env.WEATHER_API_KEY;
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lon}`;

  try {
    const res = await axios.get(url);
    const data = res.data;

    return `${data.current.condition.text}, ${data.current.temp_c}°C`;
  } catch (err) {
    console.error('Weather fetch failed:', err.response?.data || err.message);
    throw new Error('Could not fetch weather info');
  }
}
