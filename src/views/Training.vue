<template>
  <div>
    <TrainingHeader />
    <h1 class="headline mt-4 mb-2">Exercises</h1>
    <v-expansion-panels multiple :value="[0]">
      <TrainingPanel
        game="ssbu"
        tech-id="short-hop-fast-fall-aerial"
        :variant="{ jumpDistance: '1.0', aerialType: 'fair' }"
        :num-sets="3"
      />
      <TrainingPanel game="ssbu" tech-id="b-reverse" :num-sets="3" />
      <TrainingPanel game="ssbu" tech-id="running-tilt" :num-sets="3" />
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
