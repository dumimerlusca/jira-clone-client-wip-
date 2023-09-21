"use client";

import { NoProjectError } from "@/components/error/NoProjectError";
import { SectionTitle } from "@/components/text/SectionTitle";
import { useProjectContext } from "@/context/project-context";
import { TicketsTable } from "./TicketsTable";

export const TicketsPanel = () => {
  const { projectId } = useProjectContext();

  if (!projectId) {
    return <NoProjectError />;
  }

  return (
    <>
      <SectionTitle text="All tickets" />
      <div className="p-2 rounded-md bg-white">
        <TicketsTable />
      </div>
    </>
  );
};
