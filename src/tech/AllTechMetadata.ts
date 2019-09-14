import { TechMetadata } from "./TechMetadata";

const allTechMetadata = {
  "b-reverse": {
    name: "B-reverse",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "full-hop": {
    name: "Full hop",
    games: {
      ssbu: {},
    },
    variants: {
      jumpDistance: true,
    },
  },
  "running-tilt": {
    name: "Running tilt",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "short-hop": {
    name: "Short hop",
    games: {
      ssbu: {},
    },
    variants: {
      jumpDistance: true,
    },
  },
  "short-hop-fast-fall-aerial": {
    name: "Short-hop fast-fall aerial",
    games: {
      ssbu: {},
    },
    variants: {
      jumpDistance: true,
      aerialType: true,
    },
  },
};

export type TechId = keyof typeof allTechMetadata;
const exportedAllTechMetadata: Record<TechId, TechMetadata> = allTechMetadata;
export default exportedAllTechMetadata;

export function getTechMetadata(
  techIdString: string,
): { techId: TechId; metadata: TechMetadata } | null {
  if (allTechMetadata.hasOwnProperty(techIdString)) {
    const techId = techIdString as TechId;
    const metadata: TechMetadata = allTechMetadata[techId];
    return {
      techId,
      metadata,
    };
  } else {
    return null;
  }
}
