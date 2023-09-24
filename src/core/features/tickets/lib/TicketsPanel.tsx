"use client";

import { SectionTitle } from "@/components/text/SectionTitle";
import { TicketsTable } from "./TicketsTable";

export const TicketsPanel = () => {
  return (
    <>
      <SectionTitle text="All tickets" />
      <div className="p-2 rounded-md bg-white">
        <TicketsTable />
      </div>
    </>
  );
};
