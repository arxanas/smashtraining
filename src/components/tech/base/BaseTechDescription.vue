<template>
  <v-container id="top">
    <v-row>
      <v-col class="ma-0">
        <v-card
          style="border-bottom-left-radius: 0; border-bottom-right-radius: 0"
        >
          <v-card-title id="exercise">
            Exercise
          </v-card-title>
          <v-card-text>
            <slot name="exercise">
              <i>No exercise routine is currently available.</i>
            </slot>
          </v-card-text>
          <v-divider />
          <v-banner icon="mdi-information" class="banner-text">
            Go to <b>Games &amp; More</b> › <b>Training</b> and select the
            "Training" stage.
          </v-banner>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title id="inputs">
            Inputs
          </v-card-title>
          <v-card-text>
            <slot name="inputs">
              <i>No inputs are currently available.</i>
            </slot>
          </v-card-text>
          <v-divider />
          <v-banner icon="mdi-information" class="banner-text">
            Tap or hover on an input icon like <ControlInputs inputs="r" /> to
            see its description.
          </v-banner>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title id="description">
            Description
          </v-card-title>
          <v-card-text>
            <slot name="description">
              <i>No description is currently available.</i>
            </slot>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title id="common-mistakes">
            Common mistakes
          </v-card-title>
          <v-card-text>
            <slot name="common-mistakes">
              <i>No common mistakes are currently available.</i>
            </slot>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title id="tips">
            Tips
          </v-card-title>
          <v-card-text>
            <slot name="tips">
              <i>No tips are currently available.</i>
            </slot>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title id="video">Video</v-card-title>
          <v-card-text>
            <slot name="video">
              <i>No video has been provided yet.</i>
            </slot>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.v-card__text p:last-child {
  margin-bottom: 0px;
}
</style>

<style scoped>
.banner-text {
  font-size: 0.75em;
  color: rgba(0, 0, 0, 0.6);
}
</style>

<script lang="ts">
import ControlInputs from "@/components/ControlInputs.vue";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: { ControlInputs },
})
export default class extends Vue {}
</script>
