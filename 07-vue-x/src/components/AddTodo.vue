<template>
  <div class="input-group d-flex">
    <input
        class="form-control flex-grow-1"
        type="text"
        placeholder="write todo here"
        v-model="text"
    />
    <div class="input-group-append">
        <input
            class="btn btn-primary btn-sm"
            type="button"
            value="Add"
            v-on:click="addTodo"
        />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddTodo',
  data: () => ({
      text: ''
  }),
  methods: {
      addTodo() {
          if ( this.text ) {
              this.$store.commit('addTodo',this.text);
              this.text = '';
          }
      },
  }
}
</script>
