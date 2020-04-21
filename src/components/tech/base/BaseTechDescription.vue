<template>
  <div class="text--primary">
    <h2 id="exercise" class="subtitle-1">
      Exercise
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon small class="mt-n1" v-on="on">mdi-help-circle-outline</v-icon>
        </template>
        <span>Do the following steps for about 30 seconds per set.</span>
      </v-tooltip>
    </h2>
    <slot name="exercise">
      <i>No exercise routine is currently available.</i>
    </slot>

    <h2 id="description" class="subtitle-1 mt-4">Description</h2>
    <slot name="description">
      <i>No description is currently available.</i>
    </slot>

    <h2 id="inputs" class="subtitle-1 mt-4">
      Inputs
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon small class="mt-n1" v-on="on">mdi-help-circle-outline</v-icon>
        </template>
        <span>Try tapping or hovering on the icons for a description.</span>
      </v-tooltip>
    </h2>
    <slot name="inputs">
      <i>No inputs are currently available.</i>
    </slot>

    <h2 id="video" class="subtitle-1 mt-4">Video</h2>
    <slot name="video">
      <i>No video has been provided yet.</i>
    </slot>

    <h2 id="common-mistakes" class="subtitle-1 mt-4">Common mistakes</h2>
    <slot name="common-mistakes">
      <i>No common mistakes are currently available.</i>
    </slot>

    <h2 id="tips" class="subtitle-1 mt-4">Tips</h2>
    <slot name="tips">
      <i>No tips are currently available.</i>
    </slot>
  </div>
</template>
