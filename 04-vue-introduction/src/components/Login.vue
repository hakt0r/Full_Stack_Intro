
<template>
  <div>
    <input v-model="name" />
    <input v-model="pass" type="password" />
    <button v-on:click="login">Login</button>
    {{ name }} : {{ pass }}
  </div>
</template>

<script>
export default {
  data: ()=> ({
    name: 'anx',
    pass: '123'
  }),
  methods:{
    async login(){
      await axios.post('/login',{name:this.name,pass:this.pass})
    }
  }
}
</script>

<style scoped>
  * {
    margin: 0.3rem;
    border: green solid 2px;
    border-radius: 9px;
  }
  input, button {
    padding: 0.3rem;
    color: green;
  }
</style>