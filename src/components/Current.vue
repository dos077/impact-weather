<template>
  <section
    v-if="loading || weather"
    class="current"
    :class="{ 'day': isDay, 'night': !isDay }"
  >
    <v-slide-y-transition>
      <div
        v-if="!!weather"
        class="stats">
        <div class="temps">
          <span class="now">
            {{ showTemp(weather.temp, metric) }}<sup>{{ (metric) ? 'C' : 'F' }}</sup>
          </span>
          <div class="hi-lo">
            <span class="high">High {{ showTemp(weather.high, metric) }}</span>
            <span class="low">Low {{ showTemp(weather.low, metric) }}</span>
          </div>
        </div>
        <div class="condition">
          <span class="name">{{ showCondition(weather.desc) }}</span>
          <span
            v-if="isRain"
            class="rain">
            {{ showVol(numRain.vol, metric) }} of {{ numRain.name }}
          </span>
        </div>
        <div style="height: 0; clear: both"></div>
        <span v-if="serious" class="hum">
          {{ weather.hum }}% <span class="smaller">humidity</span>
        </span>
        <span v-if="serious" class="wind">
          <span class="dir smaller">{{ showDir(weather.windDeg) }}</span>
          {{ showWind(weather.wind, metric) }}
        </span>
      </div>
    </v-slide-y-transition>
    <v-slide-y-transition>
      <v-img
        v-if="weather && !serious"
        width=100%
        height=340
        :src="imgSrc"
        :placeholder="loadingGif.url"
        style="border: 4px solid"
        :class="{ 'day': isDay, 'night': !isDay }"
      >
      </v-img>
    </v-slide-y-transition>
    <v-slide-y-transition>
      <div
        v-if="weather && !serious"
        class="img-caption"
      >
        Image from Giphy
      </div>
    </v-slide-y-transition>
  </section>
</template>

<script>
import loadingGif from './loadingGif.json';
import helperMethods from './helpers/methods';

export default {
  name: 'CurrentForecast',
  props: ['loading', 'weather', 'metric', 'gif', 'isDay', 'serious'],
  data() {
    return {
      loadingGif,
    };
  },
  computed: {
    imgSrc() {
      if (this.loading || !this.gif) {
        return this.loadingGif.url;
      }
      return this.gif.url;
    },
    isRain() {
      if (!this.weather) return false;
      if (this.weather.rain > 0 || this.weather.snow > 0) {
        return true;
      }
      return false;
    },
    numRain() {
      if (!this.isRain) return { name: 'None', vol: 0 };
      const name = (this.weather.rain > 0) ? 'Rain' : 'Snow';
      const rawData = (name === 'Rain') ? this.weather.rain : this.weather.snow;
      return { name, vol: Math.round(rawData * 10) / 10 };
    },
  },
  methods: helperMethods,
};
</script>

<style lang="scss" scoped>
  @import '../sass/mixins';

  .current {
    margin: 16px auto 24px;
    font-size: 28px;
    line-height: 28px;
    background-color: rgba(0, 0, 0, 0);
    .wind {
      float: right;
      width: auto;
      @include medium() {
        text-align: right;
      }
    }
    .hum {
      display: inline-block;
      width: auto;
      text-align: left;
      @include medium() {
        width: 50%;
        padding-left: 178px;
      }
    }
    .smaller {
      font-size: 20px;
    }
  }
  .stats {
    width: 100%;
    margin-bottom: 16px;
  }
  .temps {
    float: left;
    width: 100%;
    @include medium() { width: 264px; }
    .now {
      display: inline-block;
      width: 156px;
      font-size: 72px;
      line-height: 72px;
      sup {
        font-size: 28px;
        top: -34px;
        margin-left: 4px;
      }
    }
    .hi-lo {
      float: right;
      text-align: right;
      @include medium() {
        text-align: left;
      }
      span {
        display: block;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    }
    .high {
      height: 28px;
      color: #ed1c24;
    }
    .low {
      height: 28px;
      color: #00a1e0;
    }
  }
  .condition {
    float: left;
    text-align: left;
    @include medium() {
      float: right;
      text-align: right;
    }
    span {
      display: block;
    }
    .name {
      font-size: 36px;
      line-height: 36px;
    }
  }
  .img-caption {
    font-size: 12px;
    line-height: 20px;
    font-family: Arial, Helvetica, sans-serif;
    text-align: right;
  }
</style>
