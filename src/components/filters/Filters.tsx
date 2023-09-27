import { useFiltersContext } from ".";
import { FilterChip } from "./FilterChip";

export const Filters = () => {
  const { filters } = useFiltersContext();
  return (
    <div className="flex items-center gap-3">
      {filters
        .filter((item) => item.alwaysDisplay)
        .map((item) => {
          return (
            <FilterChip
              key={item.name}
              label={item.label}
              options={item.options}
              name={item.name}
            />
          );
        })}
    </div>
  );
};
