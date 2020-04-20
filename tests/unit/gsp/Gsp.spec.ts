import { calculatePercentile, shortenGspValueForAxis } from "@/gsp/Gsp";

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

  it("should shorten axis tick numbering", () => {
    expect(shortenGspValueForAxis(1)).toBe("1");
    expect(shortenGspValueForAxis(12)).toBe("12");
    expect(shortenGspValueForAxis(123)).toBe("123");
    expect(shortenGspValueForAxis(1000)).toBe("1k");
    expect(shortenGspValueForAxis(1200)).toBe("1.2k");
    expect(shortenGspValueForAxis(1230)).toBe("1.23k");
    expect(shortenGspValueForAxis(1234)).toBe("1.23k");
    expect(shortenGspValueForAxis(123450)).toBe("123k");
    expect(shortenGspValueForAxis(123456)).toBe("123k");
    expect(shortenGspValueForAxis(1234567)).toBe("1.23M");
    expect(shortenGspValueForAxis(12345678)).toBe("12.3M");
  });
});
