import { extractLatestGini } from "utils";
import { expect } from "vitest";

describe("giniUtil", () => {
  describe("extractLatestGini", () => {
    it("should return null if there is no data", () => {
      expect(extractLatestGini({})).toBeNull();
    });

    it("should return the only year if there is a single data point", () => {
      const gini = {
        2015: 50.5,
      };
      expect(extractLatestGini(gini)).toEqual({ year: "2015", score: 50.5 });
    });

    it("should return the latest year if there are multiple data points", () => {
      const gini = {
        2011: 40.5,
        2015: 50.5,
        2012: 30.5,
      };
      expect(extractLatestGini(gini)).toEqual({ year: "2015", score: 50.5 });
    });
  });
});
