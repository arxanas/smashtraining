<template>
  <BaseTechDescription>
    <template v-slot:description>
      A dash attack is an attack that can be initiated while
      <TechLink tech-id="dash">dashing</TechLink>. It typically has a greater
      range than other grounded attacks due to the forward momentum of dashing.
    </template>
    <template v-slot:inputs>
      <ul>
        <li>
          <ControlInputs inputs="R a" />: Dash forward. While holding the
          control stick, tap <ControlInputs inputs="a" />.
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
          Dash forward the chosen distance and perform a dash attack, facing
          forward.
        </li>
        <li>
          Dash backward to the original position and perform a dash attack, now
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
          <b>Character performs a smash attack instead of a dash attack</b>: You
          have inputted <ControlInputs inputs="R + a" />; that is, you dashed
          and attacked simultaneously. You must initiate a dash before inputting
          <ControlInputs inputs="a" />.
        </li>
        <li>
          <b>Character performs a jab instead of a dash attack</b>: You have
          inputted <ControlInputs inputs="R . a" />; that is, you have released
          the control stick before tapping <ControlInputs inputs="a" />. You
          must remain dashing when inputting <ControlInputs inputs="a" />.
          (<TechLink tech-id="running-jab">Running jab</TechLink> is a different
          technique.)
        </li>
      </ul>
    </template>
    <template v-slot:video>
      <TechVideo video-id="ta3L35wsE6o" start-time="5:39">
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
