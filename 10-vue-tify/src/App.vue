<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-alert v-if="error" border="top" color="red darken-4" type="warning">
            You had an error, Ma'am!
          </v-alert>
        </v-col>
        <v-spacer/>
        <v-col>
          <v-btn
            color="primary"
            rounded
            elevation="1"
            v-on:click="error = ! error"
          >Toggle Error</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-carousel v-model="model">
      <v-carousel-item
        v-for="(color,i) in colors"
        :key="i"
      >
        <v-sheet
          :color="color"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">
              Slide {{ i + 1 }}
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-color-picker
      dot-size="25"
      mode="rgba"
      v-model="colors[0]"
      swatches-max-height="200"
    ></v-color-picker>
    {{ color }}

    <Calendendar/>
  </v-app>
</template>

<script>
import Calendendar from './components/calendendar.vue';

export default {
  name: 'App',

  components: {
    Calendendar
  },

  data: () => ({
    error: true,
    model: 0,
    color: "#0000FF",
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
  })
};
</script>
