import NormalDistribution from "normal-distribution";
import { Gsp, GspDataRow } from "./EliteGspData";

function makeDistribution(gspData: GspDataRow): NormalDistribution {
  // GSP is a measure of how many players you're better than (which is an
  // unusual choice for a rating system). That means that GSP fluctuates from
  // day to day, as the number of players changes (especially at the time of
  // this writing, during the COVID-19 lockdowns, when loads of people are
  // joining out of boredom every day...).
  //
  // Since GSP changes due to external factors, it's not a good indicator of
  // skill over time. We want to produce a percentile instead, which should be
  // more stable.
  //
  // elitegsp.com seems to think that Elite Smash includes the top 3.5% of
  // players:
  //
  //     6,666,384 / 6,908,170 = 0.964999...
  //
  // We're assuming that the skill distribution is normal (a reasonable
  // assumption for most rating systems). So the mean should be half the maximum
  // (that is, the average player should have the median GSP value). To model
  // the distribution, we just need the standard deviation.
  //
  // The 96.5% value is around z = 1.81, so the standard deviation can be calculated
  // with the equation
  //
  //     (mean + z * stddev) = 96.5% value
  const z = 1.81;
  const mean = gspData.maxGsp / 2;
  const stddev = (gspData.averageGsp - mean) / z;
  return new NormalDistribution(mean, stddev);
}

export function calculatePercentile(
  gspData: GspDataRow[],
  gsp: Gsp,
  timestamp: number,
) {
  let closest = gspData[0];
  for (const row of gspData) {
    if (row.timestamp <= timestamp) {
      if (closest === null || row.timestamp >= closest.timestamp) {
        closest = row;
      }
    }
  }

  const dist = makeDistribution(closest);
  const percentile = dist.cdf(gsp);
  return Math.round(percentile * 1000) / 10;
}

export function shortenGspValueForAxis(value: number): string {
  const trimZerosAfterDecimal = (valueWithPrecision: string) => {
    return valueWithPrecision.replace(/(\.[1-9]*)0+$/, "$1").replace(/\.$/, "");
  };
  if (value >= 1e6) {
    return trimZerosAfterDecimal(Number(value / 1e6).toPrecision(3)) + "M";
  } else if (value >= 1e3) {
    return trimZerosAfterDecimal(Number(value / 1e3).toPrecision(3)) + "k";
  } else {
    return value + "";
  }
}
