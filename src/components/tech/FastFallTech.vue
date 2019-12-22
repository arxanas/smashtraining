<template>
  <BaseTechDescription>
    <template v-slot:description>
      <p>
        Fast-fall hops are a refinement of regular
        <TechLink tech-id="short-hop" :variant="variant">short-hops</TechLink>
        and
        <TechLink tech-id="full-hop" :variant="variant">full-hops</TechLink>. By
        tapping down at the peak of your jump, you can fall faster than normal.
      </p>
      <p>
        You're less vulnerable when you minimize the amount of time you spend in
        the air. Once back on the ground, you can shield, roll, do a grounded
        attack, or jump again (possibly with an aerial attack).
      </p>
      <p>
        When you fast-fall while doing an aerial attack, the attack may be
        cancelled early, since you can move immediately upon reaching the
        ground. This makes aerials much safer than other forms of attacks, but
        you'll need to.
      </p>
      <p>
        This exercise has you practice hopping various distances while
        fast-falling. Smash is a game that takes place primarily in the air, so
        it's important to be able to space yourself very precisely when jumping.
      </p>
    </template>
    <template v-slot:inputs>
      <p>
        <ControlInputs :inputs="controlInputs" />: Hop {{ jumpDirection }}, then
        initiate a fast-fall with <ControlInputs inputs="d" />.
      </p>
    </template>
    <template v-slot:exercise>
      <ol>
        <li>Hop {{ jumpDirection }} and fast-fall.</li>
        <li>
          <i>(Non-in-place jumps only.)</i>
          Without turning around, hop backward to the original position and
          fast-fall.
        </li>
        <li>Repeat.</li>
      </ol>
      <p>
        Consider the rep failed if you turn around, fail to fast-fall, or if you
        under- or overshoot the desired hopping distance.
      </p>
    </template>
    <template v-slot:common-mistakes>
      <ul>
        <li>
          <b>Character does not fast-fall</b>: You have inputted
          <ControlInputs inputs="d" /> too early.
        </li>
        <li>
          <b>Character turns around when hopping back to original position</b>:
          You pressed <ControlInputs inputs="l" /> just before you jumped. Try
          pressing it slightly after you do the jump input.
        </li>
      </ul>
    </template>
    <template v-slot:hints>
      <p>
        To hop forward a certain distance, try aiming to cover about 3/4ths of
        the distance on the way up, and about 1/4th of the distance on the way
        down. (The specific proportions may depend on your character.)
      </p>
    </template>
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
    return `${this.jumpInputs} - d`;
  }
}
</script>
