<template>
  <BaseTechDescription>
    <template v-slot:description>
      <p>
        Walking is one of two primary forms of ground-based movement.  It's a slower form
        of movement than <TechLink tech-id="dash">dashing</TechLink>.  Although it isn't the most common form of
        movement, walking can be useful to space yourself precisely.
      </p>

      <p>
        The three intensities of walking speeds depend on how hard you tilt the control stick.
      </p>
    </template>
    <template v-slot:inputs>
      <p>To walk,</p>
      <ul>
        <li>
          <ControlInputs inputs="r" />: Gently tilt the control stick forward.
        </li>
      </ul>
    </template>
    <template v-slot:exercise>
      <ol>
        <li>Walk forward two grid units at your maximum walking speed.</li>
        <li>Walk backward two grid units at your maximum walking speed.</li>
        <li>Repeat.</li>
      </ol>
    </template>
    <template v-slot:common-mistakes>
      <ul>
        <li>
          <b>Character dashes instead of walks</b>: You have tapped the control
          stick too hard, and accidentally inputted
          <ControlInputs inputs="R" /> instead of <ControlInputs inputs="r" />.
        </li>
      </ul>
    </template>
    <template v-slot:video>
      <TechVideo video-id="ta3L35wsE6o" start-time="0:37">
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
