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

export default { mons, date2st };
