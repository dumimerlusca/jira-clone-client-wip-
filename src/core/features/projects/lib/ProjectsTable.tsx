import { DataTable } from "@/components/table/DataTable";
import { HeaderCell } from "@/components/table/HeaderCell";
import { useProjectContext } from "@/context/project-context";
import { Project } from "@/types/project";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import { useMemo } from "react";

const columnHelper = createColumnHelper<Project>();

export const ProjectsTable = () => {
  const { projects } = useProjectContext();

  console.log({ projects });

  const columns = useColumns();

  return <DataTable columns={columns} data={projects} />;
};

const useColumns = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("key", {
        header() {
          return <HeaderCell label="Key" />;
        },
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header() {
          return <HeaderCell label="Name" />;
        },
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("created_by_id", {
        header() {
          return <HeaderCell label="Created by" />;
        },
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("created_at", {
        header() {
          return <HeaderCell label="Created at" />;
        },
        cell: (info) => {
          const val = info.getValue();
          return moment(val).format("llll");
        },
      }),
    ],
    []
  );

  return columns;
};
