import { GiniFilter } from "types";

export const giniFilters = {
  Low: { min: 0, max: 30 } as GiniFilter,
  Medium: { min: 30, max: 45 } as GiniFilter,
  High: { min: 45, max: 100 } as GiniFilter,
};
