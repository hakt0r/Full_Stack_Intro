<template>
  <v-app>
    <v-row>
      <AppBar/>
    </v-row>
    <v-row>
      <v-col>
        <Navigation/>
      </v-col>
      <v-col>
        <v-main>
          <HelloWorld/>
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Navigation from './components/Navigation';
import AppBar     from './components/AppBar';

export default {
  name: 'App',

  components: {
    HelloWorld,
    Navigation,
    AppBar
  },
};
</script>

<style scoped>
  img {
    max-width: 100%;
    max-height: 100%;
  }
</style>