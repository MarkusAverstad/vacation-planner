import { GiniData, GiniRecord } from "types";

export const extractLatestGini = (gini: GiniRecord) => {
  const giniKeys = Object.keys(gini);

  if (!giniKeys.length) {
    return null;
  }

  const years = Object.keys(gini).sort(
    (yearA, yearB) => parseInt(yearB) - parseInt(yearA),
  );
  const latestYear = years[0];

  return {
    year: latestYear,
    score: gini[latestYear],
  } as GiniData;
};
