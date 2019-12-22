import BReverseTech from "@/components/tech/BReverseTech.vue";
import FallingAerialTech from "@/components/tech/FallingAerialTech.vue";
import FastFallTech from "@/components/tech/FastFallTech.vue";
import FullHopTech from "@/components/tech/FullHopTech.vue";
import RunningTiltTech from "@/components/tech/RunningTiltTech.vue";
import ShortHopTech from "@/components/tech/ShortHopTech.vue";
import { VueConstructor } from "vue";
import { TechId } from "./AllTechMetadata";

// Note that these component declarations have to be in a different file than
// the tech metadata itself. That's because they end up depending on the tech
// metadata for rendering. It causes a circular dependency to put them in the
// same place.
const allTechDataComponents: Record<TechId, VueConstructor> = {
  "b-reverse": BReverseTech,
  "full-hop": FullHopTech,
  "running-tilt": RunningTiltTech,
  "short-hop": ShortHopTech,
  "fast-fall": FastFallTech,
  "falling-aerial": FallingAerialTech,
};
export default allTechDataComponents;
