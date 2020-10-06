import { Gsp, GspDataRow } from "./EliteGspData";

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

  const percentile = gsp / closest.maxGsp;
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
