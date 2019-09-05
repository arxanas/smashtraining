<template>
  <BaseCard>
    <v-card-text>
      <p>
        For each set, complete about 30 seconds worth of reps. Then take a short
        break, or start a set of a different exercise.
      </p>
      <p>Complete or skip one of the above exercises to reveal a new one.</p>
      <p>Guide:</p>
      <ul>
        <li>
          <v-icon>mdi-emoticon-excited-outline</v-icon> All or almost all reps
          completed correctly.
        </li>
        <li>
          <v-icon>mdi-emoticon-outline</v-icon> Most reps completed correctly.
        </li>
        <li>
          <v-icon>mdi-emoticon-neutral-outline</v-icon> Some reps completed
          correctly.
        </li>
        <li><v-icon>mdi-emoticon-sad-outline</v-icon> Most reps failed.</li>
        <li>
          <v-icon>mdi-emoticon-cry-outline</v-icon> All or almost all reps
          failed.
        </li>
      </ul>
    </v-card-text>
  </BaseCard>
</template>

<script lang="ts">
import Vue from "vue";
import BaseCard from "./BaseCard.vue";
export default Vue.extend({
  components: { BaseCard },
});
</script>
