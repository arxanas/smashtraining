import BReverseTech from "@/components/tech-data/BReverseTech.vue";
import RunningTiltTech from "@/components/tech-data/RunningTiltTech.vue";

// Register all tech here. If a tech is not registered here, it may fail to be
// loaded at runtime. I couldn't figure out a way to get Vue to automatically
// load all components in a given directory.
export default { BReverseTech, RunningTiltTech };
