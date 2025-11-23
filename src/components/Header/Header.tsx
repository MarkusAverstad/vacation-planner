import { FilterBar } from "components";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4">
      <h1 className="text-3xl">Vacation planner</h1>
      <FilterBar />
    </header>
  );
};

export default Header;
