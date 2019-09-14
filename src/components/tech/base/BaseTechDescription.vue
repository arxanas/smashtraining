<template>
  <div class="text--primary">
    <h2 id="description" class="subtitle-1">Description</h2>
    <slot name="description">
      <i>No description is currently available.</i>
    </slot>

    <h2 id="video" class="subtitle-1 mt-4">Video</h2>
    <slot name="video">
      <i>No video has been provided yet.</i>
    </slot>

    <h2 id="inputs" class="subtitle-1 mt-4">Inputs</h2>
    <slot name="inputs">
      <i>No inputs are currently available.</i>
    </slot>

    <h2 id="exercise" class="subtitle-1 mt-4">Exercise</h2>
    <slot name="exercise">
      <i>No exercise routine is currently available.</i>
    </slot>

    <h2 id="common-mistakes" class="subtitle-1 mt-4">Common mistakes</h2>
    <slot name="common-mistakes">
      <i>No common mistakes are currently available.</i>
    </slot>

    <h2 id="hints" class="subtitle-1 mt-4">Hints</h2>
    <slot name="hints">
      <i>No hints are currently available.</i>
    </slot>
  </div>
</template>
<script lang="ts">
import GithubReportIssueBanner from "@/components/GithubReportIssueBanner.vue";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {
    GithubReportIssueBanner,
  },
})
export default class extends Vue {}
</script>
