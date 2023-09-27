import { Filter } from "@/types/filters";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type Values = Record<string, any>;

type FiltersContext = {
  activeValues: Values;
  filters: Filter[];
  removeFilter: (name: string) => void;
  clearActiveValue: (name: string) => void;
  updateActiveValue: (name: string, value: any) => void;
  applyFilter: (name: string, value?: any) => void;
  findActiveValue: (name: string) => any;
  findValueLabel: (name: string, value: any) => string;
};

const FiltersContext = createContext<FiltersContext>({} as FiltersContext);

export const FiltersProvider = ({
  children,
  filters,
}: PropsWithChildren<{ filters: Filter[] }>) => {
  const [activeValues, setActiveValues] = useState<Values>({});

  const applyFilter = useCallback((name: string, value?: any) => {
    setActiveValues((prev) => {
      return { ...prev, [name]: value || "" };
    });
  }, []);

  const updateActiveValue = useCallback((name: string, value: any) => {
    setActiveValues((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const clearActiveValue = useCallback(
    (name: string) => {
      updateActiveValue(name, "");
    },
    [updateActiveValue]
  );

  const removeFilter = useCallback((name: string) => {
    setActiveValues((prev) => {
      const temp = { ...prev };
      delete temp[name];

      return temp;
    });
  }, []);

  const findActiveValue = useCallback(
    (name: string) => {
      return activeValues[name];
    },
    [activeValues]
  );

  const findValueLabel = useCallback(
    (name: string, value: any) => {
      const filter = filters.find((item) => item.name === name);
      if (!filter) return "";
      const option = filter?.options.find((item) => item.value === value);
      if (!option) return "";

      return option.label;
    },
    [filters]
  );

  return (
    <FiltersContext.Provider
      value={{
        activeValues,
        filters,
        removeFilter,
        applyFilter,
        clearActiveValue,
        updateActiveValue,
        findActiveValue,
        findValueLabel,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
