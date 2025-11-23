import CountryList from "./CountryList";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { CountryListData } from "types";

const mockData: CountryListData[] = vi.hoisted(() => [
  {
    name: "Elbonia",
    flags: {
      png: "elbonia.png",
      svg: "elbonia.svg",
      alt: "A pair of underpants on a flagpole.",
    },
    population: 3822,
    gini: {
      year: "2020",
      score: 99.9,
    },
  },
]);

vi.mock("hooks", async () => ({
  ...(await vi.importActual("hooks")),
  useCountryData: () => ({
    filteredCountries: mockData,
  }),
}));

describe("CountryList", () => {
  it("should match snapshot", () => {
    const { container } = render(<CountryList />);

    expect(screen.getByText("Elbonia")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
