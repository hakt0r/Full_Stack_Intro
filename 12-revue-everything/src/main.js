import Vue            from 'vue'
import App            from './App.vue'
import vuetify        from './plugins/vuetify';
import apolloProvider from './plugins/apollo';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
