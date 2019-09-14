import {
  AllTechVariants,
  TechVariantType,
  variantValues,
} from "./TechMetadata";

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
  variantTypes: TechVariantType[],
): Array<Partial<AllTechVariants>> {
  if (variantTypes.length === 0) {
    return [{}];
  }
  const first = variantTypes[0];
  const rest = variantTypes.slice(1);
  const firstValues = variantValues[first];
  const restValues = generateAllVariantCombinations(rest);
  let result: Array<Partial<AllTechVariants>> = [];
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
