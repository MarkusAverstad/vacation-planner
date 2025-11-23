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
import { extractLatestGini } from "@/util";

const useCountryDataInternal = () => {
  const [countries, setCountries] = useState<CountryListData[]>([]);
  const [giniFilter, setGiniFilter] = useState<GiniFilter | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null,
  );
  const [selectedCountry, setSelectedCountry] =
    useState<CountryResponse | null>();

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,gini,cca3",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    ).then((response) =>
      response.json().then((countries: CountryListResponse[]) =>
        setCountries(
          countries.map((country) => ({
            ...country,
            code: country.cca3,
            name: country.name.common,
            gini: extractLatestGini(country.gini),
          })),
        ),
      ),
    );
  }, []);

  useEffect(() => {
    if (!selectedCountryCode) return;

    const abortController = new AbortController();

    fetch("https://restcountries.com/v3.1/alpha/" + selectedCountryCode, {
      signal: abortController.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) =>
      response
        .json()
        .then((countryResponse: CountryResponse[]) =>
          setSelectedCountry(
            countryResponse.length > 0 ? countryResponse[0] : null,
          ),
        ),
    );

    return () => abortController.abort();
  }, [selectedCountryCode]);

  const filteredCountries = useMemo(() => {
    if (!giniFilter) return countries;
    return countries.filter(
      (country) =>
        country.gini &&
        country.gini.score <= giniFilter.max &&
        country.gini.score >= giniFilter.min,
    );
  }, [countries, giniFilter]);

  return {
    filteredCountries,
    giniFilter,
    setGiniFilter,
    selectedCountryCode,
    setSelectedCountryCode,
    selectedCountry,
  };
};

const CountryDataContext = createContext<ReturnType<
  typeof useCountryDataInternal
> | null>(null);

export const CountryDataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CountryDataContext.Provider value={useCountryDataInternal()}>
      {children}
    </CountryDataContext.Provider>
  );
};

// Note: I decided to keep the hook and provider together for simplicity.
// eslint-disable-next-line react-refresh/only-export-components
export const useCountryData = () => {
  const context = useContext(CountryDataContext);
  if (!context) {
    throw new Error("useCountryData must be used within a CountryDataProvider");
  }
  return context;
};
