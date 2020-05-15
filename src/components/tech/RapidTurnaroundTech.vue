<template>
  <BaseTechDescription>
    <template v-slot:description>
      <p>
        Turning around rapidly is important for fine-grained maneuvers.
        Practicing rapid turnaround lets you prepare for the following
        situations:
      </p>

      <ul>
        <li>Performing tilt attacks (assuming you don't use Tilt Stick).</li>
        <li>Turnaround grabs.</li>
        <li>
          Performing neutral attacks (jabs and neutral-b) in the correct
          direction.
        </li>
        <li>
          Preparing for a backward aerial from a forward-facing position, or
          vice-versa.
        </li>
      </ul>
    </template>
    <template v-slot:inputs>
      <ul>
        <li>
          <ControlInputs inputs="r" />: Gently tilt the control stick forward.
        </li>
      </ul>
      <p>
        Consider the rep failed if your character performs a dash or tilt
        attack.
      </p>
    </template>
    <template v-slot:exercise>
      <ol>
        <li>Turn forwards, then perform a jab.</li>
        <li>Turn backwards, then perform a jab in the other direction.</li>
        <li>Repeat.</li>
      </ol>
      <p>
        Consider the rep failed if you don't turn around successfully, or if you
        dash instead of turn.
      </p>
    </template>
    <template v-slot:common-mistakes>
      <ul>
        <li>
          <b>Character dashes instead of turning around</b>: You have tapped the
          control stick too hard, and accidentally inputted
          <ControlInputs inputs="R" /> instead of <ControlInputs inputs="r" />.
        </li>
        <li>
          <b>Character performs tilt attack instead of turning around</b>: You
          have inputted <ControlInputs inputs="r + a" />, and performed the
          turnaround at the same time as the jab.
        </li>
      </ul>
    </template>
    <template v-slot:video>
      <TechVideo video-id="DrBWKkO9OeU" start-time="7:29">
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
import Component, { mixins } from "vue-class-component";
import BaseTechComponent from "./base/BaseTechComponent";

@Component
export default class extends mixins(BaseTechComponent) {}
</script>
