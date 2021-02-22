<template>
  <div>
    {{ error }}
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    error: String
  }
}
</script>

<style scoped>
  div {
    color: red;
    border: solid red 1px;
  }
</style>