<template>
  <div>
    <ApolloMutation
      :mutation="gql => gql`
        mutation ( $name:String!, $password:String! ) {
          loginUser( name:$name, password:$password ){ id }
        }
      `"
      :variables="{ name, password }"
      @done="onDone"
    >
      <template v-slot="{ mutate, loading, error }">
        <div v-if="! loading && ! error">
          <input v-model="name" />
          <input v-model="password" type="password"/>
          <button v-on:click="mutate">Login</button>
        </div>
        <div v-else-if="loading">
          Logging in...
        </div>
        <Error v-else v-bind:error="error">
          {{ error }}
        </Error>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import Error from "./Error";
export default {
  name: 'Login',
  components:{
    Error
  },
  data: ()=> ({
    name: "",
    password: ""
  }),
  methods:{
    onDone(){
      console.log('done');
    }
  }
}
</script>