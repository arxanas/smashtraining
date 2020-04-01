<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>GSP Tracker</v-card-title>
          <v-card-text>
            <canvas ref="chart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Add entry</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <CharacterSelector gameId="ssbu" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    label="GSP"
                    placeholder="GSP, ex. 1000000"
                    required
                    :rules="gspValueRules"
                    v-model="gsp"
                  />
                </v-col>
                <v-col cols="4">
                  <v-btn color="primary" @click="recordGspDatum"
                    >Add entry</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import CharacterSelector from "@/components/training/CharacterSelector.vue";
import {
  commitRecordGspDatum,
  RawGspDatum,
  readRawGspData,
  readRecordedPracticeSets,
  readSelectedCharacters,
} from "@/store";
import { dispatchSaveState } from "@/store";
import { GameAndCharacterId, GameId } from "@/tech/AllCharacterMetadata";
import { assert } from "@/utils";
import Chart, { ChartDataSets, ChartOptions } from "chart.js";
import Vue from "vue";
import Component from "vue-class-component";
import { ELITE_GSP_DATA } from "../gsp/EliteGspData";
import { calculatePercentile } from "../gsp/Gsp";

interface GspDatum extends RawGspDatum {
  percentile: number;
}

@Component({
  name: "gsp-tracker",
  components: {
    CharacterSelector,
  },
})
export default class extends Vue {
  private gsp!: string | null;
  private gameId: GameId = "ssbu";

  public data() {
    return {
      gsp: null,
    };
  }

  public mounted() {
    this.$watch(
      function() {
        const gameId = this.gameId;
        const characterId = readSelectedCharacters(this.$store)[gameId];
        if (characterId === null) {
          return [];
        }

        const rawGspData = readRawGspData(this.$store) || {};
        const gameData = rawGspData[gameId] || {};
        const characterData = gameData[characterId] || [];
        return characterData;
      },
      async function(rawDataset) {
        const gspDataset = this.getGspDataset(rawDataset);
        const percentileDataset = this.getPercentileDataset(rawDataset);
        const ctx = this.$refs.chart as HTMLCanvasElement;
        return new Chart(ctx, {
          type: "line",
          data: {
            datasets: [gspDataset, percentileDataset],
          },
          options: this.chartOptions,
        });
      },
      { immediate: true },
    );
  }

  public getGspDataset(rawDataset: RawGspDatum[]): ChartDataSets {
    return {
      borderColor: "black",
      label: "GSP",
      yAxisID: "gsp-axis",
      data: rawDataset.map(datum => ({
        x: new Date(datum.timestamp),
        y: datum.gsp,
      })),
      fill: false,
      pointBackgroundColor: "black",
      cubicInterpolationMode: "monotone",
    };
  }

  public getPercentileDataset(rawDataset: RawGspDatum[]): ChartDataSets {
    const eliteGspData = ELITE_GSP_DATA;
    return {
      borderColor: "blue",
      label: "Percentile",
      yAxisID: "percentile-axis",
      data: rawDataset.map(datum => ({
        x: new Date(datum.timestamp),
        y: calculatePercentile(eliteGspData, datum.gsp, datum.timestamp),
      })),
      fill: false,
      pointBackgroundColor: "black",
      cubicInterpolationMode: "monotone",
    };
  }

  get chartOptions(): ChartOptions {
    return {
      scales: {
        xAxes: [
          {
            type: "time",
          },
        ],
        yAxes: [
          {
            id: "gsp-axis",
            ticks: {
              callback(value, index, values) {
                const valueNum = value as number;
                if (valueNum >= 1e6) {
                  return valueNum / 1e6 + "M";
                } else {
                  return valueNum / 1e3 + "k";
                }
              },
            },
          },
          {
            id: "percentile-axis",
            position: "right",
            ticks: {
              callback(value, index, values) {
                return `${value}%`;
              },
            },
          },
        ],
      },
    };
  }

  get gspValueRules() {
    return [(v: string) => /^[0-9]+$/.test(v) || "Invalid GSP value"];
  }

  get gspValue(): number | null {
    if (this.gsp !== null && /^[0-9]+$/.test(this.gsp)) {
      return parseInt(this.gsp, 10);
    } else {
      return null;
    }
  }

  public async recordGspDatum(): Promise<void> {
    const characterId = readSelectedCharacters(this.$store).ssbu;
    if (characterId === null) {
      alert("Select a character before recording GSP.");
      return;
    }

    if (this.gspValue === null) {
      alert("Invalid GSP value.");
      return;
    }

    commitRecordGspDatum(this.$store, {
      gameAndCharacterId: {
        gameId: "ssbu",
        characterId,
      },
      gspDatum: {
        timestamp: new Date().getTime(),
        gsp: this.gspValue,
      },
    });
    alert("GSP saved.");
    await dispatchSaveState(this.$store);

    this.gsp = null;
    const form = (this.$refs.form as unknown) as {
      resetValidation: () => void;
    };
    form.resetValidation();
  }
}
</script>
