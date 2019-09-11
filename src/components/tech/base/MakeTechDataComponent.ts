import ControlInputs from "@/components/ControlInputs.vue";
import allTechMetadata, { TechId } from "@/tech/AllTechMetadata";
import { TechVariants, variantPrinters } from "@/tech/TechMetadata";
import Vue from "vue";
import BaseTechDescription from "./BaseTechDescription.vue";
import TechVideo from "./TechVideo.vue";

export default function makeTechDataComponent(techId: TechId) {
  const metadata = allTechMetadata[techId];
  const computed: Record<string, () => string> = {};
  for (const key of Object.keys(metadata.variants)) {
    computed[key + "Pretty"] = function() {
      // @ts-ignore
      return variantPrinters[key](this.variant[key]);
    };
  }

  const component = Vue.extend({
    components: { BaseTechDescription, ControlInputs, TechVideo },
    props: {
      variant: {
        type: Object,
        required: true,
      },
    },
    computed,
    methods: {
      getVariant(): TechVariants {
        return this.variant as TechVariants;
      },
    },
  });
  return component;
}
