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
        header(props) {
          return <HeaderCell label="Key" {...props} />;
        },
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header(props) {
          return <HeaderCell label="Name" {...props} />;
        },
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("created_by_id", {
        header(props) {
          return <HeaderCell label="Created by" {...props} />;
        },
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("created_at", {
        header(props) {
          return <HeaderCell label="Created at" {...props} />;
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
