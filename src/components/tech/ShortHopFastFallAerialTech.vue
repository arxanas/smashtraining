<template>
  <BaseTechDescription>
    <template v-slot:variant>
      <b>{{ aerialTypePretty }}</b
      >, <b>{{ jumpDistancePretty }}</b>
    </template>
    <template v-slot:description></template>
    <template v-slot:inputs>
      <p>
        <ControlInputs :inputs="controlInputs" />: Jump {{ jumpDirection }},
        then initiate a fast-fall with <ControlInputs inputs="d" />. While
        falling, perform the aerial attack before reaching the ground.
      </p>
      <p>
        The exact timing of the aerial attack depends on your character, as some
        have faster aerials than others. You may have to press input
        <ControlInputs inputs="d" /> before, at the same time, or after the
        aerial attack.
      </p>
    </template>
    <template v-slot:exercise>
      <ol>
        <li>
          Jump {{ jumpDirection }}, fast-fall, and aerial attack at the bottom
          of the jump.
        </li>
        <li v-if="!isInPlaceJump">
          Without turning around, jump backward to the original position,
          fast-fall, and aerial attack at the bottom of the jump.
        </li>
        <li>Repeat</li>
      </ol>
      <p>
        Consider the rep failed if the aerial does not produce a hitbox at the
        very bottom of the jump.
      </p>
      <p>
        To determine where your aerial attack's hitbox is, you should try it
        against a CPU in training mode. But once you understand where it is,
        there is no need to actually make contact with an opponent, as long as
        you can judge your performance.
      </p>
    </template>
    <template v-slot:common-mistakes>
      <ul>
        <li>
          <b>Aerial hits when rising rather than falling</b>: You have inputted
          the aerial attack at the same time as the jump input, which is too
          early. Be sure to issue the jump input and release the jump button
          before inputting the aerial attack.
        </li>
        <li>
          <b>Aerial hits too high</b> (e.g. at head level): You have inputted
          the aerial attack too early.
        </li>
        <li>
          <b>Aerial attack animation appears briefly, but does no damage</b>:
          You have inputted the aerial attack too late, and it was
          auto-cancelled when you hit the ground.
        </li>
        <li>
          <b>Character does wrong type of aerial attack</b> (e.g.
          backward-aerial instead of forward-aerial): You have accidentally
          turned around while jumping back to the original position. Input
          <ControlInputs inputs="sh" /> just before inputting
          <ControlInputs inputs="l" /> to ensure you face the same direction
          while jumping backwards.
        </li>
      </ul>
    </template>
    <template v-slot:hints> </template>
  </BaseTechDescription>
</template>

<script lang="ts">
import allTechData from "@/tech/AllTechMetadata";
import { TechVariants } from "@/tech/TechMetadata";
import Vue from "vue";
import makeTechDataComponent from "./base/MakeTechDataComponent";

export default makeTechDataComponent("short-hop-fast-fall-aerial").extend({
  computed: {
    isInPlaceJump(): boolean {
      return this.getVariant().jumpDistance === "0.0";
    },
    jumpDirection(): string {
      switch (this.getVariant().jumpDistance) {
        case "0.0":
          return "in-place";
        case "0.5":
        case "1.0":
        case "1.5":
        case "2.0":
        case "2.5":
        case "max":
          return `forward ${this.jumpDistancePretty}`;
      }
    },
    controlInputs(): string {
      return `${this.jumpInputs} - d . ${this.aerialInputs}`;
    },
    jumpInputs(): string {
      switch (this.getVariant().jumpDistance) {
        case "0.0":
          return "sh";
        case "0.5":
        case "1.0":
        case "1.5":
        case "2.0":
        case "2.5":
          return "sh r";
        case "max":
          return "sh R";
      }
    },
    aerialInputs(): string {
      switch (this.getVariant().aerialType) {
        case "nair":
          return "a";
        case "fair":
          return "a + r";
        case "bair":
          return "a + l";
        case "uair":
          return "a + u";
        case "dair":
          return "a + d";
      }
    },
  },
});
</script>
