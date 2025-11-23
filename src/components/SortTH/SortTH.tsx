type SortTHParams = {
  id: string;
  header: string;
  onClick: (id: string) => void;
  sortBy: string;
  sortDirection: "asc" | "desc";
};

const SortTH = ({
  id,
  header,
  onClick,
  sortBy,
  sortDirection,
}: SortTHParams) => {
  const isActive = sortBy === id;

  return (
    <th
      data-testid={id}
      role="button"
      onClick={() => onClick(id)}
      className={`
        cursor-pointer select-none px-4 py-2
        text-left text-gray-900
        hover:bg-gray-200
        ${isActive ? "bg-gray-200" : ""}
        transition-colors duration-150
      `}
    >
      <div className="flex items-center justify-between">
        <span>{header}</span>
        <span
          data-testid={`sort-direction-${id}`}
          className={`ml-2 text-sm text-gray-700 transition-opacity duration-150 
          ${!isActive ? "opacity-0" : "opacity-100"}`}
        >
          {sortDirection === "asc" ? "↑" : "↓"}
        </span>
      </div>
    </th>
  );
};

export default SortTH;
