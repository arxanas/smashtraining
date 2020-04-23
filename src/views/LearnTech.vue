<template>
  <div>
    <div v-if="component && !badVariantName">
      <h1 class="headline mt-0 mb-n2">Learn: {{ techMetadata.name }}</h1>
      <component :is="component" :variant="variant" />
      <v-divider />
      <GithubReportIssueBanner>
        Can you help improve this information?
      </GithubReportIssueBanner>
    </div>
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
      <GithubReportIssueBanner>
        Is this tech missing documentation?
      </GithubReportIssueBanner>
    </v-card>
  </div>
</template>

<script lang="ts">
import GithubReportIssueBanner from "@/components/GithubReportIssueBanner.vue";
import allTechDataDescriptions from "@/tech/AllTechDataDescriptions";
import { getTechMetadata, TechId } from "@/tech/AllTechMetadata";
import { verifyVariantValue } from "@/tech/TechMetadata";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {
    GithubReportIssueBanner,
    ...allTechDataDescriptions,
  },
})
export default class extends Vue {
  public data() {
    const { techId } = this.$route.params;
    const { jumpDistance, aerialType } = this.$route.query;

    const techData = getTechMetadata(techId);
    if (techData === null) {
      return {
        component: null,
        badVariantName: null,
      };
    } else {
      const techMetadata = techData.metadata;
      if (!verifyVariantValue(techMetadata, "jumpDistance", jumpDistance)) {
        return {
          component: null,
          badVariantName: "jumpDistance",
        };
      } else if (!verifyVariantValue(techMetadata, "aerialType", aerialType)) {
        return {
          component: null,
          badVariantName: "aerialType",
        };
      } else {
        return {
          component: allTechDataDescriptions[techData.techId],
          badVariantName: null,
          techMetadata,
          variant: {
            jumpDistance,
            aerialType,
          },
        };
      }
    }
  }
}
</script>
