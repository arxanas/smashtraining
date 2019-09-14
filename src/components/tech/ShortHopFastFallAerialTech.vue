<template>
  <BaseTechDescription>
    <template v-slot:description></template>
    <template v-slot:inputs>
      <p>
        <ControlInputs :inputs="controlInputs" />: Short-hop
        {{ jumpDirection }}, then initiate a fast-fall with
        <ControlInputs inputs="d" />. While falling, perform the aerial attack
        before reaching the ground.
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
          Short-hop {{ jumpDirection }}, fast-fall, and aerial attack at the
          bottom of the jump.
        </li>
        <li>
          <i>(Non-in-place jumps only.)</i>
          Without turning around, short-hop backward to the original position,
          fast-fall, and aerial attack at the bottom of the jump.
        </li>
        <li>Repeat.</li>
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
import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import BaseTechComponent from "./base/BaseTechComponent";
import JumpDistanceVariantMixin from "./base/JumpDistanceVariantMixin";

@Component
export default class extends mixins(
  BaseTechComponent,
  JumpDistanceVariantMixin,
) {
  get controlInputs(): string {
    return `${this.jumpInputs} - d . ${this.aerialInputs}`;
  }

  get aerialInputs(): string {
    switch (this.variant.aerialType) {
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
  }
}
</script>
