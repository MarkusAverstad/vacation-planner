import CountryList from "./CountryList";
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import { CountryListData } from "types";
import * as hooks from "hooks";

const mockData: CountryListData[] = [
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
    languages: { eng: "English" },
    code: "ELB",
  },
];

const selectedCountryCodeMock = vi.hoisted(() => vi.fn());
const baseMockReturn: ReturnType<typeof hooks.useCountryData> = {
  filteredCountries: mockData,
  giniFilter: null,
  setGiniFilter: vi.fn(),
  setSelectedLanguageFilter: vi.fn(),
  uniqueLanguages: [],
  countriesLoading: false,
  selectedCountry: null,
  setSelectedCountryCode: selectedCountryCodeMock,
  selectedCountryLoading: false,
  selectedCountryCode: null,
  languagesLoading: false,
};

vi.mock("hooks", async () => {
  const actual = await vi.importActual<typeof hooks>("hooks");
  return {
    ...actual,
    useCountryData: vi.fn(),
  };
});

describe("CountryList", () => {
  it("should match snapshot while loading", () => {
    vi.mocked(hooks.useCountryData).mockReturnValue({
      ...baseMockReturn,
      filteredCountries: [],
      countriesLoading: true,
    });

    const { container } = render(<CountryList />);
    expect(screen.getByTestId("countries-loading-spinner")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot", () => {
    vi.mocked(hooks.useCountryData).mockReturnValue(baseMockReturn);

    const { container } = render(<CountryList />);

    expect(screen.getByText("Elbonia")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
