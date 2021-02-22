<template>
  <div id="app">
    <HelloWorld/>
    <Register/>
    <Login/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Register   from './components/Register.vue'
import Login      from './components/Login.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Register,
    Login
  }
}
</script>
