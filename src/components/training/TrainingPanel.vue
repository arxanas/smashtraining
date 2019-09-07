<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="py-2 subtitle-1">
      <div>{{ techName }}</div>
      <div class="flex-grow-1"></div>
      <v-btn icon class="flex-grow-0" v-on:click.stop
        ><v-icon small>mdi-settings</v-icon></v-btn
      >
    </v-expansion-panel-header>
    <v-expansion-panel-content class="pb-0">
      <v-row align="center" justify="center" class="pa-0">
        <v-col class="text-center" v-for="i in setResults.length" :key="i">
          <TrainingPerformanceSelector
            :value="setResults[i - 1]"
            @input="setResults.splice(i - 1, 1, $event)"
          /><br />
          Set {{ i }}
        </v-col>
      </v-row>
      <v-card-actions class="pa-0">
        <v-btn text color="primary" :disabled="!allSetsEntered">Record</v-btn>
        <v-btn
          text
          color="primary"
          :to="{ name: 'learn-tech', params: { game, techId } }"
          >Learn this tech</v-btn
        >
      </v-card-actions>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from "vue";
import TrainingPerformanceSelector from "./TrainingPerformanceSelector.vue";

export default Vue.extend({
  components: { TrainingPerformanceSelector },
  props: {
    game: {
      type: String,
      required: true,
    },
    techName: {
      type: String,
      required: true,
    },
    techId: {
      type: String,
      required: true,
    },
    numSets: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      setResults: Array(this.numSets).fill(null),
    };
  },
  computed: {
    allSetsEntered(): boolean {
      return this.setResults.every(result => result !== null);
    },
  },
});
</script>
