<template>
  <v-container>
    <TrainingCard
      skill-short-name="SH FF Fair"
      skill-name="Short-hop fast-fall forward aerial"
      :num-sets="3"
    />
    <TrainingCard skill-name="B-reverse" :num-sets="3" />
    <TrainingCard skill-name="Sliding tilt" :num-sets="3" />
    <TrainingCardFooter />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import TrainingCard from "./TrainingCard.vue";
import TrainingCardFooter from "./TrainingCardFooter.vue";

export default Vue.extend({
  components: { TrainingCard, TrainingCardFooter },
});
</script>
