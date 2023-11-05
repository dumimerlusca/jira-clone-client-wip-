"use client";

import { SectionTitle } from "@/components/text/SectionTitle";
import { NewProjectBtn } from "./NewProjectBtn";
import { ProjectsTable } from "./ProjectsTable";

export const ProjectsPanel = () => {
  return (
    <div className="bg-white p-2 rounded-md space-y-5">
      <div className="flex">
        <SectionTitle text="Projects" />
        <div className=" ml-auto">
          <NewProjectBtn />
        </div>
      </div>
      <ProjectsTable />
    </div>
  );
};
