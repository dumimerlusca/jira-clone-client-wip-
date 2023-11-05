"use client";

import { UserAvatar } from "@/components/icons";
import { DataTable } from "@/components/table/DataTable";
import { HeaderCell } from "@/components/table/HeaderCell";
import { useProjectContext } from "@/context/project-context";
import { Project } from "@/types/project";
import { ColumnDef, Row, createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const columnHelper = createColumnHelper<Project>();

export const ProjectsTable = () => {
  const { projects } = useProjectContext();

  const router = useRouter();

  const columns = useColumns();

  return (
    <DataTable
      onRowClick={(row: Row<Project>) => {
        router.push(`/projects/${row.original.id}`);
      }}
      columns={columns}
      data={projects}
    />
  );
};

const useColumns = () => {
  const columns = useMemo(
    () =>
      [
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
        columnHelper.accessor("creator", {
          header(props) {
            return <HeaderCell label="Created by" {...props} />;
          },
          cell: (info) => {
            const val = info.getValue();

            return (
              <div className="flex gap-2">
                <UserAvatar />
                <p>{val.username}</p>
              </div>
            );
          },
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
      ] as ColumnDef<Project>[],
    []
  );

  return columns;
};
