<template>
  <BaseTechDescription>
    <template v-slot:description>
      <p>
        A running jab is a jab (neutral attack) that is performed during a dash.
        When doing so, your forward momentum is cancelled as the jab comes out.
      </p>
      <p>
        The usefulness of a running jab varies between characters. However, it's
        useful to learn, as the inputs are a component of advanced techniques
        like attack-cancelling.
      </p>
    </template>
    <template v-slot:inputs>
      <ul>
        <li>
          <ControlInputs inputs="R . a" />: Dash forward. Once dashing, release
          the control stick and then quickly input <ControlInputs inputs="a" />,
          before your character has slowed down. Your forward momentum should be
          immediately cancelled.
        </li>
      </ul>
    </template>
    <template v-slot:exercise>
      <p>
        Select a distance between three and five grid units to dash (choose a
        longer distance for faster characters). Try to land the dash attack at
        the same distance every time.
      </p>
      <ol>
        <li>
          Dash forward the chosen distance and perform a running jab, facing
          forward.
        </li>
        <li>
          Dash backward to the original position and perform a running jab, now
          facing backward.
        </li>
        <li>Repeat.</li>
      </ol>
      <p>
        Consider the rep failed if the running jab comes out closer or farther
        than the chosen distance.
      </p>
    </template>
    <template v-slot:common-mistakes>
      <ul>
        <li>
          <b>Character performs a smash attack instead of a running jab</b>: You
          have inputted <ControlInputs inputs="R + a" />; that is, you dashed
          and attacked simultaneously. You must initiate a dash before inputting
          <ControlInputs inputs="a" />.
        </li>
        <li>
          <b
            >Character performs a
            <TechLink tech-id="dash-attack">dash attack</TechLink> instead of a
            jab</b
          >: You have inputted <ControlInputs inputs="R a" />; that is, you
          haven't released the control stick before tapping
          <ControlInputs inputs="a" />. You must release the control stick
          before inputting <ControlInputs inputs="a" />.
        </li>
      </ul>
    </template>
  </BaseTechDescription>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import BaseTechComponent from "./base/BaseTechComponent";

@Component
export default class extends mixins(BaseTechComponent) {}
</script>
