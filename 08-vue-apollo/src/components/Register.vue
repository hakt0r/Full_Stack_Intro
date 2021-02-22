
<template>
  <div v-if="! error">
    <input v-model="name" />
    <input v-model="password" type="password"/>
    <button v-on:click="doRegister">Register</button>
  </div>
  <Error v-else v-bind:error="error"/>
</template>

<script>
import Error from './Error';
import gql from 'graphql-tag';

export default {
  name: "Register",

components: { Error },

  data: ()=> ({
    name:"",
    password:"",
    error:false
  }),

  methods:{
    async doRegister(){
      try {
        const response = await this.$apollo.mutate({
          mutation:  gql`
            mutation ( $name1:String!, $pass:String! ) {
              createUser( name:$name1, password:$pass ){ id }
            }`,
          variables: { name1:this.name, pass:this.password }
        });
        console.log(response.data.createUser.id);
      } catch ( error ){
        this.error = error;
      }
    }
  }
}
</script>