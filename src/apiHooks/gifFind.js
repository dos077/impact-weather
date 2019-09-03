import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const serverUrl = 'https://my-api-server.dos077.now.sh/api/gif';

const gifFind = async (term) => {
  if (!term) return { error: 'no search term' };
  const fetchUrl = `${serverUrl}?term=${term}`;
  const response = await fetch(fetchUrl, { mode: 'cors' });
  const gif = await response.json();
  return gif;
};

export default gifFind;
