import ControlInputs from "@/components/ControlInputs.vue";
import Vue from "vue";
import BaseTech from "./BaseTech.vue";
import TechVideo from "./TechVideo.vue";

type Game = "ssbu";

/**
 * Techs may have multiple "variants" for their exercises. For example,
 * short-hop fast-fall aerials are fundamentally the same tech, but the
 * exercises require practicing different jump distances and different aerials.
 * This is the listing of all possible variant types and their values.
 */
export interface TechVariants {
  jumpDistance: "0.0" | "0.5" | "1.0" | "1.5" | "2.0" | "2.5" | "max";
  aerialType: "nair" | "fair" | "uair" | "bair" | "dair";
}

export interface TechData {
  id: string;
  name: string;
  games: Game[];
  variants: Partial<Record<keyof TechVariants, boolean>>;
}

function jumpDistanceVerifier(
  jumpDistance: string,
): TechVariants["jumpDistance"] | null {
  switch (jumpDistance) {
    case "0.0":
    case "0.5":
    case "1.0":
    case "1.5":
    case "2.0":
    case "max":
      return jumpDistance;
    default:
      return null;
  }
}

function aerialTypeVerifier(
  aerialType: string,
): TechVariants["aerialType"] | null {
  switch (aerialType) {
    case "nair":
    case "fair":
    case "uair":
    case "bair":
    case "dair":
      return aerialType;
    default:
      return null;
  }
}

const variantVerifiers: {
  [key in keyof TechVariants]: (
    variantValue: string,
  ) => TechVariants[key] | null;
} = {
  jumpDistance: jumpDistanceVerifier,
  aerialType: aerialTypeVerifier,
};

const variantPrinters: {
  [key in keyof TechVariants]: (variantValue: TechVariants[key]) => string;
} = {
  jumpDistance(variantValue) {
    switch (variantValue) {
      case "0.0":
        return "in-place";
      case "0.5":
      case "1.0":
      case "1.5":
      case "2.0":
      case "2.5":
        return `${variantValue} grid units`;
      case "max":
        return "max jump distance";
    }
  },
  aerialType(variantValue) {
    switch (variantValue) {
      case "nair":
        return "neutral-aerial";
      case "fair":
        return "forward-aerial";
      case "uair":
        return "up-aerial";
      case "bair":
        return "backward-aerial";
      case "dair":
        return "down-aerial";
    }
  },
};

export function verifyVariantValue<
  VariantName extends keyof TechData["variants"]
>(techData: TechData, variantName: VariantName, variantValue: any): boolean {
  const techExpectsThisVariantType = Boolean(techData.variants[variantName]);
  if (techExpectsThisVariantType) {
    if (typeof variantValue !== "string") {
      return false;
    } else {
      const verifierFunction = variantVerifiers[variantName];
      return verifierFunction(variantValue) !== null;
    }
  } else {
    return typeof variantValue === "undefined";
  }
}

export const allTechData: Map<string, TechData> = new Map();

/**
 * Get the name of the component corresponding to a given tech. This can then
 * be rendered as a tag.
 */
export function getTechDataComponentName(techData: TechData): string {
  return `tech-${techData.id}`;
}

/**
 * Register metadata about a tech in the global tech index.
 */
export function makeTechDataComponent(
  data: TechData,
  mixins: any = null,
): typeof Vue {
  const computed: Record<string, () => string> = {};
  for (const key of Object.keys(data.variants)) {
    computed[key + "Pretty"] = function() {
      // @ts-ignore
      return variantPrinters[key](this.variant[key]);
    };
  }

  allTechData.set(data.id, data);
  return Vue.component(getTechDataComponentName(data), {
    mixins: mixins ? [mixins] : [],
    components: { BaseTech, ControlInputs, TechVideo },
    props: {
      variant: {
        type: Object,
        required: Boolean(data.variants),
      },
    },
    computed,
  });
}
