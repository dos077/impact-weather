<template>
  <v-app>
    <header
      class="header body"
      :class="{ 'day': isDay, 'night': !isDay }"
    >
      <v-slide-y-transition>
        <search-bar
          v-if="!current || searching"
          :serious="serious"
          :metric="metric"
          :isDay="!isDay"
          v-on:toggleSerious="toggleSerious"
          v-on:toggleMetric="toggleMetric"
          v-on:searchQuery="weather"
        ></search-bar>
      </v-slide-y-transition>
      <location-bar
        v-on:searchOn="searching = true"
        :searching="searching"
        :current="current"
        :future="future"
        :isDay="isDay"
      ></location-bar>
      <div
        class="background"
        :style="gradient"
      >
      </div>
    </header>
    <v-content
      class="body"
      :class="{ 'day': isDay, 'night': !isDay }"
      style="padding-bottom: 24px;"
    >
      <v-fade-transition>
        <div
          v-if="!current || searching"
          @click="searching = false"
          class="searchBlock"
        ></div>
      </v-fade-transition>
      <current-forecast
        :loading="loading"
        :weather="current"
        :metric="metric"
        :serious="serious"
        :gif="gif"
        :isDay="isDay"
      >
      </current-forecast>
      <future-forecast
        v-if="future"
        :loading="loading"
        :weather="future"
        :metric="metric"
        :serious="serious"
        :isDay="isDay"
      ></future-forecast>
    </v-content>
  </v-app>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import LocationBar from './components/LocationBar.vue';
import CurrentForecast from './components/Current.vue';
import FutureForecast from './components/Future.vue';
import getWeather from './apiHooks/getWeather';
import gifFind from './apiHooks/gifFind';
import localPrefs from './helper/localPrefs';

const prefs = localPrefs();

export default {
  name: 'App',
  components: {
    SearchBar,
    LocationBar,
    CurrentForecast,
    FutureForecast,
  },
  data: () => ({
    searching: true,
    serious: false,
    metric: false,
    current: null,
    future: null,
    loading: false,
    error: [],
    gif: null,
  }),
  computed: {
    isDay() {
      if (!this.current) return true;
      const hour = this.showHr(this.current.time);
      return (hour >= 6 && hour < 19);
    },
    gradient() {
      if (!this.current) return '';
      const { temp } = this.current;
      let color = '#00a1e0';
      if (temp > 5) color = '#00afab';
      if (temp > 15) color = '#72a951';
      if (temp >= 25) color = '#f28b00';
      if (temp >= 35) color = '#ed1c24';
      const hstyle = this.serious ? '' : 'height: 512px;';
      const baseSt = 'background-image: linear-gradient(to bottom, ';
      return `${hstyle}${baseSt}${color}, rgba(0, 0, 0, 0))`;
    },
  },
  methods: {
    async weather(location) {
      this.loading = true;
      this.error = [];
      try {
        const forecasts = await getWeather(location);
        this.current = forecasts.current;
        this.future = forecasts.forecast;
        prefs.save({ location });
      } catch (err) {
        this.error.push(err.message);
      }
      this.findGif();
      this.loading = false;
      this.searching = false;
      return false;
    },
    async findGif() {
      try {
        this.gif = await gifFind(`${this.current.name}`);
      } catch (err) {
        this.error.push(err.message);
      }
      return false;
    },
    showHr(data) {
      const utc = new Date(data);
      const adjTime = new Date(utc.getTime() + (this.future.timezone * 1000));
      return adjTime.getUTCHours();
    },
    toggleMetric() {
      this.metric = !this.metric;
      prefs.save({ metric: this.metric });
    },
    toggleSerious() {
      this.serious = !this.serious;
      prefs.save({ serious: this.serious });
    },
  },
  mounted() {
    const presets = prefs.load();
    this.serious = presets.serious;
    this.metric = presets.metric;
    if (presets.location !== null) this.weather(presets.location);
  },
};
</script>

<style lang="scss">
  @import './sass/mixins';
  @import url('https://fonts.googleapis.com/css?family=Anton&display=swap');

  .header {
    position: relative;
    width: 100%;
    height: 168px;
    z-index: 0;
    overflow: visible;
    @include breakPoint(720) {
      height: 108px;
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
    }
  }
  .body {
    font-size: 20px;
    font-family: Impact, 'Anton', sans-serif;
  }
  .day {
    background-color: #dbd6d2;
    color: #373832;
    border-color: #373832;
  }
  .night {
    background-color: #373832;
    color: #dbd6d2;
    border-color: #dbd6d2;
  }
  section {
    width: 344px;
    margin: 0 auto;
    @include breakPoint(720) {
      width: 680px;
    }
  }
  .searchBlock {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
</style>
