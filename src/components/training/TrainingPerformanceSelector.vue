<template>
  <v-btn :color="color" icon @click="tap()">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

type State = 0 | 1 | 2 | 3 | 4 | null;

function nextState(currentState: State): State {
  switch (currentState) {
    case null:
      return 4;
    case 4:
      return 3;
    case 3:
      return 2;
    case 2:
      return 1;
    case 1:
      return 0;
    case 0:
      return null;
    default:
      throw new Error("Expected only six states to be possible");
  }
}

@Component
export default class extends Vue {
  @Prop({ required: false, default: false })
  public disabled!: boolean;

  @Prop({ required: false, default: null })
  public value!: boolean | null;

  get icon() {
    switch (this.value as State) {
      case null:
        return "mdi-circle-edit-outline";

      case 4:
        return "mdi-emoticon-excited-outline";

      case 3:
        return "mdi-emoticon-happy-outline";

      case 2:
        return "mdi-emoticon-neutral-outline";

      case 1:
        return "mdi-emoticon-sad-outline";

      case 0:
        return "mdi-emoticon-cry-outline";

      default:
        throw new Error(
          "Expected only six states to be possible: " + this.value,
        );
    }
  }

  get color() {
    // see https://vuetifyjs.com/en/styles/colors#material-colors
    switch (this.value as State) {
      case null:
        return null;

      case 4:
        return "light-green";

      case 3:
        return "light-green darken-2";

      case 2:
        return "amber";

      case 1:
        return "deep-orange lighten-2";

      case 0:
        return "deep-orange darken-2";

      default:
        throw new Error(
          "Expected only six states to be possible: " + this.value,
        );
    }
  }

  public tap(): void {
    this.$emit("input", nextState(this.value as State));
  }
}
</script>
