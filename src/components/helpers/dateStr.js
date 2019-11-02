const mons = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dev'.split(' ');

const date2st = (date) => {
  const single = date % 10;
  let subffix;
  if (single === 1) subffix = 'st';
  else if (single === 2) subffix = 'nd';
  else if (single === 3) subffix = 'rd';
  else subffix = 'th';
  return `${date}${subffix}`;
};

const showHrMin = (time) => {
  const hour = time.getUTCHours();
  const min = time.getUTCMinutes();
  const minStr = (min > 9) ? min : `0${min}`;
  return `${hour}:${minStr}`;
};

export default { mons, date2st, showHrMin };
