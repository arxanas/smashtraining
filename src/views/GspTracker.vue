<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>GSP Tracker</v-card-title>
          <v-card-text>
            <v-responsive style="overflow: scroll">
              <div style="height: 100%; min-width: 500px">
                <canvas width="500px" ref="chart"></canvas>
              </div>
            </v-responsive>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
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
                <v-col cols="6">
                  <v-text-field
                    label="GSP"
                    placeholder="GSP, ex. 1000000"
                    required
                    :rules="gspValueRules"
                    v-model="gsp"
                  />
                </v-col>
                <v-col cols="6">
                  <v-btn color="primary" @click="recordGspDatum">
                    Add entry
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>About GSP</v-card-title>
          <v-card-text>
            <p>
              <b>Global Smash Power</b> (GSP) is a measure of how many players
              you are stronger than, used in the
              <b>Quickplay online mode</b> (higher is better). Each character
              has an individual GSP ranking. It's used to help pair you against
              players of similar strength.
            </p>
            <p>
              Because your GSP depends on the number of active players, it may
              change over time as more players become active online, even if you
              don't play any games.
            </p>
            <p>
              Most rating systems (such as
              <a href="https://en.wikipedia.org/wiki/Elo_rating_system"
                >the Elo rating system</a
              >) assume a normal distribution of skill levels. It's reasonable
              to assume that the internal calculations used by GSP operate
              similarly. That means
              <strong>GSP does not scale linearly</strong>. It's harder to gain
              GSP at very low and very high values, and easier to gain at
              middling values.
            </p>
            <p>
              Since GSP varies over time, your GSP is also converted into a
              <b>percentile</b> measurement, which is more meaningful since it
              doesn't depend on the number of active online players. The
              percentile data is sourced from historical data from
              <a href="https://www.elitegsp.com/">elitegsp.com</a>.
            </p>
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
import { calculatePercentile, shortenGspValueForAxis } from "../gsp/Gsp";

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
    const color = "orange";
    return {
      borderColor: color,
      label: "GSP",
      yAxisID: "gsp-axis",
      data: rawDataset.map(datum => ({
        x: new Date(datum.timestamp),
        y: datum.gsp,
      })),
      fill: false,
      pointBackgroundColor: color,
      cubicInterpolationMode: "monotone",
    };
  }

  public getPercentileDataset(rawDataset: RawGspDatum[]): ChartDataSets {
    const eliteGspData = ELITE_GSP_DATA;
    const color = "blue";
    return {
      borderColor: color,
      label: "Percentile",
      yAxisID: "percentile-axis",
      data: rawDataset.map(datum => ({
        x: new Date(datum.timestamp),
        y: calculatePercentile(eliteGspData, datum.gsp, datum.timestamp),
      })),
      fill: false,
      pointBackgroundColor: color,
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
                return shortenGspValueForAxis(valueNum);
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
    await dispatchSaveState(this.$store);

    this.gsp = null;
    const form = (this.$refs.form as unknown) as {
      resetValidation: () => void;
    };
    form.resetValidation();
  }
}
</script>
