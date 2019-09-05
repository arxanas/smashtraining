<template>
  <v-container>
    <TrainingCard
      skill-short-name="SH FF Fair"
      skill-name="Short-hop fast-fall forward aerial"
      inputs="fh . D - r + a"
      num-sets="3"
    />
    <TrainingCard skill-name="B-reverse" inputs="fh R . b - l" num-sets="3" />
    <TrainingCard
      skill-name="Sliding tilt"
      inputs="R - L - r + a"
      num-sets="3"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import TrainingCard from "./TrainingCard.vue";

export default Vue.extend({
  components: { TrainingCard },
});
</script>
