<template>
  <v-container fluid class="body-2 py-0">
    <v-row align="center" justify="center">
      <v-col :cols="12" :md="6" class="text-center text-md-left pb-1 py-md-2">
        <slot />
      </v-col>
      <v-col :cols="12" :md="6" class="text-center text-md-right pt-1 py-md-2">
        <v-btn text small color="primary" :href="issueUrl">
          <v-icon left>mdi-github</v-icon>
          Report an issue
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { REPO_GITHUB_ISSUES_URL } from "@/constants";
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class extends Vue {
  get issueUrl(): string {
    const url = new URL(REPO_GITHUB_ISSUES_URL);
    url.searchParams.set(
      "body",
      `Page: ${window.location.toString()}

<!-- fill in your issue body here -->`,
    );
    return url.toString();
  }
}
</script>
