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
import Component from "vue-class-component";
import TrainingHeader from "../components/training/TrainingHeader.vue";
import TrainingPanel from "../components/training/TrainingPanel.vue";
import allTechMetadata, { TechId } from "../tech/AllTechMetadata";
import {
  AllTechVariants,
  TechMetadata,
  TechVariant,
  variantValues,
} from "../tech/TechMetadata";
import {
  generateAllVariantCombinations,
  isTechAvailable,
  SatisfactoryTech,
} from "../tech/TechTraining";

interface PanelData {
  techId: TechId;
  variant: TechVariant;
  numSets: number;
}

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
    .filter(variant => isTechAvailable(satisfactoryTech, techId, variant))
    .map(variant => ({
      techId,
      variant,
      numSets: 3,
    }));
}

function getSatisfactoryTech(): SatisfactoryTech {
  // TODO: store and load actual satisfactory tech. This function may need to be
  // `async`. Need to look up the way to do async data loading in Vue.
  return { "short-hop": { jumpDistance: ["0.0"] } };
}

function createPanels(): PanelData[] {
  const satisfactoryTech = getSatisfactoryTech();
  return entries(allTechMetadata).flatMap(param => {
    const [techId, techMetadata] = param;
    return createPanelsForTech(satisfactoryTech, techId, techMetadata);
  });
}

@Component({
  name: "training",
  components: { TrainingHeader, TrainingPanel },
})
export default class extends Vue {
  public panels = createPanels();
}
</script>
