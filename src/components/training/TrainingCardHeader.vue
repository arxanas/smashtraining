<template>
  <BaseCard>
    <v-card-title>Instructions</v-card-title>
    <v-card-text>
      <ul>
        <li>For each set, complete about 30 seconds worth of reps.</li>
        <li>
          In between sets, take a short break, or start a set of a different
          exercise.
        </li>
        <li>
          When you're done with an exercise, tap its checkbox.
        </li>
      </ul>
    </v-card-text></BaseCard
  >
</template>

<script lang="ts">
import Vue from "vue";
import BaseCard from "../BaseCard.vue";
export default Vue.extend({
  components: {
    BaseCard,
  },
});
</script>
