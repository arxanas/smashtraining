<template>
  <router-link :to="{ name: 'learn-tech', params: { techId }, query: variant }">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { getTechMetadata } from "@/tech/AllTechMetadata";
import Vue from "vue";

export default Vue.extend({
  props: {
    techId: {
      type: String,
      required: true,
      validator(value: string) {
        return getTechMetadata(value) !== null;
      },
    },
    variant: {
      type: Object,
      required: false,
    },
  },
});
</script>
