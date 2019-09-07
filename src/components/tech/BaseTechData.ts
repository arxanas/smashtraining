import ControlInputs from "@/components/ControlInputs.vue";
import Vue from "vue";
import BaseTech from "./BaseTech.vue";
import TechVideo from "./TechVideo.vue";

type Game = "ssbu";

interface TechData {
  id: string;
  name: string;
  games: Game[];
}

export const allTechData: Map<string, TechData> = new Map();

/**
 * Get the name of the component corresponding to a given tech. This can then
 * be rendered as a tag.
 */
export function getTechDataComponentName(techData: TechData): string {
  return `tech-${techData.id}`;
}

/**
 * Register metadata about a tech in the global tech index.
 */
export function makeTechDataComponent(data: TechData): typeof Vue {
  allTechData.set(data.id, data);
  return Vue.component(getTechDataComponentName(data), {
    components: { BaseTech, ControlInputs, TechVideo },
  });
}
