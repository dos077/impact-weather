<template>
  <div
    class="period"
    :class="dayNight(period.time, timezone)"
  >
    <div
      v-if="isDay && dayBreak"
      class="new-day"
    >
      <span>{{ dayBreak }}</span>
    </div>
    <span class="name">
      {{ showTimePeriod(period.time, timezone, serious) }}
    </span>
    <div class="hi-lo">
      <span class="hot">
        {{ showTemp(period.high, metric) }}
      </span>
      <span class="cold">
        {{ showTemp(period.low, metric) }}
      </span>
    </div>
    <span class="condition">
      {{ showCondition(period.desc) }}
    </span>
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
    <div
      v-if="!isDay && dayBreak"
      class="new-day"
    >
      <span>{{ dayBreak }}</span>
    </div>
  </div>
</template>

<script>
import helperMethods from './helpers/methods';

export default {
  name: 'Period',
  props: {
    period: Object,
    last: Object,
    serious: Boolean,
    timezone: Number,
    isDay: Boolean,
    metric: Boolean,
  },
  computed: {
    dayBreak() {
      return this.showDayBreak(this.period.time, this.timezone, true, this.isDay);
    },
  },
  methods: {
    ...helperMethods,
  },
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
      width: 1.2em;
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
  .new-day {
    position: relative;
    padding-top: 20px;
    left: -20px;
    clear: both;
    font-size: 22px;
    span {
      display: inline-block;
      padding: .2rem .6rem 0;
    }
  }
  &.night{
    .new-day {
      top: 22px;
    }
  }
}
</style>
