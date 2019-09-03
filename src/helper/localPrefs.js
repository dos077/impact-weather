const localPrefs = () => {
  const prefs = { metric: false, serious: false, location: null };
  const save = ({ metric, serious, location }) => {
    if (metric || metric === false) prefs.metric = metric;
    if (serious || serious === false) prefs.serious = serious;
    if (location) prefs.location = location;
    localStorage.prefs = JSON.stringify(prefs);
  };

  const load = () => {
    const { metric, serious, location } = JSON.parse(localStorage.prefs);
    if (metric) prefs.metric = metric;
    if (serious) prefs.serious = serious;
    if (location) prefs.location = location;
    return prefs;
  };

  const metric = () => prefs.metric;
  const serious = () => prefs.serious;
  const location = () => prefs.location;

  return {
    save,
    load,
    metric,
    serious,
    location,
  };
};

export default localPrefs;
