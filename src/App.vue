<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline">Smash Training</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>
