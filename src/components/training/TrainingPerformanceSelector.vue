<template>
  <div>
    <v-slider
      v-model="valueInternal"
      @click="onChange"
      @input="onChange"
      ticks="always"
      :tick-size="4"
      :min="1"
      :max="5"
      :step="1"
      :track-color="color"
      :track-fill-color="color"
      :color="color"
      :label="title"
      :messages="hint"
    ></v-slider>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

type State = 1 | 2 | 3 | 4 | 5 | null;

@Component
export default class extends Vue {
  get hint() {
    switch (this.value as State) {
      case null:
        return "";

      case 5:
        return "All or nearly all reps correct";

      case 4:
        return "Most reps correct";

      case 3:
        return "Some reps correct";

      case 2:
        return "Most reps incorrect";

      case 1:
        return "All or nearly all reps incorrect";

      default:
        throw new Error(
          "Expected only six states to be possible: " + this.value,
        );
    }
  }

  // see https://vuetifyjs.com/en/styles/colors#material-colors
  get color() {
    switch (this.value as State) {
      case null:
        return null;

      case 5:
        return "light-green darken-2";

      case 4:
        return "light-green lighten-1";

      case 3:
        return "amber";

      case 2:
        return "deep-orange lighten-2";

      case 1:
        return "deep-orange darken-2";

      default:
        throw new Error(
          "Expected only six states to be possible: " + this.value,
        );
    }
  }
  @Prop({ required: false, default: false })
  public disabled!: boolean;

  public value: State | null = null;

  @Prop({ required: true })
  public title!: string;

  private valueInternal: State = 1;

  public onChange() {
    // If the user hasn't yet interacted with the slider, then we should treat
    // `value` as `null`, not the default slider value (which is `0`).
    this.value = this.valueInternal;
    this.$emit("input", this.value);
  }
}
</script>
