<template>
  <section>
    <v-slide-y-transition
      v-for="period in periods"
      :key="period.time">
      <div
        class="period"
        :class="dayNight(period.time, weather.timezone)"
      >
        <span class="name">
          {{ showTimePeriod(period.time, weather.timezone, serious) }}
        </span>
        <div class="hi-lo">
          <span class="hot">{{ showTemp(period.high, metric) }}</span>
          <span class="cold">{{ showTemp(period.low, metric) }}</span>
        </div>
        <span class="condition">{{ showCondition(period.desc) }}</span>
        <span v-if="period.rain > 0 || period.snow > 0" class="rain smaller">
          {{ showRain(period.rain, period.snow, metric) }}
        </span>
        <div style="clear:both;"></div>
        <span class="hum" v-if="serious">
          {{ period.hum }}%
        </span>
        <span v-if="period.wind && serious" class="wind">
          <span class="dir smaller">{{ showDir(period.windDeg) }}</span>
          {{ showWind(period.wind, metric) }}
        </span>
      </div>
    </v-slide-y-transition>
  </section>
</template>

<script>
import helperMethods from './helpers/methods';

export default {
  name: 'FutureForecast',
  props: ['loading', 'weather', 'metric', 'serious'],
  computed: {
    periods() {
      if (!this.weather) return [];
      if (this.serious) return this.weather.periods.slice(0, 15);
      const arr = [];
      for (let i = 0; i < 10; i += 2) {
        const p1 = this.weather.periods[i];
        const p2 = this.weather.periods[i + 1];
        const period = {
          time: p1.time,
          name: p1.name,
          desc: p1.desc,
          high: (p1.high > p2.high) ? p1.high : p2.high,
          low: (p1.low < p2.low) ? p1.low : p2.low,
          hum: (p1.hum + p2.hum) / 2,
          rain: (p1.rain ? p1.rain : 0) + (p2.rain ? p2.rain : 0),
          snow: (p1.snow ? p1.snow : 0) + (p2.snow ? p2.snow : 0),
          wind: (p1.wind > p2.wind) ? p1.wind : p2.wind,
          windDeg: (p1.wind > p2.wind) ? p1.windDeg : p2.windDeg,
        };
        arr.push(period);
      }
      return arr;
    },
  },
  methods: helperMethods,
};
</script>

<style lang="scss" scoped>
  @import '../sass/mixins';

  .period {
    width: 100%;
    min-height: 68px;
    padding: 16px;
    margin-bottom: 8px;
    font-size: 28px;
    line-height: 36px;
    span {
      display: inline-block;
    }
    .name {
      width: 148px;
      float: left;
    }
    .hi-lo {
      float: right;
      width: 128px;
      text-align: right;
      @include medium() {
        float: left;
        text-align: left;
      }
      span {
        margin-left: 8px;
        @include medium() {
          margin-left: 0;
          margin-right: 8px;
        }
      }
      .hot { color: #ed1c24; }
      .cold { color: #00a1e0; }
    }
    .condition {
      display: inline-block;
      @include medium() {
        float: right;
      }
    }
    .rain {
      margin-top: 4px;
      margin: 0 4px;
      @include medium() {
        margin-top: 4px;
        float: right;
      }
    }
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
        padding-left: 148px;
      }
    }
    .smaller {
      font-size: 20px;
    }
  }
</style>
