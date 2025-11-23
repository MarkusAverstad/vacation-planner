import { ChangeEvent, useState } from "react";
import { useCountryData } from "hooks";
import { giniFilters } from "constants";

const FilterBar = () => {
  const [selectedGiniIndex, setSelectedGiniIndex] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const { setGiniFilter, uniqueLanguages, setSelectedLanguageFilter } =
    useCountryData();

  const handleGiniFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGiniIndex(e.target.value);
    setGiniFilter(giniFilters[e.target.value]);
  };

  const handleLanguageFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    setSelectedLanguageFilter(e.target.value);
  };

  return (
    <div className=" flex items-center gap-2">
      <select
        id="gini-filter"
        value={selectedGiniIndex}
        onChange={handleGiniFilterChange}
        className="px-2 py-1 border rounded bg-gray-50 text-gray-900"
      >
        <option value="">Gini index</option>
        {Object.keys(giniFilters).map((giniFilter) => (
          <option key={giniFilter} value={giniFilter}>
            {giniFilter} ({giniFilters[giniFilter].min}-
            {giniFilters[giniFilter].max})
          </option>
        ))}
      </select>
      <select
        id="language-filter"
        value={selectedLanguage}
        onChange={handleLanguageFilterChange}
        className="px-2 py-1 border rounded bg-gray-50 text-gray-900 min-w-[230px]"
      >
        <option value="">Language</option>
        {uniqueLanguages &&
          uniqueLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FilterBar;
