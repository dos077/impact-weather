import getWeather from '@/apiHooks/getWeather';

describe('getWeather.js', () => {
  it('rejects search with no location', async () => {
    const weather = await getWeather();
    expect(weather.error).toBe('no search location');
    expect(!weather.current).toBeTruthy();
  });
  it('gets the current weather condition and forecast', async () => {
    const weather = await getWeather({ zip: 11223 });
    expect(!weather.error).toBeTruthy();
    expect(weather.current.city).toBe('Brooklyn');
    expect(weather.current.country).toBe('US');
    expect(weather.forecast.city).toBe('Brooklyn');
    expect(weather.forecast.timezone).toBe(-14400);
  });
});
