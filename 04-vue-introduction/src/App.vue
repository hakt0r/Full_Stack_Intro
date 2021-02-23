

<script>

import HelloWorld from './components/HelloWorld.vue'
import      Login from './components/Login.vue'

export default {
  name: 'App',
  components: { HelloWorld, Login }
}

</script>

<template>
  <Login/>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld myProp="theProp"/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
