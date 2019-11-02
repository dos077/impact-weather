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
        {{ (current) ? current.city : 'Click to Search' }}
        <span class="country">
          {{ current ? current.country : '' }}
        </span>
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
      const { mons, date2st } = dateHelp;
      const utc = new Date(this.current.time);
      const adjTime = new Date(utc.getTime() + (this.future.timezone * 1000));
      const month = mons[adjTime.getUTCMonth()];
      const date = date2st(adjTime.getUTCDate());
      const hour = adjTime.getUTCHours();
      const min = adjTime.getUTCMinutes();
      return `${month} ${date}, ${hour}:${min}`;
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
        margin-top: 4px;
        @include medium() { margin-left: 8px; }
      }
      .country {
        display: none;
        @include medium() { display: inline-block; }
      }
    }
    .time {
      float: right;
      width: 64px;
      font-size: 20px;
      line-height: 24px;
      text-align: right;
      @include medium() {
        width: 176px;
        margin-top: 4px;
        font-size: 28px;
        line-height: 44px;
      }
    }
  }
</style>
