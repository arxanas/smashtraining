<template>
  <BaseTechDescription>
    <template v-slot:description>
      <p>
        A running tilt is a tilt attack used immediately out of a run (rather
        than a dash-attack). This can be useful if your character's dash attack
        is inappropriate for some reason, such as if its hitbox won't hit, or it
        has too much end-lag.
      </p>

      <p>
        You can do any tilt out of a run. For example, you may opt for a
        down-tilt if it has more range or is safer than a forward-tilt or a dash
        attack.
      </p>
    </template>
    <template v-slot:inputs>
      <p>
        <ControlInputs inputs="R . r a" />: Start running forward. Then release
        all controls and carry out a tilt attack (any direction works).
      </p>
      <p>
        Note that you can buffer a tilt attack out of an initial dash, as long
        as you have released the controls. It will be executed as soon as your
        character finishes their initial dash animation.
      </p>
    </template>
    <template v-slot:exercise>
      <ol>
        <li>Dash forward, then do a running forward-tilt.</li>
        <li>Dash backward, then do a running forward-tilt.</li>
        <li>Repeat.</li>
      </ol>
      <p>
        Consider the rep failed if you do a dash attack instead of a tilt
        attack.
      </p>
    </template>
    <template v-slot:common-mistakes>
      <ul>
        <li>
          <b>Character does dash attack instead of tilt attack</b>: You have not
          released the controls before inputting the tilt attack.
        </li>
      </ul>
    </template>
    <template v-slot:hints>
      This tech is easier to do if you've bound the C-stick to perform tilt
      attacks.
    </template>
  </BaseTechDescription>
</template>

<script lang="ts">
import allTechData from "@/tech/AllTechMetadata";
import Vue from "vue";
import makeTechDataComponent from "./base/MakeTechDataComponent";

const techId = "running-tilt";
export default makeTechDataComponent(techId);
</script>
