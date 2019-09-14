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

export default Vue.extend({
  props: {
    videoId: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: false,
    },
  },
  data() {
    // I tried to use `https://youtube-nocookie.com` -- which is apparently the
    // legitimate "privacy-enhanced" mode in the embed widget on YouTube -- but
    // it failed with an HSTS error. Maybe one day!
    const baseUrl = "https://youtube.com";

    if (this.startTime !== undefined) {
      const [minutes, seconds] = this.startTime.split(":");
      const startSeconds = 60 * parseInt(minutes, 10) + parseInt(seconds, 10);
      return {
        src: `${baseUrl}/embed/${this.videoId}?start=${startSeconds}`,
      };
    } else {
      return {
        src: `${baseUrl}/embed/${this.videoId}`,
      };
    }
  },
});
</script>
