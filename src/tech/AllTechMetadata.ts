import { unreachable, upcast } from "@/utils";
import { AllTechVariants, TechMetadata } from "./TechMetadata";

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
export type AllTechMetadata = typeof allTechMetadata;

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

export type TechVariantOf<T extends TechId> = {
  // @ts-ignore "Type 'x' cannot be used to index type 'AllTechVariants'."
  // Strangely, the correct type is calculated here anyways, and can be used for
  // exhaustiveness-checking later.
  [x in keyof AllTechMetadata[T]["variants"]]: AllTechVariants[x];
};

/**
 * A tech is said to depend on another tech if the other tech should be learned
 * before practicing the new tech. For example, short-hop fast-falls should be
 * learned only once short-hops have been learned, so we say that short-hop
 * fast-falls have a dependency on short-hops.
 *
 * Furthermore, a variant of a tech may have specific dependencies on a variant
 * of another tech. For example, short-hopping 1.0 grid unit should be learned
 * only after short-hopping in-place.
 */
interface TechDependency<T extends TechId> {
  id: T;
  variant: TechVariantOf<T> | null;
}

/**
 * Helper function to construct a `TechDependency`. TypeScript doesn't have
 * existential types, so we can't annotate the return type for
 * `getTechDependencies` as `Array<TechDependency<*>>`, which means that we
 * need to annotate it with the less informative type
 * `Array<TechDependency<TechId>>`. But that type doesn't statically detect
 * when you return a tech dependency that isn't valid for the given tech ID. So
 * we make sure to only construct dependencies using this function, which
 * *does* verify that.
 */
function dep<T extends TechId>(
  id: T,
  variant: TechVariantOf<T>,
): TechDependency<T> {
  return { id, variant };
}

export function getTechDependencies<T extends TechId>(
  // tslint:disable-next-line: variable-name
  techId_: T,
  variant: TechVariantOf<T>,
): Array<TechDependency<TechId>> {
  const techId: TechId = upcast(techId_);
  switch (techId) {
    case "short-hop":
    case "full-hop":
      const jumpDistance = (variant as TechVariantOf<typeof techId>)
        .jumpDistance;
      switch (jumpDistance) {
        case "0.0":
          return [];
        case "0.5":
          return [dep(techId, { jumpDistance: "0.0" })];
        case "1.0":
          return [dep(techId, { jumpDistance: "0.5" })];
        case "1.5":
          return [dep(techId, { jumpDistance: "1.0" })];
        case "2.0":
          return [dep(techId, { jumpDistance: "1.5" })];
        case "2.5":
          return [dep(techId, { jumpDistance: "2.0" })];
        case "max":
          return [dep(techId, { jumpDistance: "0.0" })];
        default:
          return unreachable(jumpDistance, "jumpDistance");
      }

    case "short-hop-fast-fall-aerial":
      // TODO: should have dependencies on short-hop-fast-falls, which should in
      // turn have dependencies on short-hopping.
      return [
        dep("short-hop", {
          jumpDistance: (variant as TechVariantOf<typeof techId>).jumpDistance,
        }),
      ];

    case "b-reverse":
    case "running-tilt":
      return [];

    default:
      return unreachable(techId, "techId");
  }
}
