<template>
  <router-link :to="{ name: 'learn-tech', params: { techId }, query: variant }">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { getTechMetadata } from "@/tech/AllTechMetadata";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({
    type: String,
    required: true,
    validator(value: string): boolean {
      return getTechMetadata(value) !== null;
    },
  })
  private techId!: string;

  @Prop({ type: Object, required: false })
  private variant: object | undefined;
}
</script>
