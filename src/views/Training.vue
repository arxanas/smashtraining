<template>
  <v-container>
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
    <TrainingCardFooter />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import TrainingCard from "../components/TrainingCard.vue";
import TrainingCardFooter from "../components/TrainingCardFooter.vue";

export default Vue.extend({
  name: "training",
  components: { TrainingCard, TrainingCardFooter },
});
</script>
