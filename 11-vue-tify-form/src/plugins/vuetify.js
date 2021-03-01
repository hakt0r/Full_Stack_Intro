import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const dark = localStorage.getItem('dark-theme') ? true : false;

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    dark,
    themes: {
      light: {
        primary: "#F97C01"
      },
      dark: {
        primary: "#F97C01"
      }
    }
  },
});
