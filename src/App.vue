<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="training">
          <v-list-item-action>
            <v-icon>mdi-dumbbell</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Training</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="gsp-tracker">
          <v-list-item-action>
            <v-icon>mdi-trending-up</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>GSP Tracker</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="stats">
          <v-list-item-action>
            <v-icon>mdi-poll-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Stats</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="about">
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="headline">
        <router-link class="grey--text text--lighten-5" to="/">
          Smash Training
        </router-link>
      </v-toolbar-title>
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
import { dispatchRestoreState, dispatchSaveState } from "./store";

@Component({ name: "App" })
export default class extends Vue {
  public data() {
    return {
      drawer: false,
    };
  }

  public async mounted() {
    await dispatchRestoreState(this.$store);
  }
}
</script>
