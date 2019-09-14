import { entries } from "@/utils";

/**
 * Techs may have multiple "variants" for their exercises. For example,
 * short-hop fast-fall aerials are fundamentally the same tech, but the
 * exercises require practicing different jump distances and different aerials.
 * This is the listing of all possible variant types and their values.
 */
export interface AllTechVariants {
  jumpDistance: "0.0" | "0.5" | "1.0" | "1.5" | "2.0" | "2.5" | "max";
  aerialType: "nair" | "fair" | "uair" | "bair" | "dair";
}

export type TechVariantType = keyof AllTechVariants;

export const variantValues: {
  [key in TechVariantType]: Array<AllTechVariants[key]>;
} = {
  jumpDistance: ["0.0", "0.5", "1.0", "1.5", "2.0", "2.5", "max"],
  aerialType: ["nair", "fair", "uair", "bair", "dair"],
};

export type TechVariantConfig = Partial<Record<TechVariantType, boolean>>;

export interface TechMetadata {
  name: string;
  games: {
    ssbu: {};
  };
  variants: TechVariantConfig;
}

export type TechGame = keyof TechMetadata["games"];

const variantVerifiers: {
  [key in TechVariantType]: (
    variantValue: string,
  ) => AllTechVariants[key] | null;
} = {
  jumpDistance(jumpDistance: string): AllTechVariants["jumpDistance"] | null {
    if (
      variantValues.jumpDistance.includes(
        jumpDistance as AllTechVariants["jumpDistance"],
      )
    ) {
      return jumpDistance as AllTechVariants["jumpDistance"];
    } else {
      return null;
    }
  },
  aerialType(aerialType: string): AllTechVariants["aerialType"] | null {
    if (
      variantValues.aerialType.includes(
        aerialType as AllTechVariants["aerialType"],
      )
    ) {
      return aerialType as AllTechVariants["aerialType"];
    } else {
      return null;
    }
  },
};

export const variantPrinters: {
  [key in TechVariantType]: (variantValue: AllTechVariants[key]) => string;
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
  VariantName extends keyof TechMetadata["variants"]
>(
  techData: TechMetadata,
  variantName: VariantName,
  variantValue: any,
): boolean {
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
