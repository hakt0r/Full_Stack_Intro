<template>
  <v-app-bar app>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-avatar :tile="true">
        <img src="../assets/bee.svg" />
      </v-avatar>
      <v-toolbar-title class="apptitle">Bee Club</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar'
}
</script>

<style>
  img {
    mask-image: url(../assets/bee-mask.svg);
    mask-size: 100% 100%;
    mask-clip: border-box;
    background: var(--v-primary-base);
  }
  .apptitle {
    margin-left: 12px;
    font-size: 2rem;
  }
</style>