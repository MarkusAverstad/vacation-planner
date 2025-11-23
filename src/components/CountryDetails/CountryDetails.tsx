import { useCountryData } from "hooks";

const CountryDetails = () => {
  const { selectedCountry } = useCountryData();

  return (
    <>
      <div className="mb-6 flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold">
          {selectedCountry ? selectedCountry.name.common : "Select a country"}
        </h2>
        {selectedCountry && (
          <img
            className="w-12 h-8 object-cover rounded"
            src={selectedCountry.flags.svg}
            alt={`The flag of ${selectedCountry.name.common}`}
          />
        )}
      </div>
      {!selectedCountry ? (
        <p>Please select a country.</p>
      ) : (
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt>Capital</dt>
                <dd className="font-medium">
                  {selectedCountry.capital?.[0] || "—"}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt>Region</dt>
                <dd className="font-medium">{selectedCountry.region}</dd>
              </div>

              <div className="flex justify-between">
                <dt>Subregion</dt>
                <dd className="font-medium">
                  {selectedCountry.subregion || "—"}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt>Country Codes</dt>
                <dd className="font-medium">
                  {selectedCountry.cca2} / {selectedCountry.cca3}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Demographics</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt>Population</dt>
                <dd className="font-medium">
                  {selectedCountry.population.toLocaleString()}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt>Area</dt>
                <dd className="font-medium">
                  {selectedCountry.area.toLocaleString()} km²
                </dd>
              </div>

              <div className="flex justify-between">
                <dt>Landlocked</dt>
                <dd className="font-medium">
                  {selectedCountry.landlocked ? "Yes" : "No"}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt>Independent</dt>
                <dd className="font-medium">
                  {selectedCountry.independent ? "Yes" : "No"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  );
};

export default CountryDetails;
