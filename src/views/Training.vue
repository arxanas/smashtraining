<template>
  <div>
    <TrainingHeader />
    <h1 class="headline mt-4 mb-2">Exercises</h1>
    <v-expansion-panels multiple :value="[0]">
      <TrainingPanel
        v-for="(panel, i) in panels"
        :key="i"
        :tech-id="panel.techId"
        :variant="panel.variant"
        :num-sets="panel.numSets"
      />
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { entries } from "@/utils";
import Vue from "vue";
import TrainingHeader from "../components/training/TrainingHeader.vue";
import TrainingPanel from "../components/training/TrainingPanel.vue";
import allTechMetadata, { TechId } from "../tech/AllTechMetadata";
import {
  AllTechVariants,
  TechMetadata,
  TechVariantType,
  variantValues,
} from "../tech/TechMetadata";
import { generateAllVariantCombinations } from "../tech/TechTraining";

interface PanelData {
  techId: TechId;
  variant: Partial<AllTechVariants>;
  numSets: number;
}

function createPanelsForTech(
  techId: TechId,
  techMetadata: TechMetadata,
): PanelData[] {
  return generateAllVariantCombinations(
    entries(techMetadata.variants)
      .filter(x => x[1])
      .map(x => x[0]),
  ).map(variant => ({
    techId,
    variant,
    numSets: 3,
  }));
}

function createPanels(): PanelData[] {
  let result: PanelData[] = [];
  for (const [techId, techMetadata] of entries(allTechMetadata)) {
    result = result.concat(createPanelsForTech(techId, techMetadata));
  }
  return result;
}

export default Vue.extend({
  name: "training",
  components: { TrainingHeader, TrainingPanel },
  data: () => ({
    panels: createPanels(),
  }),
});
</script>
