
<template>
  <div class="hello">
      {{ helloWorld }}
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'HelloWorld',
  apollo: { helloWorld: gql `query GetHelloWorld { helloWorld }` }
}
</script>
