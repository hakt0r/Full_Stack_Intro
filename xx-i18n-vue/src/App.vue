
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <input v-model="name"/>
    <p v-html="$t('Hello',[name,'nice'])"/>
    {{ $tc( 'plurals.bottle', bottleCount, {bottleCount,name} ) }}
    <LanguageSwitcher/>
  </div>
</template>

<script>
import LanguageSwitcher from './components/LanguageSwitcher'
export default {
  name: 'App',
  components: {
    LanguageSwitcher
  },
  data: ()=> ({
    name: '<i>alice</i>',
    bottleCount: 0
  })
}
</script>

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
