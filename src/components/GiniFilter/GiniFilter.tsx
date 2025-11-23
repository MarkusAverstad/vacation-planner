type GiniFilterProps = {
  label: string;
  onClick: () => void;
  color: "bg-green-100" | "bg-red-100" | "bg-yellow-100";
};

const GiniFilter = ({ label, onClick, color }: GiniFilterProps) => {
  return (
    <div
      className={`p-4 text-black text-center cursor-pointer border rounded-lg flex-grow ${color}`}
      data-testid={`summary-card-[${label}]`}
      role="button"
      onClick={onClick}
    >
      <header>{label}</header>
    </div>
  );
};

export default GiniFilter;
