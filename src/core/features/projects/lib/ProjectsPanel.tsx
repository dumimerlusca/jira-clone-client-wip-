"use client";

import { NewProjectBtn } from "./NewProjectBtn";
import { ProjectsTable } from "./ProjectsTable";

export const ProjectsPanel = () => {
  return (
    <div className="bg-white p-2 rounded-md space-y-5">
      <div className="flex">
        <div className=" ml-auto">
          <NewProjectBtn />
        </div>
      </div>
      <ProjectsTable />
    </div>
  );
};
