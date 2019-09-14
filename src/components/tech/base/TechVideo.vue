<template>
  <div>
    <p>
      <slot />
      <span v-if="startTime"
        >The relevant segment begins at <b>{{ startTime }}</b
        >.</span
      >
    </p>
    <div class="embed-container">
      <iframe
        width="560"
        height="315"
        :src="src"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style>
/* From https://embedresponsively.com/, MIT-licensed. */
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: String, required: true })
  public videoId!: string;

  @Prop({ type: String, required: false })
  public startTime: string | undefined;

  get src(): string {
    // I tried to use `https://youtube-nocookie.com` -- which is apparently the
    // legitimate "privacy-enhanced" mode in the embed widget on YouTube -- but
    // it failed with an HSTS error. Maybe one day!
    const baseUrl = "https://youtube.com";

    if (this.startTime !== undefined) {
      const [minutes, seconds] = this.startTime.split(":");
      const startSeconds = 60 * parseInt(minutes, 10) + parseInt(seconds, 10);
      return `${baseUrl}/embed/${this.videoId}?start=${startSeconds}`;
    } else {
      return `${baseUrl}/embed/${this.videoId}`;
    }
  }
}
</script>
