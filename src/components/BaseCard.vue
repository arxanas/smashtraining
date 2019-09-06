<template>
  <v-card
    :elevation="elevation"
    min-width="15em"
    max-width="30em"
    class="ma-auto"
  >
    <slot />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    elevation: {
      required: false,
      default: null,
    },
  },
});
</script>
