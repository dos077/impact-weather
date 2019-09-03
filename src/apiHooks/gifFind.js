import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const serverUrl = process.env.GIFAPI || 'http://localhost:3000/api/gif';

const gifFind = async (term) => {
  if (!term) return { error: 'no search term' };
  const fetchUrl = `${serverUrl}?term=${term}`;
  const response = await fetch(fetchUrl, { mode: 'cors' });
  const gif = await response.json();
  return gif;
};

export default gifFind;
