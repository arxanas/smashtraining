<template>
  <BaseCard>
    <v-card-text>
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
