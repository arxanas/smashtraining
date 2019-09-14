import ControlInputs from "@/components/ControlInputs.vue";
import { AllTechVariants } from "@/tech/TechMetadata";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import BaseTechDescription from "./BaseTechDescription.vue";
import TechLink from "./TechLink.vue";
import TechVideo from "./TechVideo.vue";

@Component({
  components: {
    BaseTechDescription,
    ControlInputs,
    TechLink,
    TechVideo,
  },
})
export default class extends Vue {
  @Prop({ type: Object, required: true })
  protected variant!: AllTechVariants;
}
