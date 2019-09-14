<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="py-2 subtitle-1">
      <div>
        {{ techMetadata.name }}
        <span class="grey--text" v-if="techVariantDescription">{{
          techVariantDescription
        }}</span>
      </div>
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
          :to="{ name: 'learn-tech', params: { techId }, query: variant }"
          >Learn this tech</v-btn
        >
      </v-card-actions>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import allTechData, { getTechMetadata, TechId } from "@/tech/AllTechMetadata";
import {
  AllTechVariants,
  TechMetadata,
  TechVariantConfig,
  variantPrinters,
} from "@/tech/TechMetadata";
import { entries } from "@/utils";
import Vue from "vue";
import TrainingPerformanceSelector from "./TrainingPerformanceSelector.vue";

export default Vue.extend({
  components: { TrainingPerformanceSelector },
  props: {
    techId: {
      type: String,
      required: true,
    },
    variant: {
      type: Object,
      required: false,
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
    techVariantDescription(): string | null {
      const variantInfo = entries(this.variant);
      if (variantInfo.length === 0) {
        return null;
      }
      const nbsp = "\xa0";
      const descriptions: string[] = [];
      for (const [k, v] of variantInfo) {
        // @ts-ignore
        const description = variantPrinters[k](v);
        descriptions.push(description.replace(" ", nbsp));
      }
      return `(${descriptions.join(", ")})`;
    },
    techMetadata(): TechMetadata {
      const techData = getTechMetadata(this.techId);
      if (techData === null) {
        throw new Error(
          `tried to render non-existent tech with ID '${this.techId}'`,
        );
      } else {
        return techData.metadata;
      }
    },
    allSetsEntered(): boolean {
      return this.setResults.every(result => result !== null);
    },
  },
});
</script>
