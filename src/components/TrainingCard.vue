<template>
  <v-container>
    <BaseCard>
      <v-form>
        <v-card-title>
          <v-row no-gutters>
            <v-col>{{ techName }}</v-col>
            <v-col class="flex-grow-0">
              <v-btn icon><v-icon>mdi-settings</v-icon></v-btn></v-col
            >
          </v-row>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-row align="center" justify="center">
            <v-col class="text-center" v-for="i in setResults.length" :key="i">
              <TrainingPerformanceSelector
                :value="setResults[i - 1]"
                @input="setResults.splice(i - 1, 1, $event)"
              /><br />
              Set {{ i }}
            </v-col>
            <v-col class="text-center">
              <v-btn icon :disabled="!allSetsEntered" color="primary"
                ><v-icon>mdi-checkbox-marked-circle</v-icon></v-btn
              ><br />&nbsp;
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="info"
            :to="{ name: 'learn-tech', params: { game, techId } }"
            >Learn about this tech</v-btn
          >
          <v-btn text color="error">Skip</v-btn>
        </v-card-actions>
      </v-form>
    </BaseCard>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import BaseCard from "./BaseCard.vue";
import TrainingPerformanceSelector from "./TrainingPerformanceSelector.vue";

export default Vue.extend({
  components: { BaseCard, TrainingPerformanceSelector },
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
