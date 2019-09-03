import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#373832',
        secondary: '#4e5859',
        accent: '#9daaa9',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: '#dbd6d2',
        secondary: '#9daaa9',
        accent: '#9daaa9',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
