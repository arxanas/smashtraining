<template>
  <BaseTechDescription>
    <template v-slot:description>
      <p>
        Dashing is one of two primary forms of ground-based movement (the other
        being <TechLink tech-id="walk">walking</TechLink>). Dashing is much
        faster than walking, so it's more commonly used.
      </p>

      <p>
        Turning around during a dash will play the <i>turnaround animation</i>,
        which slows the character down and should be avoided by returning the
        control stick to neutral before inputting the other direction.
      </p>

      <p>
        When inputting a dash, your character first enters the
        <i>initial-dash</i> state. After a period of time, they transition into
        the <i>running state</i>. Characters have different speeds for initial
        dancing and running, so it may be beneficial for some characters to
        input repeated initial-dashes rather than run an extended distance
        (called <i>foxtrotting</i>).
      </p>
    </template>

    <template v-slot:inputs>
      <ul>
        <li>
          <ControlInputs inputs="R" />: To dash, firmly tap the control stick
          forward.
        </li>
        <li>
          <ControlInputs inputs="R . L" />: To perform an
          <b>instant turnaround</b> and avoid the turnaround animation, return
          the control stick to neutral before changing direction.
        </li>
      </ul>
    </template>

    <template v-slot:exercise>
      <ol>
        <li>Dash forward three grid units.</li>
        <li>
          Perform an <b>instant turnaround</b> and dash back to the starting
          position.
        </li>
        <li>Repeat.</li>
      </ol>
    </template>

    <template v-slot:common-mistakes>
      <ul>
        <li>
          <b>Character walks instead of dashes</b>: You have not flicked the
          control stick firmly enough.
        </li>
        <li>
          <b>Character undergoes the dash turnaround animation</b>: You have not
          returned the control stick to neutral before turning around. That is,
          you have inputted <ControlInputs inputs="R L" /> instead of
          <ControlInputs inputs="R . L" />.
        </li>
      </ul>
    </template>

    <template v-slot:video>
      <TechVideo video-id="ta3L35wsE6o" start-time="0:30">
        On <b>dashing</b>, from IzAw's
        <i
          ><a
            href="https://www.youtube.com/playlist?list=PL4SzCzeORbSRRI72fLpdCCDI-SZIwqFyJ"
            >Art of Smash Ultimate</a
          ></i
        >
        series.
      </TechVideo>
      <br />
      <TechVideo video-id="ta3L35wsE6o" start-time="0:53">
        On <b>instant turnaround</b>, from IzAw's
        <i
          ><a
            href="https://www.youtube.com/playlist?list=PL4SzCzeORbSRRI72fLpdCCDI-SZIwqFyJ"
            >Art of Smash Ultimate</a
          ></i
        >
        series.
      </TechVideo>
    </template>

    <template v-slot:tips>
      <p>
        If you're having trouble with instant turnaround, try slowing down and
        coming to a complete stop before dashing in the other direction. Then
        work on improving your speed from there.
      </p>
    </template>
  </BaseTechDescription>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import BaseTechComponent from "./base/BaseTechComponent";

@Component
export default class extends mixins(BaseTechComponent) {}
</script>
