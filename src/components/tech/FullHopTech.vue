<template>
  <BaseTechDescription>
    <template v-slot:description>
      <p>
        Full-hopping is one of two levels of jumping (the other being
        <TechLink tech-id="short-hop" :variant="variant">short-hopping</TechLink
        >). Full-hopping is a taller jump than full-hopping, about twice the
        height.
      </p>
      <p>
        This exercise has you practice full-hopping various distances. Smash is
        a game that takes place primarily in the air, so it's important to be
        able to space yourself very precisely when jumping.
      </p>
    </template>
    <template v-slot:inputs>
      <ul>
        <li>
          <ControlInputs inputs="fh" />: Hold the jump button for longer than 3
          frames. Your character will do a full hop and then return to the
          ground.
        </li>
        <li>
          <ControlInputs inputs="U" />: Press the control stick up for longer
          than 3 frames. You must have Stick Jump enabled in your control scheme
          to do this.
        </li>
      </ul>
    </template>
    <template v-slot:exercise>
      <ol>
        <li>Full-hop {{ jumpDirection }}.</li>
        <li>
          <i>(Non-in-place jumps only.)</i>
          Without turning around, full-hop backward to the original position.
        </li>
        <li>Repeat.</li>
      </ol>
    </template>
    <template v-slot:common-mistakes>
      <ul>
        <li>
          <b>Character short-hops instead of full-hopping</b>: You have not held
          the jump button for long enough.
        </li>
        <li>
          <b>Character turns around when hopping back to original position</b>:
          You pressed <ControlInputs inputs="l" /> just before you jumped. Try
          pressing it slightly after you do the jump input.
        </li>
      </ul>
    </template>
    <template v-slot:video>
      <TechVideo video-id="ta3L35wsE6o" start-time="1:43">
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
import JumpDistanceVariantMixin from "./base/JumpDistanceVariantMixin";

@Component
export default class extends mixins(
  BaseTechComponent,
  JumpDistanceVariantMixin,
) {}
</script>
