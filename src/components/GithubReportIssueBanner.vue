<template>
  <v-container fluid class="body-2 py-0">
    <v-row align="center" justify="center">
      <v-col :cols="12" :md="6" class="text-center text-md-left pb-1 py-md-2">
        <slot />
      </v-col>
      <v-col :cols="12" :md="6" class="text-center text-md-right pt-1 py-md-2">
        <v-btn text small color="primary" :href="issueUrl">
          <v-icon left>mdi-github-circle</v-icon>
          Report an issue
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    issueUrl: "https://github.com/arxanas/smashtraining/issues",
  }),
});
</script>
