"use client";

import { Filters, FiltersProvider } from "@/components/filters";
import { SectionTitle } from "@/components/text/SectionTitle";
import { TicketsTable } from "./TicketsTable";
import { FilterBySummary } from "./filters/FilterBySummary";
import { useFilteringOptions } from "./useFilteringOptions";

export const TicketsPanel = () => {
  const filters = useFilteringOptions();

  return (
    <FiltersProvider filters={filters}>
      <div className="p-2 rounded-md bg-white">
        <SectionTitle text="All tickets" />
        <div className="mt-5 mb-8 flex items-center gap-3">
          <FilterBySummary />
          <Filters />
        </div>
        <TicketsTable />
      </div>
    </FiltersProvider>
  );
};
