<template>
  <BaseTechDescription>
    <template v-slot:description>
      <p>
        A running neutral aerial is a neutral aerial that is performed while
        your character has forward or backward momentum from dashing.
      </p>
      <p>
        Being able to perform a neutral aerial with momentum is quite important
        for many characters' toolkits, since neutral aerials are typically fast
        and surround the character with a hitbox.
      </p>
    </template>
    <template v-slot:inputs>
      <ul>
        <li>
          <ControlInputs inputs="R . sh + a . R" />: Run forward. Then input a
          short-hop neutral aerial by pressing
          <ControlInputs inputs="sh + a" /> simultaneously. Immediately
          afterwards, release the controls and continue holding forward, so that
          you retain your forward momentum.
        </li>
      </ul>
    </template>
    <template v-slot:exercise>
      <ol>
        <li>
          Run forward a few grid units. While running forward, perform a neutral
          aerial.
        </li>
        <li>
          Run back to the starting position. While running back, perform a
          neutral aerial.
        </li>
        <li>Repeat.</li>
      </ol>
      Consider the rep failed if you perform the wrong type of aerial, or if you
      lose momentum while performing the neutral aerial.
    </template>
    <template v-slot:common-mistakes>
      <ul>
        <li>
          <b>Character performs forward aerial instead of neutral aerial</b>:
          You have not released the control stick while jumping, and
          accidentally inputted <ControlInputs inputs="R + sh + a" />.
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
