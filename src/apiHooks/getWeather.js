import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const serverUrl = process.env.WEATHERAPI || 'http://localhost:3000/api/weather';

const getWeather = async (location) => {
  if (!location) return { error: 'no search location' };
  const {
    zip, city, lat, lon,
  } = location;
  let fetchUrl = `${serverUrl}?`;
  if (zip) {
    fetchUrl += `zip=${zip}`;
  } else if (city) {
    fetchUrl += `city=${city}`;
  } else if (lon && lat) {
    fetchUrl += `lon=${lon}&lat=${lat}`;
  } else {
    return { error: 'no known location' };
  }
  const response = await fetch(fetchUrl, { mode: 'cors' });
  return response.json();
};

export default getWeather;
