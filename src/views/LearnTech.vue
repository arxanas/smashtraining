<template>
  <v-container>
    <BaseCard>
      <v-card-title>Learn tech</v-card-title>
      <v-card-text
        >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt ex,
        rem tenetur possimus, illum deleniti fuga architecto officia sit maiores
        sequi similique et exercitationem repellendus impedit excepturi, dolor
        nemo neque.</v-card-text
      >
    </BaseCard>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import BaseCard from "../components/BaseCard.vue";

export default Vue.extend({
  components: { BaseCard },
});
</script>
