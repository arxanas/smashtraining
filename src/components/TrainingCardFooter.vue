<template>
  <BaseCard>
    <v-card-text>
      <p>
        For each set, complete about 30 seconds worth of reps. Then take a short
        break, or start a set of a different exercise.
      </p>
      <p>Complete or skip one of the above exercises to reveal a new one.</p>
      <p>Guide:</p>
      <ul>
        <li>
          <TrainingPerformanceSelector :value="4" /> All or almost all reps
          completed correctly.
        </li>
        <li>
          <TrainingPerformanceSelector :value="3" /> Most reps completed
          correctly.
        </li>
        <li>
          <TrainingPerformanceSelector :value="2" /> Some reps completed
          correctly.
        </li>
        <li><TrainingPerformanceSelector :value="1" /> Most reps failed.</li>
        <li>
          <TrainingPerformanceSelector :value="0" /> All or almost all reps
          failed.
        </li>
      </ul>
    </v-card-text>
  </BaseCard>
</template>

<script lang="ts">
import Vue from "vue";
import BaseCard from "./BaseCard.vue";
import TrainingPerformanceSelector from "./TrainingPerformanceSelector.vue";
export default Vue.extend({
  components: { BaseCard, TrainingPerformanceSelector },
});
</script>
