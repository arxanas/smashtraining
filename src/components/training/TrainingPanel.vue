<template>
  <v-expansion-panel :id="anchorId || ''">
    <v-expansion-panel-header
      :disable-icon-rotate="recorded"
      class="py-2 subtitle-1"
    >
      <div>
        {{ techMetadata.name }}
        <span class="grey--text" v-if="techVariantDescription">{{
          techVariantDescription
        }}</span>
      </div>
      <template v-slot:actions v-if="recorded">
        <v-icon color="teal">mdi-check</v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content eager class="pb-0">
      <v-row v-for="i in setResults.length" :key="i" class="pa-0">
        <v-col class="py-0">
          <TrainingPerformanceSelector
            :title="`Set ${i}`"
            :value="setResults[i - 1]"
            @input="setResults.splice(i - 1, 1, $event)"
          />
        </v-col>
      </v-row>
      <v-card-actions class="px-0">
        <v-btn
          color="primary"
          :disabled="!allSetsEntered || recorded"
          @click="recordSet"
        >
          Record
        </v-btn>
        <v-spacer />
        <v-btn
          text
          color="primary"
          :to="{ name: 'learn-tech', params: { techId }, query: variant }"
        >
          Learn exercise <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
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

  @Prop({ type: String, required: true })
  public anchorId!: string;

  // defined in `data`
  public setResults!: number[];
  public recorded!: boolean;

  public data() {
    return {
      setResults: Array(this.numSets).fill(null),
      recorded: false,
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
    this.recorded = true;
    this.$emit("recorded", {
      timestamp: Date.now(),
      techId: this.techId,
      techVariant: this.variant,
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
