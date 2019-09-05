<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline"
        ><router-link to="/">Smash Training</router-link></v-toolbar-title
      >
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>
