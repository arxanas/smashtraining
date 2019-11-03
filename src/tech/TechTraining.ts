import { entries } from "@/utils";
import {
  AllTechMetadata,
  getTechDependencies,
  TechId,
  TechVariantOf,
} from "./AllTechMetadata";
import {
  AllTechVariants,
  TechVariant,
  TechVariantKind,
  variantValues,
} from "./TechMetadata";

/**
 * State of the world indicating which tech is "satisfactory". By
 * "satisfactory", we mean that the given tech variant has been reasonably-well
 * practiced at some point in the past, or has been disabled for practice
 * altogether.
 *
 * New tech becomes available when all of its dependencies are satisfactory.
 *
 * This is a mapping in the form:
 *
 *     {
 *       "short-hop": {
 *         "jumpDistance": ["0.0", "1.5", "max"],
 *       },
 *     }
 */
export type SatisfactoryTech = Partial<
  {
    [techId in keyof AllTechMetadata]: {
      [variant in keyof AllTechMetadata[techId]["variants"]]: Array<
        TechVariantOf<techId>[variant]
      >;
    };
  }
>;

/**
 * Generate all the possible variant combinations for each variant registered
 * with the metadata. For example, with config
 *
 *     ["jumpDistance", "aerialType"]
 *
 * it generates
 *
 *     [
 *       { jumpDistance: "0.0", aerialType: "nair" },
 *       { jumpDistance: "0.5", aerialType: "nair" },
 *       ...
 *       { jumpDistance "0.0", aerialType: "fair" },
 *       { jumpDistance "0.5", aerialType: "fair" },
 *       ...
 *     ]
 */
export function generateAllVariantCombinations(
  variantTypes: TechVariantKind[],
): TechVariant[] {
  if (variantTypes.length === 0) {
    return [{}];
  }
  const first = variantTypes[0];
  const rest = variantTypes.slice(1);
  const firstValues = variantValues[first];
  const restValues = generateAllVariantCombinations(rest);
  let result: TechVariant[] = [];
  for (const value of firstValues) {
    result = result.concat(
      restValues.map(x => ({
        [first]: value,
        ...x,
      })),
    );
  }
  return result;
}

/**
 * Determine if a given tech is available given the tech that is satisfactory
 * so far. That is, make sure that all dependencies of the tech are satisfied.
 */
export function isTechAvailable<T extends TechId>(
  enabledTech: SatisfactoryTech,
  techId: T,
  variant: TechVariantOf<T>,
): boolean {
  const dependencies = getTechDependencies(techId, variant);
  return dependencies.every(dependency => {
    const { id: dependencyId, variant: dependencyVariant } = dependency;
    const enabledVariants = enabledTech[dependencyId];
    if (enabledVariants === undefined) {
      // This dependency tech was never practiced or doesn't appear in
      // `enabledTech` for some other reason, so it's not satisfied.
      return false;
    }
    if (dependencyVariant === null) {
      // There are no variants for this dependency tech, so we don't have to
      // check that the variant is satisfied. Return `variant === null` as a
      // sanity-check, as it should also be `null` if there are no other
      // possible variants.
      return variant === null;
    }

    // Now, we need to check that every sub-variant is satisfied.
    return entries(dependencyVariant).every(
      // @ts-ignore Type 'U' cannot be used to index type 'AllTechVariants'.
      <U extends keyof TechVariantOf<T>>(arg: [U, AllTechVariants[U]]) => {
        // Should be of the form
        //
        //     variantId === "jump-distance";
        //     variantValue === "0.5";
        const [variantId, variantValue] = arg;
        // @ts-ignore Type 'U' cannot be used to index type {} | ...
        return enabledVariants[variantId].indexOf(variantValue) !== -1;
      },
    );
  });
}
