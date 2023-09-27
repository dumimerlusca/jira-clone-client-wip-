import { useFiltersContext } from "@/components/filters";
import { TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const FilterBySummary = () => {
  const [value, setValue] = useState("");
  const { updateActiveValue } = useFiltersContext();

  const debouncedOnChange = useDebouncedCallback((val) => {
    updateActiveValue("title", val);
  }, 350);

  const onChange = useCallback(
    (val: string) => {
      setValue(val);
      debouncedOnChange(val);
    },
    [debouncedOnChange]
  );

  return (
    <TextField
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      size="small"
      placeholder="Search..."
      variant="outlined"
    />
  );
};
