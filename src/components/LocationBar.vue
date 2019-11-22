<template>
  <section
    class="location"
    :class="{ 'day': isDay, 'night': !isDay }"
  >
    <div class="place">
      <v-btn
        text
        fab
        outlined
        :color="btnColor"
        v-on:click="$emit('searchOn')"
        style="height: 48px; width: 48px; border: 2px solid;
        margin-right: 8px; background-color: rgba(0, 0, 0, 0);"
        :class="{ 'day': isDay, 'night': !isDay }"
      >
        <i class="material-icons">search</i>
      </v-btn>
      <span>
        <div class="city">
          {{ (current) ? current.city : 'Click to Search' }}
          <span class="country">
            {{ current ? current.country : '' }}
          </span>
        </div>
      </span>
    </div>
    <div class="time">
      <span>{{ date }}</span>
    </div>
  </section>
</template>

<script>
import dateHelp from './helpers/dateStr';

export default {
  name: 'LocationBar',
  props: ['searching', 'current', 'future', 'isDay'],
  computed: {
    date() {
      if (!this.current || !this.future) return '';
      const { mons, date2st, showHrMin } = dateHelp;
      const utc = new Date(this.current.time);
      const adjTime = new Date(utc.getTime() + (this.future.timezone * 1000));
      const month = mons[adjTime.getUTCMonth()];
      const date = date2st(adjTime.getUTCDate());
      const timeStr = showHrMin(adjTime);
      return `${month} ${date}, ${timeStr}`;
    },
    btnColor() {
      return (this.isDay) ? '#373832' : '#dbd5d2';
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../sass/mixins';

  .location {
    position: relative;
    z-index: 1;
    height: 100%;
    padding-top: 104px;
    margin: 0 auto;
    font-size: 28px;
    line-height: 44px;
    background-color: rgba(0, 0, 0, 0);
    border-bottom: 4px solid;
    @include medium() {
      padding-top: 44px;
    }
    .place {
      float: left;
      height: 44px;
      span {
        display: inline-block;
        position: relative;
        overflow: visible;
        @include medium() { margin-left: 8px; }
      }
      .city {
        display: block;
        position: absolute;
        width: 208px;
        left: 4px;
        bottom: -4px;
        line-height: 28px;
        @include medium() {
          width: 480px;
        }
      }
      .country {
        display: none;
        @include medium() { display: inline-block; }
      }
    }
    .time {
      position: absolute;
      right: 0;
      bottom: 4px;
      width: 88px;
      font-size: 20px;
      line-height: 24px;
      text-align: right;
      @include medium() {
        bottom: 12px;
        width: 176px;
        margin-top: 4px;
        font-size: 28px;
        line-height: 44px;
      }
    }
  }
</style>
