<template>
  <div id="app">
    <HelloWorld/>
    <HelloWorld2/>
    <HelloWorld3/>
  </div>
</template>

<script>

import HelloWorld  from './components/HelloWorld.vue'
import HelloWorld2 from './components/HelloWorld2.vue'
import HelloWorld3 from './components/HelloWorld2.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    HelloWorld2,
    HelloWorld3
  }
}
</script>
