<template>
  <BaseTechDescription>
    <template v-slot:description>
      <p>
        Short-hopping is one of two levels of jumping (the other being
        <TechLink tech-id="full-hop" :variant="variant">full-hopping</TechLink
        >). Short-hopping is a shorter jump than full-hopping, about half the
        height.
      </p>
      <p>
        Short-hopping is
        <strong>arguably the most important single skill to learn</strong>, as
        it enables a huge variety of movement and attack options. It lets you
        travel in short increments quickly and with precision, unlike dashing.
        It also lets you quickly put out aerial attacks close to the ground,
        while remaining relatively safe.
      </p>
    </template>
    <template v-slot:inputs>
      There are multiple ways to input a short-hop:
      <ul>
        <li>
          <ControlInputs inputs="sh ." />: Press the jump button for a very
          short period of time (3 frames). Your character will do a short hop
          and then return to the ground.
        </li>
        <li>
          <ControlInputs inputs="x + y" />: Press <strong>any</strong> two jump
          buttons at the same time. This depends on your control scheme. If you
          prefer this method, you may want to consider adjusting your control
          scheme to use one or two shoulder buttons as jump buttons.
        </li>
        <li>
          <ControlInputs inputs="u" />: Tap the control stick up. You must have
          Stick Jump enabled in your control scheme to do this.
        </li>
      </ul>
    </template>
    <template v-slot:exercise>
      <ol>
        <li>Short-hop {{ jumpDirection }}.</li>
        <li>
          <i>(Non-in-place jumps only.)</i>
          Without turning around, short-hop backward to the original position.
        </li>
        <li>Repeat.</li>
      </ol>
    </template>
    <template v-slot:common-mistakes>
      <ul>
        <li>
          <b>Character full-hops instead of short-hopping</b>: You have held the
          jump button for too long.
        </li>
        <li>
          <b>Character double-jumps</b>: You are using the two-jump-button
          approach to short-hopping, and you pressed one jump button too long
          after the other. They must be pressed at the same time.
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
