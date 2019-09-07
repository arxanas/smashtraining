<template>
  <div>
    <v-card v-if="componentName">
      <v-card-title>Learn: {{ techName }}</v-card-title>
      <v-card-text>
        <component :is="componentName" />
      </v-card-text>
      <v-divider />
      <GithubReportIssueBanner>
        Can you help improve this information?
      </GithubReportIssueBanner>
    </v-card>
    <v-card v-else>
      <v-card-title>
        Tech not found
      </v-card-title>
      <v-card-text class="text--primary">
        Error: Unknown tech '{{ $route.params.techId }}'.
      </v-card-text>
      <v-divider />
      <GithubReportIssueBanner>
        Is this tech missing documentation?
      </GithubReportIssueBanner>
    </v-card>
  </div>
</template>

<script lang="ts">
import "@/components/tech/AllTechData";
import {
  allTechData,
  getTechDataComponentName,
} from "@/components/tech/BaseTechData";
import Vue from "vue";
import GithubReportIssueBanner from "../components/GithubReportIssueBanner.vue";

export default Vue.extend({
  components: { GithubReportIssueBanner },
  data() {
    const { techId } = this.$route.params;
    const techData = allTechData.get(techId);
    if (techData === undefined) {
      return {
        componentName: null,
      };
    } else {
      return {
        techName: techData.name,
        componentName: getTechDataComponentName(techData),
      };
    }
  },
});
</script>
