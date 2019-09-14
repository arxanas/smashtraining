import { variantValues } from "@/tech/TechMetadata";
import { generateAllVariantCombinations } from "@/tech/TechTraining";

describe("Training", () => {
  it("should result in the correct variant combinations", () => {
    expect(
      generateAllVariantCombinations(["jumpDistance", "aerialType"]).length,
    ).toEqual(
      variantValues.jumpDistance.length * variantValues.aerialType.length,
    );
  });
});
