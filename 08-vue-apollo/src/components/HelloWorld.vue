<template>
  <div>
    erm blah?
    <div v-if="helloWorld">
      GraphQL says {{ helloWorld }}
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'HelloWorld',
  apollo: {
    helloWorld: gql`query HiWorld { helloWorld }`
  }
}
</script>