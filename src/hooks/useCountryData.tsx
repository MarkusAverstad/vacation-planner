import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CountryListData,
  CountryListResponse,
  CountryResponse,
  GiniFilter,
} from "types";
import { extractLatestGini } from "utils";

export interface CountryDataContextValue {
  filteredCountries: CountryListData[];
  giniFilter: GiniFilter | null;
  setGiniFilter: (filter: GiniFilter | null) => void;
  selectedCountryCode: string | null;
  setSelectedCountryCode: (code: string | null) => void;
  selectedCountry: CountryResponse | null | undefined;
  uniqueLanguages: string[];
  setSelectedLanguageFilter: (language: string | null) => void;
  countriesLoading: boolean;
  languagesLoading: boolean;
  selectedCountryLoading: boolean;
}

const useCountryDataInternal = (): CountryDataContextValue => {
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [languagesLoading, setLanguagesLoading] = useState(true);
  const [selectedCountryLoading, setSelectedCountryLoading] = useState(false);
  const [countries, setCountries] = useState<CountryListData[]>([]);
  const [giniFilter, setGiniFilter] = useState<GiniFilter | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null,
  );
  const [selectedCountry, setSelectedCountry] =
    useState<CountryResponse | null>();
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<
    string | null
  >(null);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,gini,cca3,languages",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    ).then((response) =>
      response.json().then((countries: CountryListResponse[]) => {
        setCountries(
          countries.map((country) => ({
            ...country,
            code: country.cca3,
            name: country.name.common,
            gini: extractLatestGini(country.gini),
          })),
        );
        setCountriesLoading(false);
      }),
    );
  }, []);

  useEffect(() => {
    if (!selectedCountryCode) return;

    setSelectedCountryLoading(true);
    const abortController = new AbortController();

    fetch("https://restcountries.com/v3.1/alpha/" + selectedCountryCode, {
      signal: abortController.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) =>
      response.json().then((countryResponse: CountryResponse[]) => {
        setSelectedCountry(
          countryResponse.length > 0 ? countryResponse[0] : null,
        );
        setSelectedCountryLoading(false);
      }),
    );

    return () => abortController.abort();
  }, [selectedCountryCode]);

  const uniqueLanguages = useMemo(() => {
    const languageSet = new Set<string>();

    countries.forEach((country) => {
      Object.values(country.languages).forEach((language) => {
        languageSet.add(language);
      });
    });

    setLanguagesLoading(false);
    return Array.from(languageSet).sort();
  }, [countries]);

  const filteredCountries = useMemo(() => {
    let filtered = countries;

    if (selectedLanguageFilter) {
      filtered = filtered.filter((country) =>
        Object.values(country.languages).includes(selectedLanguageFilter),
      );
    }

    if (giniFilter) {
      filtered = filtered.filter(
        (country) =>
          country.gini &&
          country.gini.score <= giniFilter.max &&
          country.gini.score >= giniFilter.min,
      );
    }

    return filtered;
  }, [countries, selectedLanguageFilter, giniFilter]);

  return {
    filteredCountries,
    giniFilter,
    setGiniFilter,
    selectedCountryCode,
    setSelectedCountryCode,
    selectedCountry,
    uniqueLanguages,
    setSelectedLanguageFilter,
    countriesLoading,
    languagesLoading,
    selectedCountryLoading,
  };
};

const CountryDataContext = createContext<CountryDataContextValue | null>(null);

export const CountryDataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CountryDataContext.Provider value={useCountryDataInternal()}>
      {children}
    </CountryDataContext.Provider>
  );
};

// Note: I decided to keep the hook and provider together for simplicity.
// eslint-disable-next-line react-refresh/only-export-components
export const useCountryData = (): CountryDataContextValue => {
  const context = useContext(CountryDataContext);
  if (!context) {
    throw new Error("useCountryData must be used within a CountryDataProvider");
  }
  return context;
};
