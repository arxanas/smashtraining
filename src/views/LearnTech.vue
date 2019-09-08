<template>
  <div>
    <v-card v-if="componentName && !badVariantName">
      <v-card-title>Learn: {{ techData.name }}</v-card-title>
      <v-card-text>
        <component :is="componentName" :variant="variant" />
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
        <div v-if="badVariantName">
          Error: Bad variant '{{ badVariantName }}' for tech '{{
            $route.params.techId
          }}'.
        </div>
        <div v-else>Error: Unknown tech '{{ $route.params.techId }}'.</div>
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
  TechData,
  TechVariants,
  verifyVariantValue,
} from "@/components/tech/BaseTechData";
import Vue from "vue";
import GithubReportIssueBanner from "../components/GithubReportIssueBanner.vue";

export default Vue.extend({
  components: { GithubReportIssueBanner },
  data() {
    const { techId } = this.$route.params;
    const { jumpDistance, aerialType } = this.$route.query;

    const techData = allTechData.get(techId);
    if (techData === undefined) {
      return {
        componentName: null,
        badVariantName: null,
      };
    } else {
      if (!verifyVariantValue(techData, "jumpDistance", jumpDistance)) {
        return {
          componentName: null,
          badVariantName: "jumpDistance",
        };
      } else if (!verifyVariantValue(techData, "aerialType", aerialType)) {
        return {
          componentName: null,
          badVariantName: "aerialType",
        };
      } else {
        return {
          componentName: getTechDataComponentName(techData),
          badVariantName: null,
          techData,
          variant: {
            jumpDistance,
            aerialType,
          },
        };
      }
    }
  },
});
</script>
