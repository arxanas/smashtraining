<template>
  <div>
    <TrainingHeader ref="trainingHeader" />
    <v-overlay v-if="panels === 'loading'">
      <v-progress-circular indeterminate></v-progress-circular>
      Loading your training data...
    </v-overlay>
    <div v-else-if="panels === 'no-character-selected'">
      <p class="title text-center pa-4 text--secondary">
        Select a character to begin.
      </p>
    </div>
    <div v-else>
      <h1 class="headline mt-4 mb-2">Exercises</h1>
      <v-expansion-panels multiple :value="shownExpansionPanels">
        <TrainingPanel
          v-for="(panel, i) in panels"
          v-on:recorded="onRecorded(i, $event)"
          :key="i"
          :tech-id="panel.techId"
          :variant="panel.variant"
          :num-sets="panel.numSets"
        />
      </v-expansion-panels>
      <p class="subtitle text-center pt-4 mb-0 text--secondary">
        Done with these exercises? Refresh to see more.
      </p>
      <p class="text-center">
        <v-btn text v-on:click="refresh">
          <v-icon>mdi-refresh</v-icon>
          Refresh
        </v-btn>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  commitRecordPracticeSet,
  dispatchRestoreState,
  dispatchSaveState,
  PracticeSet,
  readRecordedPracticeSets,
  readSelectedCharacters,
  readSpacedRepetitionItems,
  RootStore,
} from "@/store";
import { compareItem, createItem } from "@/tech/SpacedRepetition";
import { deepEqual, entries } from "@/utils";
import Vue from "vue";
import Component from "vue-class-component";
import { Store } from "vuex";
import CharacterSelector from "../components/training/CharacterSelector.vue";
import TrainingHeader from "../components/training/TrainingHeader.vue";
import TrainingPanel from "../components/training/TrainingPanel.vue";
import {
  CharacterId,
  GameAndCharacterId,
  GameId,
} from "../tech/AllCharacterMetadata";
import allTechMetadata, {
  serializeTechVariant,
  TechId,
} from "../tech/AllTechMetadata";
import {
  AllTechVariants,
  TechMetadata,
  TechVariant,
  variantValues,
} from "../tech/TechMetadata";
import {
  generateAllVariantCombinations,
  isSatisfactoryPracticeSet,
  isTechAvailable,
  SatisfactoryTech,
} from "../tech/TechTraining";

interface PanelData {
  techId: TechId;
  variant: TechVariant;
  numSets: number;
}

type Panels = "loading" | "no-character-selected" | PanelData[];

const MAX_NUM_EXERCISES: number = 8;

function createPanelsForTech(
  satisfactoryTech: SatisfactoryTech,
  techId: TechId,
  techMetadata: TechMetadata,
): PanelData[] {
  return generateAllVariantCombinations(
    entries(techMetadata.variants)
      .filter(x => x[1])
      .map(x => x[0]),
  )
    .filter(variant => {
      const excludeVariants = techMetadata.excludeVariants;
      if (excludeVariants === undefined) {
        return true;
      } else {
        return !excludeVariants.some(excludeVariant =>
          deepEqual(variant, excludeVariant),
        );
      }
    })
    .filter(variant => isTechAvailable(satisfactoryTech, techId, variant))
    .map(variant => ({
      techId,
      variant,
      numSets: 3,
    }));
}

function getSatisfactoryTech<T extends GameId>(
  store: RootStore,
  gameAndCharacterId: GameAndCharacterId<T>,
): SatisfactoryTech {
  const { gameId, characterId } = gameAndCharacterId;
  const satisfactoryTech: SatisfactoryTech = {};
  const recordedPracticeSets = readRecordedPracticeSets(store);
  for (const practiceSet of recordedPracticeSets) {
    const { techId, techVariant } = practiceSet;
    if (isSatisfactoryPracticeSet(practiceSet)) {
      const serializedTechVariant = serializeTechVariant(techId, techVariant);
      satisfactoryTech[serializedTechVariant] = true;
    }
  }
  return satisfactoryTech;
}

function createPanels<T extends GameId>(
  store: RootStore,
  gameAndCharacterId: GameAndCharacterId<T>,
): PanelData[] {
  const spacedRepetitionItems = readSpacedRepetitionItems(store);
  const satisfactoryTech = getSatisfactoryTech(store, gameAndCharacterId);
  return entries(allTechMetadata)
    .flatMap(entry => {
      const [techId, techMetadata] = entry;
      return createPanelsForTech(satisfactoryTech, techId, techMetadata);
    })
    .sort((lhs, rhs) => {
      const lhsItem = spacedRepetitionItems.get(
        serializeTechVariant(lhs.techId, lhs.variant),
      );
      const rhsItem = spacedRepetitionItems.get(
        serializeTechVariant(rhs.techId, rhs.variant),
      );
      const result = compareItem(
        lhsItem !== undefined ? lhsItem : createItem(),
        rhsItem !== undefined ? rhsItem : createItem(),
      );
      return result;
    })
    .slice(0, MAX_NUM_EXERCISES);
}

@Component({
  name: "training",
  components: { TrainingHeader, TrainingPanel },
})
export default class extends Vue {
  public panels: Panels = "loading";
  public gameId: GameId = "ssbu";

  public shownExpansionPanels!: number[];
  public hiddenExpansionPanels!: number[];

  public data() {
    return {
      panels: "loading",
      shownExpansionPanels: [0],
      hiddenExpansionPanels: [],
    };
  }

  public async created() {
    await dispatchRestoreState(this.$store);

    this.$watch(
      function() {
        return readSelectedCharacters(this.$store)[this.gameId];
      },
      function(newSelectedCharacter) {
        if (newSelectedCharacter === null) {
          this.panels = "no-character-selected";
        } else {
          this.resetExpansionPanels({
            gameId: this.gameId,
            characterId: newSelectedCharacter,
          });
        }
      },
      {
        immediate: true,
      },
    );
  }

  public refresh(): void {
    location.reload();
  }

  public resetExpansionPanels(
    gameAndCharacterId: GameAndCharacterId<GameId>,
  ): void {
    this.panels = createPanels(this.$store, gameAndCharacterId);
    this.shownExpansionPanels = [0];
    this.hiddenExpansionPanels = [];
  }

  public async onRecorded(
    i: number,
    practiceSet: PracticeSet<TechId>,
  ): Promise<void> {
    this.hidePanel(i);
    commitRecordPracticeSet(this.$store, practiceSet);
    await dispatchSaveState(this.$store);
  }

  public hidePanel(i: number): void {
    this.shownExpansionPanels = this.shownExpansionPanels.filter(j => j !== i);
    this.hiddenExpansionPanels.push(i);

    // Show the next available panel, if any. If the user already has another
    // open panel, don't open any other panels.
    if (
      this.panels !== "no-character-selected" &&
      this.panels !== "loading" &&
      this.shownExpansionPanels.length === 0
    ) {
      const maxNumPanels = this.panels.length;
      const maxSeenPanel = this.hiddenExpansionPanels.reduce(
        (acc, j) => Math.max(acc, j),
        -1,
      );
      if (maxSeenPanel + 1 < maxNumPanels) {
        this.shownExpansionPanels.push(maxSeenPanel + 1);
      }
    }
  }
}
</script>
