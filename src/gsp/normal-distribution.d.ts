declare module "normal-distribution" {
  export default class {
    constructor(mean: number, stddev: number);
    public pdf(value: number): number;
    public cdf(value: number): number;
    public probabilityBetween(lhs: number, rhs: number): number;
    public zScore(value: number): number;
  }
}
