function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

const getCrd = async () => {
  if (navigator.geolocation) {
    const { coords } = await getCurrentPosition();
    const lat = Math.round(coords.latitude * 100) / 100;
    const lon = Math.round(coords.longitude * 100) / 100;
    return { lat, lon };
  }
  return false;
};

export default getCrd;
