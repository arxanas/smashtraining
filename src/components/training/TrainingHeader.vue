<template>
  <div>
    <v-expansion-panels accordion :value="value">
      <v-expansion-panel>
        <v-expansion-panel-header class="py-2 subtitle-1">
          How to use
        </v-expansion-panel-header>
        <v-expansion-panel-content eager class="body-2">
          <p>
            Go to Games &amp; More › Training and select the "Training" stage.
            Complete all of the exercises you have time for.
          </p>
          <p>
            The trainer will detect your weakest skills and drill you on them later.
            It'll also unlock new exercises.
          </p>
          <ul>
            <li>Complete about 20 seconds worth of reps for each set.</li>
            <li>
               Tap "Record" when you've filled out (all or each) sets of an exercise.
            </li>
            <li>
              Take a short break or start a different exercise between sets.
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
      To track improvement use the 
      <a @click="openGspTracker">GSP Tracker</a>
      in the sidebar.
    </v-banner>
  </div>
</template>

<script lang="ts">
import { allCharacterMetadata, GameId } from "@/tech/AllCharacterMetadata";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
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

  @Prop({ required: true, type: Boolean })
  public firstTime!: boolean;

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

  public async created(): Promise<void> {
    await dispatchRestoreState(this.$store);
    this.$watch(
      function() {
        return [this.selectedCharacter, this.firstTime];
      },
      function(value) {
        const [newSelectedCharacter, newFirstTime] = value;
        if (newSelectedCharacter === null) {
          this.value = 1;
        } else if (newFirstTime) {
          this.value = 0;
        } else {
          this.value = undefined;
        }
      },
      { immediate: true },
    );
  }

  public openGspTracker(): void {
    commitDrawer(this.$store, !readDrawer(this.$store));
  }
}
</script>
