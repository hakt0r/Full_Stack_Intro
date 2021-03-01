
<template>
  <v-container>
    <v-text-field v-model="name"/>
    <v-text-field v-model="password" type="password"/>
    <v-btn v-bind:loading="loading" v-on:click="register">Register</v-btn>
    <b v-if="result">
      {{ result.data.createUser.name }}
    </b>
    <v-alert v-else-if="error"  color="error">
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script>
  import gql from 'graphql-tag';
  const mutation = gql`
    mutation Register ( $name:String!, $password:String! ) {
    createUser( name:$name, password:$password ){
      name,
      password
    }
  }`;
  export default {
    name: 'HelloWorld',
    data: () => ({
      name: '',
      password: '',
      result: false,
      loading: false,
      error: false
    }),
    methods:{
      async register(){
        try {
          const { name, password } = this;
          this.loading = true;
          this.result = await this.$apollo.mutate({
            mutation, variables: { name, password },
          });
          this.loading = false;
        } catch ( error ){
          this.loading = false;
          this.result = false;
          this.error = error;
        }
      }
    }
  }
</script>

<style scoped>

</style>