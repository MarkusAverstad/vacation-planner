import { useMemo, useState } from "react";
import { SortTH } from "components";
import { useCountryData } from "hooks";
import { GiniData } from "types";

const CountryList = () => {
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { filteredCountries, setSelectedCountryCode } = useCountryData();

  const handleSort = (id: string) => {
    if (id === sortBy) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(id);
      setSortDirection("desc");
    }
  };

  const sortedCountries = useMemo(() => {
    return [...filteredCountries].sort((a, b) => {
      // @ts-expect-error We know this attribute exists.
      const aValue: GiniData | string | number = a[sortBy];
      // @ts-expect-error We know this attribute exists.
      const bValue: GiniData | string | number = b[sortBy];

      if (typeof aValue === "object" && typeof bValue === "object") {
        // We know this is the Gini object since there are no other object
        // attributes of CountryData.
        const modifier = sortDirection === "asc" ? 1 : -1;
        if (aValue === null || bValue === null) {
          return (aValue === null ? -1 : 1) * modifier;
        } else if (aValue.score !== bValue.score) {
          return (aValue.score - bValue.score) * modifier;
        } else {
          return 0;
        }
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        const modifier = sortDirection === "asc" ? 1 : -1;
        return (aValue - bValue) * modifier;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return 0;
      }
    });
  }, [filteredCountries, sortBy, sortDirection]);

  function onSelectCountry(countryCode: string) {
    return () => setSelectedCountryCode(countryCode);
  }

  return (
    <div className="overflow-y-scroll">
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 bg-gray-50 z-10">
          <tr>
            <th className="px-4 py-2 bg-gray-100 text-gray-900">Flag</th>
            <SortTH
              id="name"
              header="Name"
              onClick={handleSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
            />
            <SortTH
              id="population"
              header="Population"
              onClick={handleSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
            />
            <SortTH
              id="gini"
              header="Gini Index"
              onClick={handleSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
            />
          </tr>
        </thead>
        <tbody>
          {sortedCountries.map((country, idx) => (
            <tr
              role="button"
              onClick={onSelectCountry(country.code)}
              key={country.code}
              className={`transition-colors duration-150 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              <td className="px-4 py-2 text-gray-900">
                <img
                  className={"w-[80px]"}
                  src={country.flags.svg}
                  alt={country.flags.alt}
                />
              </td>
              <td className="px-4 py-2 text-gray-900">{country.name}</td>
              <td className="px-4 py-2 text-gray-900">{country.population}</td>
              <td className="px-4 py-2 text-gray-900">
                {country.gini
                  ? `${country.gini.score} (${country.gini.year})`
                  : "Unknown"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryList;
