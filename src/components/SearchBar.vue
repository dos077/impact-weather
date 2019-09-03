<template>
  <div
    class="search-bar"
    :class="{ 'day': isDay, 'night': !isDay }"
  >
    <section class="search-actions" >
      <div
        class="search-text"
        :class="{ 'day': isDay, 'night': !isDay }"
      >
        <input
          v-model="query"
          @keydown.enter="searchSubmit"
          class="search-input"
          placeholder="City or U.S. Zip"
          v-on:focus="typing = true"
          v-on:blur="typing = false"
          required>
        <v-slide-x-transition>
          <span
            v-if="typing"
            class="helper-msg"
          >
            enter city and country, or 5 digit zipcode
          </span>
        </v-slide-x-transition>
      </div>
      <div
        class="btn-wrap"
        :class="{ 'day': isDay, 'night': !isDay }"
      >
        <v-btn
          @click.prevent="searchSubmit"
          :color="btnColor"
          style="height: 48px; width:48px" elevation=3 fab>
          <i class="material-icons">
            search
          </i>
        </v-btn>
      </div>
      <div
        class="btn-wrap"
        :class="{ 'day': isDay, 'night': !isDay }"
      >
        <v-btn
          @click="searchGps"
          :color="btnColor"
          style="height: 48px; width:48px" elevation=3 fab>
          <i
            class="material-icons"
          >my_location</i>
        </v-btn>
      </div>
      <div
        class="option"
        :class="{ 'day': isDay, 'night': !isDay }"
      >
        <v-btn
          text
          top
          class="text-none toggle"
          height=56
          width=40
          style="font-size: 28px; border-radius: 0;"
          @click="$emit('toggleMetric')"
        >
          <span :class="{ off: !metric, on: metric }">C</span>
          <span :class="{ off: metric, on: !metric }">F</span>
        </v-btn>
        <v-btn
          text
          top
          class="text-none"
          height=56
          width=176
          style="font-size: 28px; float: right; letter-spacing: 0px;  border-radius: 0;"
          @click="$emit('toggleSerious')"
        >
          <span :class="{ on: serious, off: !serious}">Serious Mode</span>
        </v-btn>
      </div>
    </section>
  </div>
</template>

<script>
import getCrd from '../helper/getCrd';

export default {
  name: 'search-bar',
  props: ['serious', 'metric', 'isDay'],
  data() {
    return {
      typing: false,
      query: '',
      error: null,
      loading: false,
    };
  },
  computed: {
    btnColor() {
      return (this.isDay) ? '#373832' : '#dbd6d2';
    },
  },
  methods: {
    searchSubmit() {
      if (this.loading || !this.query || this.query.length === 0) {
        return false;
      }
      this.loading = true;
      const zipRx = /\d{5}/g;
      const location = {};
      if (this.query.match(zipRx)) {
        location.zip = this.query;
      } else {
        location.city = this.query;
      }
      this.$emit('searchQuery', location);
      this.loading = false;
      return false;
    },
    async searchGps() {
      if (this.loading) return false;
      this.loading = true;
      try {
        const location = await getCrd();
        this.$emit('searchQuery', location);
        this.loading = false;
        return false;
      } catch (err) {
        this.error = err;
        this.loading = false;
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../sass/mixins';

  .search-bar {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    padding-top: 24px;
    font-size: 20px;
    font-family: Impact, Charcoal, sans-serif;
  }
  .search-text {
    position: relative;
    float: left;
    width: 280px;
    height: 76px;
    overflow:hidden;
    .search-input {
      width: 280px;
      height: 56px;
      padding: 12px;
      margin: 0;
      font-size: 20px;
      border: solid 2px;
    }
    .helper-msg {
      position: relative;
      display: inline-block;
      top: -8px;
      height: 0px;
      overflow: visible;
      margin-left: 12px;
      margin-bottom: -8px;
      line-height: 12px;
      font-size: 12px;
      font-family: Arial, Helvetica, sans-serif;
    }
    &.day {
      .search-input {
        border-color: #4e5859;
        &::placeholder { color: #4e5859; }
        &:focus { border-color: #373832; }
      }
      .helper-msg { color: #4e5859; }
    }
    &.night {
      .search-input {
        border-color: #9daaa9;
        &::placeholder { color: #9daaa9; }
        &:focus { border-color: #dbd6d2; }
      }
      .helper-msg { color: #9daaa9; }
    }
  }
  .btn-wrap {
    float: right;
    width: 64px;
    padding-top: 4px;
    padding-bottom: 24px;
    padding-left: 16px;
    @include medium() {
      float: left;
    }
    i { font-size: 28px; }
    &.day {
      background-color: rgba(0, 0, 0, 0);
      i { color: #dbd6d2; }
    }
    &.night {
      background-color: rgba(0,0,0,0);
      i { color: #373832; }
    }
  }
  .option {
    float: left;
    width: 280px;
    height: 56px;
    font-size: 28px;
    line-height: 56px;
    @include medium() {
      float: right;
      width: 248px;
    }
    span.serious {
      float: right;
      cursor: pointer;
    }
    .toggle {
      letter-spacing: 0.2rem;
    }
    &.day {
      background-color: rgba(0,0,0,0);
      span.on { color: #373832; }
      span.off { color: #9daaa9; }
    }
    &.night {
      background-color: rgba(0,0,0,0);
      span.on { color: #dbd6d2; }
      span.off { color: #4e5859; }
    }
  }
</style>
