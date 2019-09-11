import BReverseTech from "@/components/tech/BReverseTech.vue";
import RunningTiltTech from "@/components/tech/RunningTiltTech.vue";
import ShortHopFastFallAerialTech from "@/components/tech/ShortHopFastFallAerialTech.vue";
import { VueConstructor } from "vue";
import { TechId } from "./AllTechMetadata";

// Note that these component declarations have to be in a different file than
// the tech metadata itself. That's because they end up depending on the tech
// metadata for rendering. It causes a circular dependency to put them in the
// same place.
const allTechDataComponents: Record<TechId, VueConstructor> = {
  "b-reverse": BReverseTech,
  "running-tilt": RunningTiltTech,
  "short-hop-fast-fall-aerial": ShortHopFastFallAerialTech,
};
export default allTechDataComponents;
