import { serializeTechVariant } from "@/tech/AllTechMetadata";
import { variantValues } from "@/tech/TechMetadata";
import {
  generateAllVariantCombinations,
  isTechAvailable,
} from "@/tech/TechTraining";

describe("Training", () => {
  it("should result in the correct variant combinations", () => {
    expect(
      generateAllVariantCombinations(["jumpDistance", "aerialType"]).length,
    ).toEqual(
      variantValues.jumpDistance.length * variantValues.aerialType.length,
    );
  });

  it("should assess available tech", () => {
    expect(
      isTechAvailable(
        {
          [serializeTechVariant("short-hop", {
            facing: "forward",
            jumpDistance: "0.0",
          })]: true,
        },
        "short-hop",
        {
          facing: "forward",
          // Requires short-hop with jumpDistance 0.0.
          jumpDistance: "0.5",
        },
      ),
    ).toEqual(true);

    expect(
      isTechAvailable(
        {
          [serializeTechVariant("short-hop", {
            facing: "forward",
            jumpDistance: "0.0",
          })]: true,
        },
        "short-hop",
        {
          facing: "forward",
          // Requires short-hop with jumpDistance 0.5.
          jumpDistance: "1.0",
        },
      ),
    ).toEqual(false);

    expect(
      isTechAvailable(
        {
          // Unrelated tech.
          [serializeTechVariant("b-reverse", {})]: true,
        },
        "short-hop",
        {
          facing: "forward",
          // Requires short-hop with jumpDistance 0.5.
          jumpDistance: "1.0",
        },
      ),
    ).toEqual(false);
  });
});
