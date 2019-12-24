<template>
  <v-expansion-panels accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>How to use</v-expansion-panel-header>
      <v-expansion-panel-content class="body-2">
        <p>
          <i>Smash Training</i> is a
          <a href="https://en.wikipedia.org/wiki/Spaced_repetition"
            >spaced repetition trainer</a
          >
          for Super Smash Bros. drills. Do the exercises at the top of the list
          regularly. The trainer will learn your weak points and drill you on
          them.
        </p>
        <ul>
          <li>For each set, complete about 30 seconds worth of reps.</li>
          <li>
            In between sets, take a short break, or start a set of a different
            exercise.
          </li>
          <li>
            When you're done with every set of an exercise, tap "Record".
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
            <TrainingPerformanceSelector :value="4" /> All/nearly all reps
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
            <TrainingPerformanceSelector :value="0" /> All/nearly all reps
            failed.
          </li>
        </ul>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TrainingPerformanceSelector from "./TrainingPerformanceSelector.vue";

@Component({
  components: {
    TrainingPerformanceSelector,
  },
})
export default class extends Vue {}
</script>
