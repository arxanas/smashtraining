import { TechMetadata } from "./TechMetadata";

export interface AllTechMetadata {
  "b-reverse": TechMetadata;
  "running-tilt": TechMetadata;
  "short-hop-fast-fall-aerial": TechMetadata;
}

export type TechId = keyof AllTechMetadata;

const allTechMetadata: Record<keyof AllTechMetadata, TechMetadata> = {
  "b-reverse": {
    name: "B-reverse",
    games: ["ssbu"],
    variants: {},
  },
  "running-tilt": {
    name: "Running tilt",
    games: ["ssbu"],
    variants: {},
  },
  "short-hop-fast-fall-aerial": {
    name: "Short-hop fast-fall aerial",
    games: ["ssbu"],
    variants: {
      jumpDistance: true,
      aerialType: true,
    },
  },
};
export default allTechMetadata;

export function getTechMetadata(
  techIdString: string,
): { techId: TechId; metadata: TechMetadata } | null {
  if (allTechMetadata.hasOwnProperty(techIdString)) {
    const techId = techIdString as TechId;
    return {
      techId,
      metadata: allTechMetadata[techId],
    };
  } else {
    return null;
  }
}
