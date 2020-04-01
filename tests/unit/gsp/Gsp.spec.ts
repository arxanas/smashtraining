import { calculatePercentile } from "@/gsp/Gsp";

describe("Gsp", () => {
  it("should calculate percentile correctly", () => {
    const gspDataRows = [
      { timestamp: 10, averageGsp: 965, maxGsp: 1000 },
      { timestamp: 20, averageGsp: 965 * 2, maxGsp: 1000 * 2 },
    ];
    expect(calculatePercentile(gspDataRows, 500, 11)).toBe(50);
    expect(calculatePercentile(gspDataRows, 990, 11)).toBeGreaterThan(96.5);
    expect(calculatePercentile(gspDataRows, 900, 11)).toBeLessThan(96.5);
    expect(calculatePercentile(gspDataRows, 1000, 21)).toBe(50);
  });
});
