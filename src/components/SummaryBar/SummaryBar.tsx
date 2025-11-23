import { useCountryData } from "hooks";
import { GiniFilter } from "components";

const SummaryBar = () => {
  const { setGiniFilter } = useCountryData();

  return (
    <div className="w-full gap-4 flex sticky top-[var(--header-height)] z-20">
      <GiniFilter
        label={"Gini index: Low"}
        color={"bg-green-100"}
        onClick={() => setGiniFilter({ min: 0, max: 30 })}
      />
      <GiniFilter
        label={"Gini index: Medium"}
        color={"bg-yellow-100"}
        onClick={() => setGiniFilter({ min: 30, max: 45 })}
      />
      <GiniFilter
        label={"Gini index: High"}
        color={"bg-red-100"}
        onClick={() => setGiniFilter({ min: 45, max: 100 })}
      />
    </div>
  );
};

export default SummaryBar;
