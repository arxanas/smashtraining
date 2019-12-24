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
      <v-card-actions right class="pa-0">
        <v-btn
          text
          color="primary"
          :disabled="!allSetsEntered"
          @click="recordSet"
          >Record</v-btn
        >
        <v-btn
          text
          color="secondary"
          :to="{ name: 'learn-tech', params: { techId }, query: variant }"
          >Learn this tech</v-btn
        >
      </v-card-actions>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { getStore } from "@/store";
import allTechData, { getTechMetadata, TechId } from "@/tech/AllTechMetadata";
import {
  AllTechVariants,
  TechMetadata,
  TechVariantConfig,
  variantPrinters,
} from "@/tech/TechMetadata";
import { assert, entries, unreachable } from "@/utils";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import TrainingPerformanceSelector from "./TrainingPerformanceSelector.vue";

@Component({
  components: { TrainingPerformanceSelector },
})
export default class extends Vue {
  @Prop({ type: String, required: true })
  public techId!: TechId;

  @Prop({ type: Object, required: false, default: {} })
  public variant!: object;

  @Prop({ type: Number, required: true })
  public numSets!: number;

  // defined in `data`
  public setResults!: number[];

  public data() {
    return {
      setResults: Array(this.numSets).fill(null),
    };
  }

  get techVariantDescription(): string | null {
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
  }

  get techMetadata(): TechMetadata {
    const techData = getTechMetadata(this.techId);
    if (techData === null) {
      throw new Error(
        `tried to render non-existent tech with ID '${this.techId}'`,
      );
    } else {
      return techData.metadata;
    }
  }

  get allSetsEntered(): boolean {
    return this.setResults.every(result => result !== null);
  }

  public recordSet(): void {
    getStore().commit.recordPracticeSet({
      timestamp: Date.now(),
      techId: this.techId,
      reps: this.setResults.map(performance => {
        switch (performance) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            return { performance };
          default:
            return unreachable(
              performance as never,
              `Invalid performance: ${performance}`,
            );
        }
      }),
    });
  }
}
</script>
