
<template>
  <div>
    <button @click="switchLanguage('de')">de</button>
    <button @click="switchLanguage('en')">en</button>
  </div>
</template>

<script>
export default {
  created(){
    const fromLocalStorage = localStorage.getItem('lang');
    const [ ,fromURL     ] = window.location.pathname.split('/');
    const [  fromBrowser ] = navigator.language.split('-');
    this.switchLanguage( fromLocalStorage || fromURL || fromBrowser || 'en');
  },
  methods:{
    switchLanguage(lang){
      this.$i18n.locale = lang;
      localStorage.setItem('lang',lang);
    }
  }
}
</script>