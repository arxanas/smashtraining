<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline"
        ><router-link to="/">Smash Training</router-link></v-toolbar-title
      >
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row align="center" justify="center">
          <v-col :cols="12" :sm="8" :md="8">
            <keep-alive include="training">
              <router-view :key="$route.fullPath" />
            </keep-alive>
          </v-col>
        </v-row>
      </v-container>
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
import Component from "vue-class-component";

@Component({ name: "App" })
export default class extends Vue {}
</script>
