<template>
  <v-card>
    <v-card-title>Stats</v-card-title>
    <v-card-text
      >Stats aren't currently available. Check back later!</v-card-text
    >
    <v-card-actions>
      <v-spacer />
      <v-btn class="error" @click="deleteAllData">Delete all data</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { commitSnackbarText } from "../store";

@Component
export default class extends Vue {
  public deleteAllData(): void {
    let confirmation = prompt("Type 'delete' to confirm.");
    if (confirmation === null) {
      confirmation = "";
    }
    confirmation = confirmation.toLowerCase().trim();
    if (confirmation === "delete") {
      commitSnackbarText(this.$store, "Deleted all data.");
      localStorage.clear();
      window.location.assign("/");
    } else {
      commitSnackbarText(
        this.$store,
        "Confirmation failed — no data was deleted.",
      );
    }
  }
}
</script>
