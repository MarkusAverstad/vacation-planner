import "./index.css";
import { CountryDetails, CountryTable, Header } from "components";
import { useCountryData } from "hooks";

function Dashboard() {
  const { filteredCountries } = useCountryData();

  return (
    <div className="flex flex-col gap-4 h-screen">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 overflow-hidden px-4">
        <div className="lg:col-span-3 rounded-lg flex flex-col gap-4 overflow-auto">
          <CountryTable />
        </div>

        <div className="lg:col-span-1 bg-gray-800 rounded-lg p-4 overflow-auto">
          <CountryDetails />
        </div>
      </div>

      <footer className="text-center text-lg sticky bottom-0 bg-[#242424] h-[24px] z-10">
        <span>Total countries: {filteredCountries.length}</span>
      </footer>
    </div>
  );
}

export default Dashboard;
