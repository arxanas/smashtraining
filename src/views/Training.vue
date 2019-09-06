<template>
  <v-container>
    <TrainingCardHeader />
    <TrainingCard
      game="ssbu"
      tech-id="sh-ff-fair"
      tech-short-name="SH FF Fair"
      tech-name="Short-hop fast-fall forward aerial"
      :num-sets="3"
    />
    <TrainingCard
      game="ssbu"
      tech-id="b-reverse"
      tech-name="B-reverse"
      :num-sets="3"
    />
    <TrainingCard
      game="ssbu"
      tech-id="sliding-tilt"
      tech-name="Sliding tilt"
      :num-sets="3"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import TrainingCard from "../components/training/TrainingCard.vue";
import TrainingCardHeader from "../components/training/TrainingCardHeader.vue";

export default Vue.extend({
  name: "training",
  components: { TrainingCard, TrainingCardHeader },
});
</script>
