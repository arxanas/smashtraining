<template>
  <v-expansion-panels accordion :value="value">
    <v-expansion-panel>
      <v-expansion-panel-header>How to use</v-expansion-panel-header>
      <v-expansion-panel-content eager class="body-2">
        <p>
          Do the exercises at the top of the list regularly. The trainer will
          learn your weak points and drill you on them.
        </p>
        <ul>
          <li>For each set, complete about 30 seconds worth of reps.</li>
          <li>
            In between sets, take a short break, or start a set of a different
            exercise.
          </li>
          <li>
            When you've filled out every set of an exercise, tap "Record".
          </li>
        </ul>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>Legend</v-expansion-panel-header>
      <v-expansion-panel-content eager class="body-2">
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
    <v-expansion-panel>
      <v-expansion-panel-header disable-icon-rotate>
        <template>
          <v-row no-gutters>
            <v-col cols="4">
              Select Character
            </v-col>

            <v-col
              cols="8"
              v-if="selectedCharacterName !== null"
              class="text--secondary"
            >
              Current:
              {{ selectedCharacterName }}
            </v-col>
          </v-row>
        </template>

        <template v-slot:actions v-if="selectedCharacter !== null">
          <v-icon color="teal">mdi-check</v-icon>
        </template>
        <template v-slot:actions v-else>
          <v-icon color="error">mdi-alert-circle</v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content eager class="body-2">
        <CharacterSelector :gameId="gameId" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { getStore } from "@/store";
import { allCharacterMetadata, GameId } from "@/tech/AllCharacterMetadata";
import Vue from "vue";
import Component from "vue-class-component";
import CharacterSelector from "./CharacterSelector.vue";
import TrainingPerformanceSelector from "./TrainingPerformanceSelector.vue";

@Component({
  components: {
    CharacterSelector,
    TrainingPerformanceSelector,
  },
})
export default class extends Vue {
  public gameId: GameId = "ssbu";
  public value: number | null | undefined = null;

  get selectedCharacter() {
    return getStore().state.local.selectedCharacters[this.gameId];
  }

  get selectedCharacterName(): string {
    const selectedCharacter = this.selectedCharacter;
    if (selectedCharacter === null) {
      return "not selected";
    } else {
      return allCharacterMetadata[this.gameId][selectedCharacter].displayName;
    }
  }

  public async created() {
    await getStore().dispatch.restoreState();
    if (this.selectedCharacter === null) {
      this.value = 2;
    }

    this.$watch(
      function() {
        return this.selectedCharacter;
      },
      function(newSelectedCharacter) {
        if (newSelectedCharacter !== null) {
          this.value = undefined;
        }
      },
    );
  }
}
</script>
