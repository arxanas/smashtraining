<template>
  <span>
    <v-tooltip top v-for="(input, i) in this.inputIcons" v-bind:key="i">
      <template v-slot:activator="{ on }">
        <v-icon :small="input.small" v-on="on">
          {{ input.iconName }}
        </v-icon>
      </template>
      <span>{{ input.description }}</span>
    </v-tooltip>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

interface InputInfo {
  iconName: string;
  description: string;
  small?: boolean;
}

function inputToIconName(input: string): InputInfo {
  switch (input) {
    case "l":
      return {
        iconName: "mdi-arrow-left-drop-circle",
        description: "Gently tilt backward",
      };
    case "L":
      return {
        iconName: "mdi-arrow-left-bold-circle",
        description: "Hard tap backward",
      };

    case "r":
      return {
        iconName: "mdi-arrow-right-drop-circle",
        description: "Gently tilt forward",
      };
    case "R":
      return {
        iconName: "mdi-arrow-right-bold-circle",
        description: "Hard tap forward",
      };

    case "d":
      return {
        iconName: "mdi-arrow-down-drop-circle",
        description: "Gently tap down",
      };
    case "D":
      return {
        iconName: "mdi-arrow-down-bold-circle",
        description: "Hard tap down",
      };

    case "u":
      return {
        iconName: "mdi-arrow-up-drop-circle",
        description: "Gently tap up",
      };
    case "U":
      return {
        iconName: "mdi-arrow-up-bold-circle",
        description: "Hard tap up",
      };

    case "sh":
      return {
        iconName: "mdi-upload",
        description: "Short-hop",
      };
    case "fh":
      return {
        iconName: "mdi-upload-multiple",
        description: "Full hop",
      };

    case "a":
      return {
        iconName: "mdi-alpha-a-circle",
        description: "Press A",
      };
    case "b":
      return {
        iconName: "mdi-alpha-b-circle",
        description: "Press B",
      };
    case "x":
      return {
        iconName: "mdi-alpha-x-circle",
        description: "Press X",
      };
    case "y":
      return {
        iconName: "mdi-alpha-y-circle",
        description: "Press Y",
      };
    case "z":
      return {
        iconName: "mdi-alpha-z-circle",
        description: "Press Z",
      };

    case ".":
      return {
        iconName: "mdi-circle-medium",
        description: "Release controls",
      };
    case "-":
      return {
        iconName: "mdi-dots-horizontal",
        description: "Slight pause",
      };
    case "+":
      return {
        iconName: "mdi-plus",
        description: "Simultaneous input",
        small: true,
      };

    default:
      throw new Error("Unknown control input type: " + input);
  }
}

@Component
export default class extends Vue {
  @Prop({ type: String, required: true })
  public inputs!: string;

  get inputIcons(): InputInfo[] {
    return this.inputs.split(" ").map(inputToIconName);
  }
}
</script>
