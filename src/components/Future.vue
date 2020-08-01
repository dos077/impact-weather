<template>
  <section>
    <v-slide-y-transition
      v-for="(period, index) in periods"
      :key="period.time">
      <period
        :period="period"
        :last="index === 0 ? undefined : periods[index - 1]"
        :timezone="weather.timezone"
        :serious="serious"
        :metric="metric"
        :isDay="isDay"
      />
    </v-slide-y-transition>
  </section>
</template>

<script>
import helperMethods from './helpers/methods';
import Period from './Period.vue';

export default {
  name: 'FutureForecast',
  props: ['loading', 'weather', 'metric', 'serious', 'isDay'],
  components: { Period },
  computed: {
    periods() {
      if (!this.weather) return [];
      if (this.serious) return this.weather.periods.slice(0, 24);
      const arr = [];
      for (let i = 0; i < 16; i += 2) {
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
