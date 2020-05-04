<template>
  <div>
    <v-expansion-panels accordion :value="value">
      <v-expansion-panel>
        <v-expansion-panel-header class="py-2 subtitle-1">
          How to use
        </v-expansion-panel-header>
        <v-expansion-panel-content eager class="body-2">
          <p>
            Do as many exercises as you like.
          </p>
          <p>
            The trainer will learn your weak points and drill you on them later.
            It'll also unlock new exercises.
          </p>
          <ul>
            <li>For each set, complete about 20 seconds worth of reps.</li>
            <li>
              When you've filled out every set of an exercise, tap "Record".
            </li>
            <li>
              In between sets, take a short break, or start a set of a different
              exercise.
            </li>
          </ul>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="py-2 subtitle-1" disable-icon-rotate>
          <template>
            <v-row no-gutters>
              <v-col class="flex-grow-0">
                Character
              </v-col>

              <v-col
                v-if="selectedCharacterName !== null"
                class="pl-4 flex-grow-1 text--secondary"
              >
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
    <v-banner icon="mdi-information">
      Want to track your improvement? Try the
      <a @click="openGspTracker">GSP Tracker</a>
      in the sidebar.
    </v-banner>
  </div>
</template>

<script lang="ts">
import { allCharacterMetadata, GameId } from "@/tech/AllCharacterMetadata";
import Vue from "vue";
import Component from "vue-class-component";
import {
  commitDrawer,
  dispatchRestoreState,
  readDrawer,
  readSelectedCharacters,
} from "../../store";
import CharacterSelector from "./CharacterSelector.vue";

@Component({
  name: "TrainingHeader",
  components: {
    CharacterSelector,
  },
})
export default class extends Vue {
  public gameId: GameId = "ssbu";
  public value: number | null | undefined = null;

  get selectedCharacter() {
    const selectedCharacters = readSelectedCharacters(this.$store);
    return selectedCharacters[this.gameId];
  }

  get selectedCharacterName(): string {
    const selectedCharacter = this.selectedCharacter;
    if (selectedCharacter === null) {
      return "Not selected";
    } else {
      return allCharacterMetadata[this.gameId][selectedCharacter].displayName;
    }
  }

  public async created() {
    await dispatchRestoreState(this.$store);
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

  public openGspTracker(): void {
    commitDrawer(this.$store, !readDrawer(this.$store));
  }
}
</script>
