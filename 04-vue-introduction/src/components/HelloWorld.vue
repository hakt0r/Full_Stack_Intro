<template>
  {{ myProp }}
  <div
    class="hello"
    v-bind:title="msg"
    v-on:click="reset"
  >
    <h1 v-bind:title="auth.name">{{ auth.name }}</h1>
  </div>
  <h2 v-if="msg > 5">
    OK OK OK
  </h2>
  <span v-for="name in names" v-bind:key="name">
    {{ name }}
  </span>
</template>

<script>
export default {

  name: 'HelloWorld',

  props: {
    myProp: String
  },

  data: () => ({
    bool: true,
    msg: "Oh!",
    names: ['anx','lea'],
    auth: { name: 'anx', age: 37 }
  }),

  mounted(){
    this.reset();
    setInterval( () => {
      this.msg += 1
      this.names.push(this.msg)
    }, 1000 );
  },

  methods:{
    reset(){
      this.msg = 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  user-select: none;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
