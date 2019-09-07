<template>
  <div>
    <TrainingHeader />
    <h1 class="headline mt-4 mb-2">Exercises</h1>
    <v-expansion-panels multiple :value="[0]">
      <TrainingPanel
        game="ssbu"
        tech-id="sh-ff-fair"
        tech-name="Short-hop fast-fall forward-aerial"
        :num-sets="3"
      />
      <TrainingPanel
        game="ssbu"
        tech-id="b-reverse"
        tech-name="B-reverse"
        :num-sets="3"
      />
      <TrainingPanel
        game="ssbu"
        tech-id="running-tilt"
        tech-name="Running tilt"
        :num-sets="3"
      />
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TrainingHeader from "../components/training/TrainingHeader.vue";
import TrainingPanel from "../components/training/TrainingPanel.vue";

export default Vue.extend({
  name: "training",
  components: { TrainingHeader, TrainingPanel },
});
</script>
