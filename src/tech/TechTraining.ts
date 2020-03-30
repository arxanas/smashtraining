import { PracticeSet } from "@/store";
import { entries } from "@/utils";
import {
  AllTechMetadata,
  getTechDependencies,
  serializeTechVariant,
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
 */
export interface SatisfactoryTech {
  [serializedTechVariant: string]: boolean;
}

export function isSatisfactoryPracticeSet(
  practiceSet: PracticeSet<TechId>,
): boolean {
  return practiceSet.reps.every(rep => rep.performance >= 4);
}

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
    return !!enabledTech[serializeTechVariant(dependencyId, dependencyVariant)];
  });
}
