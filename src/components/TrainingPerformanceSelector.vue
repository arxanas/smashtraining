<template>
  <v-btn icon @click="tap()">
    <v-icon :color="color">{{ icon }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";

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

export default Vue.extend({
  props: {
    value: {
      required: false,
      default: null,
    },
  },
  computed: {
    icon() {
      switch (this.value as State) {
        case null:
          return "mdi-circle-edit-outline";

        case 4:
          return "mdi-emoticon-excited-outline";

        case 3:
          return "mdi-emoticon-outline";

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
    },

    color() {
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
    },
  },
  methods: {
    tap() {
      this.$emit("input", nextState(this.value as State));
    },
  },
});
</script>
