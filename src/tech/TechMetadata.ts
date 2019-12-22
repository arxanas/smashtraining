/**
 * Techs may have multiple "variants" for their exercises. For example,
 * short-hop fast-fall aerials are fundamentally the same tech, but the
 * exercises require practicing different jump distances and different aerials.
 * This is the listing of all possible variant types and their values.
 */
export interface AllTechVariants {
  aerialType: "nair" | "fair" | "uair" | "bair" | "dair";
  facing: "forward" | "backward";
  fall: "normal" | "fast";
  hop: "short" | "full";
  jumpDistance: "0.0" | "0.5" | "1.0" | "1.5" | "2.0" | "2.5" | "max";
}

export type TechVariantKind = keyof AllTechVariants;

export type TechVariant = Partial<AllTechVariants>;

export const variantValues: {
  [key in TechVariantKind]: Array<AllTechVariants[key]>;
} = {
  aerialType: ["nair", "fair", "uair", "bair", "dair"],
  facing: ["forward", "backward"],
  fall: ["normal", "fast"],
  hop: ["short", "full"],
  jumpDistance: ["0.0", "0.5", "1.0", "1.5", "2.0", "2.5", "max"],
};

export type TechVariantConfig = Partial<Record<TechVariantKind, boolean>>;

export interface TechMetadata {
  name: string;
  games: {
    ssbu: {};
  };
  variants: TechVariantConfig;
}

export type TechGame = keyof TechMetadata["games"];

const variantVerifiers: {
  [key in TechVariantKind]: (
    variantValue: string,
  ) => AllTechVariants[key] | null;
} = {
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
  fall(fall: string): AllTechVariants["fall"] | null {
    if (variantValues.fall.includes(fall as AllTechVariants["fall"])) {
      return fall as AllTechVariants["fall"];
    } else {
      return null;
    }
  },
  facing(facing: string): AllTechVariants["facing"] | null {
    if (variantValues.facing.includes(facing as AllTechVariants["facing"])) {
      return facing as AllTechVariants["facing"];
    } else {
      return null;
    }
  },
  hop(hop: string): AllTechVariants["hop"] | null {
    if (variantValues.hop.includes(hop as AllTechVariants["hop"])) {
      return hop as AllTechVariants["hop"];
    } else {
      return null;
    }
  },
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
};

export const variantPrinters: {
  [key in TechVariantKind]: (variantValue: AllTechVariants[key]) => string;
} = {
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
  facing(variantValue) {
    switch (variantValue) {
      case "forward":
        return "facing forward";
      case "backward":
        return "facing backward";
    }
  },
  fall(variantValue) {
    switch (variantValue) {
      case "normal":
        return "normal-fall";
      case "fast":
        return "fast-fall";
    }
  },
  hop(variantValue) {
    switch (variantValue) {
      case "short":
        return "short-hop";
      case "full":
        return "full-hop";
    }
  },
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
