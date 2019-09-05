<template>
  <v-container>
    <v-card min-width="15em" max-width="30em" class="ma-auto">
      <v-form>
        <v-card-title>
          <v-row no-gutters>
            <v-col v-if="skillShortName">
              <v-tooltip bottom>
                {{ skillName }}
                <template v-slot:activator="{ on }"
                  ><span v-on="on">{{ skillShortName }}</span></template
                >
              </v-tooltip>
            </v-col>
            <v-col v-else>{{ skillName }}</v-col>
            <v-col class="flex-grow-0">
              <v-btn icon><v-icon>mdi-settings</v-icon></v-btn></v-col
            >
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row no-gutters class="py-1" align="center"
            ><v-col class="float-sm-left" cols="3">Inputs</v-col
            ><v-col><ControlInputs :inputs="inputs"/></v-col
          ></v-row>
          <v-row no-gutters class="py-1" align="center">
            <v-col cols="3">Set</v-col>
            <v-col>{{ currentSet }}/{{ numSets }}</v-col>
          </v-row>
          <v-row no-gutters class="py-1" align="center">
            <v-col cols="3">Result</v-col>
            <v-col>
              <v-btn-toggle>
                <v-tooltip
                  top
                  v-for="possibleResult in possibleTrainingResults"
                  v-bind:key="possibleResult.value"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn small v-on="on"
                      ><v-icon>{{ possibleResult.iconName }}</v-icon></v-btn
                    >
                  </template>
                  <span fixed>{{ possibleResult.tooltipText }}</span>
                </v-tooltip>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn color="primary" @click="currentSet++"
            >Record Set {{ currentSet }}</v-btn
          >
          <v-btn text color="error">Skip</v-btn>
          <v-btn text color="info">Learn</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ControlInputs from "./ControlInputs.vue";

interface TrainingResult {
  iconName: string;
  tooltipText: string;
  value: 0 | 1 | 2 | 3 | 4;
}

const possibleTrainingResults: TrainingResult[] = [
  {
    iconName: "mdi-emoticon-cry-outline",
    tooltipText: "Almost all wrong",
    value: 0,
  },
  {
    iconName: "mdi-emoticon-sad-outline",
    tooltipText: "Mostly wrong",
    value: 1,
  },
  {
    iconName: "mdi-emoticon-neutral-outline",
    tooltipText: "Half wrong, half correct",
    value: 2,
  },
  {
    iconName: "mdi-emoticon-outline",
    tooltipText: "Mostly correct",
    value: 3,
  },
  {
    iconName: "mdi-emoticon-excited-outline",
    tooltipText: "Almost all correct",
    value: 4,
  },
];

export default Vue.extend({
  components: { ControlInputs },
  props: {
    skillShortName: {
      type: String,
      required: false,
    },
    skillName: {
      type: String,
      required: true,
    },
    inputs: {
      type: String,
      required: true,
    },
    numSets: {
      type: Number,
      required: true,
    },
  },
  data: () => ({ possibleTrainingResults, currentSet: 1 }),
});
</script>
