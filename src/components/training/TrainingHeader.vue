<template>
  <v-expansion-panels accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>Instructions</v-expansion-panel-header>
      <v-expansion-panel-content class="body-2">
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
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>Legend</v-expansion-panel-header>
      <v-expansion-panel-content class="body-2">
        <ul>
          <li>
            <TrainingPerformanceSelector :value="null" /> Unset. Tap to cycle
            through values.
          </li>
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
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import Vue from "vue";
import TrainingPerformanceSelector from "./TrainingPerformanceSelector.vue";
export default Vue.extend({
  components: {
    TrainingPerformanceSelector,
  },
});
</script>
