
import Vue          from 'vue';
import VueApollo    from 'vue-apollo';
import ApolloClient from 'apollo-boost';

import App          from './App.vue';

Vue.use(VueApollo);
Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4001/graphql'
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
