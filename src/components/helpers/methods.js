const showTemp = (data, metric) => {
  const temp = (metric) ? data : (data * 9 / 5) + 32;
  return Math.round(temp);
};

const showVol = (data, metric) => {
  const vol = Math.round(data * 10) / 10;
  return (metric) ? `${vol}mm` : `${vol * 4}pt`;
};

const showCondition = (data) => {
  const words = data.split(' ');
  let count = 0;
  const nWs = [];
  for (let i = 0; i < words.length; i += 1) {
    if (count >= 3) break;
    let word = words[i];
    if (word === 'and') {
      nWs.push('&');
    } else if (word === 'with') {
      nWs.push('w');
    } else {
      if (word === 'thunderstorm') word = 't-storm';
      nWs.push(word.charAt(0).toUpperCase() + word.slice(1));
      count += 1;
    }
  }
  return nWs.join(' ');
};

const showHr = (data, offset) => {
  const utc = new Date(data);
  const adjTime = new Date(utc.getTime() + (offset * 1000));
  return adjTime.getUTCHours();
};

const showTimePeriod = (data, offset, serious) => {
  const hour = showHr(data, offset);
  if (hour === 0) return 'Midnight';
  if (hour < 4) return (serious) ? 'Predawn' : 'Midnight';
  const names = 'Dawn Morning Miday Afternoon Evening Night Midnight Midnight'.split(' ');
  let index = Math.floor((hour - 4) / 3);
  if (!serious && index % 2 === 0) {
    index += 1;
  }
  return names[index];
};

const showRain = (rain, snow, metric) => {
  if (rain === 0 && snow === 0) return '';
  const vol = (rain > 0) ? rain : snow;
  const name = (rain > 0) ? 'Rain' : 'Snow';
  return `${showVol(vol, metric)} ${name}`;
};

const showWind = (wind, metric) => {
  const spd = metric ? wind : wind * 0.621371;
  return Math.round(spd) + (metric ? 'km/h' : 'mi/h');
};

const showDir = (windDeg) => {
  const dirs = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest', 'North'];
  return dirs[Math.round(windDeg / 45)];
};

const dayNight = (data, offset) => {
  const hour = showHr(data, offset);
  return (hour >= 4 && hour < 17) ? 'day' : 'night';
};

export default {
  showTemp,
  showWind,
  showVol,
  showCondition,
  showHr,
  showTimePeriod,
  showRain,
  showDir,
  dayNight,
};
