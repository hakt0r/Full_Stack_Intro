
<template>
  <ApolloQuery :query="gql => gql`query GetHelloWorld { helloWorld }`">
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">
        Loading...
      </div>
      <div v-else-if="error">
        Error: {{ error }}
      </div>
      <div v-else>
        {{ data.helloWorld }}
      </div>
    </template>
  </ApolloQuery>
</template>

<script> export default { name: 'HelloWorld2' } </script>
