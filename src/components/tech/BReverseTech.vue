<template>
  <BaseTechDescription>
    <template v-slot:description>
      B-reversing is a technique which allows you to reverse your horizontal
      momentum in mid-air while carrying out your neutral special attack. The
      attack is reversed in direction, hence "b-reverse". This can be useful to
      improve your air mobility and mix up your attacks.
    </template>
    <template v-slot:inputs>
      <ControlInputs inputs="fh R . b - L" />: Jump with horizontal momentum
      forward (e.g. by running). Then release all controls, and press
      <ControlInputs inputs="b" /> in mid-air. Within 3 frames, tap backward.
      The direction of your neutral special attack should reverse and now face
      backwards, and your character should be traveling backwards in the air.
    </template>
    <template v-slot:exercise>
      <ol>
        <li>Face forward, jump forward, and carry out a B-reverse.</li>
        <li>
          You should be facing backwards now. Jump backwards and carry out a
          B-reverse, returning to roughly your original position, facing forward
          again.
        </li>
        <li>Repeat.</li>
      </ol>
      <p>
        Consider the rep failed if either B-reverse fail to reverse your
        momentum in mid-air.
      </p>
    </template>
    <template v-slot:common-mistakes>
      <ul>
        <li>
          <b
            >Character does backward side-special and maintains forward
            momentum</b
          >: You have pressed <ControlInputs inputs="L" /> at the same time as
          <ControlInputs inputs="b" />. The <ControlInputs inputs="L" /> input
          must come slightly after the <ControlInputs inputs="b" /> input.
        </li>
        <li>
          <b
            >Character does neutral side-special and maintains forward
            momentum</b
          >: You have pressed <ControlInputs inputs="L" /> too long after
          <ControlInputs inputs="b" /> — the timing is tight.
        </li>
      </ul>
    </template>
    <template v-slot:video>
      <TechVideo video-id="Fdf0P3UVh90" start-time="4:58">
        From IzAw's
        <i
          ><a
            href="https://www.youtube.com/playlist?list=PL4SzCzeORbSRRI72fLpdCCDI-SZIwqFyJ"
            >Art of Smash Ultimate</a
          ></i
        >
        series.
      </TechVideo>
    </template>
  </BaseTechDescription>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseTechComponent from "./base/BaseTechComponent";

@Component
export default class extends BaseTechComponent {}
</script>
