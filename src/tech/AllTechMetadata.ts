import { unreachable, upcast } from "@/utils";
import { AllTechVariants, TechMetadata } from "./TechMetadata";

const allTechMetadata = {
  walk: {
    name: "Walk",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  dash: {
    name: "Dash",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "rapid-turnaround": {
    name: "Rapid turnaround",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "running-jab": {
    name: "Running jab",
    games: {
      ssbu: {},
    },
    variants: {
      facing: true,
    },
  },
  "dash-attack": {
    name: "Dash attack",
    games: {
      ssbu: {},
    },
    variants: {
      facing: true,
    },
  },
  "running-nair": {
    name: "Running neutral-aerial",
    games: {
      ssbu: {},
    },
    variants: {
      facing: true,
    },
  },
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
      facing: true,
      jumpDistance: true,
    },
    excludeVariants: [
      { facing: "backward" as const, jumpDistance: "0.0" as const },
    ],
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
      facing: true,
      jumpDistance: true,
    },
    excludeVariants: [
      { facing: "backward" as const, jumpDistance: "0.0" as const },
    ],
  },
  "fast-fall": {
    name: "Fast-fall",
    games: {
      ssbu: {},
    },
    variants: {
      facing: true,
      hop: true,
      jumpDistance: true,
    },
  },
  "falling-aerial": {
    name: "Falling aerial",
    games: {
      ssbu: {},
    },
    variants: {
      aerialType: true,
      facing: true,
      fall: true,
      hop: true,
      jumpDistance: true,
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

export type SerializedTechVariant = string;

export function serializeTechVariant<T extends TechId>(
  techId: T,
  techVariant: TechVariantOf<T>,
): SerializedTechVariant {
  // From https://stackoverflow.com/a/16168003/344643
  const serialize = (value: {}) =>
    JSON.stringify(value, Object.keys(value).sort());
  return `${techId}-${serialize(techVariant)}`;
}

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
  variant: TechVariantOf<T>;
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
    case "walk":
    case "dash":
    case "rapid-turnaround":
      return [];

    case "running-jab":
    case "dash-attack":
    case "running-nair":
      return [dep("dash", {})];

    case "running-tilt":
      return [dep("dash", {})];
    case "b-reverse":
      return [dep("running-tilt", {})];

    case "short-hop":
    case "full-hop": {
      const { facing, jumpDistance } = variant as TechVariantOf<typeof techId>;
      switch (jumpDistance) {
        case "0.0":
          return [];
        case "0.5":
          return [dep(techId, { facing, jumpDistance: "0.0" })];
        case "1.0":
          return [dep(techId, { facing, jumpDistance: "0.5" })];
        case "1.5":
          return [dep(techId, { facing, jumpDistance: "1.0" })];
        case "2.0":
          return [dep(techId, { facing, jumpDistance: "1.5" })];
        case "2.5":
          return [dep(techId, { facing, jumpDistance: "2.0" })];
        case "max":
          return [dep(techId, { facing, jumpDistance: "0.0" })];
        default:
          return unreachable(jumpDistance, "jumpDistance check is exhaustive");
      }
    }

    case "fast-fall": {
      const { facing, jumpDistance, hop } = variant as TechVariantOf<
        typeof techId
      >;
      switch (hop) {
        case "short":
          return [dep("short-hop", { facing, jumpDistance })];
        case "full":
          return [dep("full-hop", { facing, jumpDistance })];
        default:
          return unreachable(hop, "hop check is exhaustive");
      }
    }

    // We require *all* jump distances be mastered before adding in falling
    // aerials.
    case "falling-aerial": {
      const { facing, fall, hop } = variant as TechVariantOf<typeof techId>;
      switch (fall) {
        case "normal":
          switch (hop) {
            case "short":
              return [
                dep("short-hop", { facing, jumpDistance: "0.0" }),
                dep("short-hop", { facing, jumpDistance: "0.5" }),
                dep("short-hop", { facing, jumpDistance: "1.0" }),
                dep("short-hop", { facing, jumpDistance: "1.5" }),
                dep("short-hop", { facing, jumpDistance: "2.0" }),
                dep("short-hop", { facing, jumpDistance: "max" }),
              ];
            case "full":
              return [
                dep("full-hop", { facing, jumpDistance: "0.0" }),
                dep("full-hop", { facing, jumpDistance: "0.5" }),
                dep("full-hop", { facing, jumpDistance: "1.0" }),
                dep("full-hop", { facing, jumpDistance: "1.5" }),
                dep("full-hop", { facing, jumpDistance: "2.0" }),
                dep("full-hop", { facing, jumpDistance: "max" }),
              ];
            default:
              return unreachable(hop, "hop check is exhaustive");
          }
        case "fast":
          return [
            dep("fast-fall", { facing, hop, jumpDistance: "0.0" }),
            dep("fast-fall", { facing, hop, jumpDistance: "0.5" }),
            dep("fast-fall", { facing, hop, jumpDistance: "1.0" }),
            dep("fast-fall", { facing, hop, jumpDistance: "1.5" }),
            dep("fast-fall", { facing, hop, jumpDistance: "2.0" }),
            dep("fast-fall", { facing, hop, jumpDistance: "2.5" }),
            dep("fast-fall", { facing, hop, jumpDistance: "max" }),
          ];
        default:
          return unreachable(fall, "fall check is exhaustive.");
      }
    }

    default:
      return unreachable(techId, "techId check is exhaustive");
  }
}
