import { TablePagination } from "@mui/material";
import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useEffect, useState } from "react";

type DataTableProps = {
  data: any[];
  columns: ColumnDef<any, any>[];
  className?: string;
  onRowClick?: (row: Row<any>) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onPaginationChange?: (data: { page: number; rowsPerPage: number }) => void;
  pagination?: PaginationState & {
    count: number;
  };
};

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  className,
  onRowClick,
  onSortingChange,
  pagination,
  onPaginationChange,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns: columns,
    data: data,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    onSortingChange: setSorting,
    defaultColumn: {
      enableSorting: false,
    },
  });

  useEffect(() => {
    onSortingChange?.(sorting);
  }, [onSortingChange, sorting]);

  return (
    <div>
      <table
        className={classNames("grid", className)}
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      >
        <thead className="contents">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="contents" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-solid border-0 border-b border-gray-400"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="contents">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => {
                onRowClick?.(row);
              }}
              className={classNames("contents", {
                "group cursor-pointer": onRowClick,
              })}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className="text-center flex items-center justify-center p-2 group-hover:bg-gray-200 first-of-type:rounded-l-md last-of-type:rounded-r-md"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="min-h-[350px] flex items-center justify-center">
          No data
        </div>
      )}
      {pagination && onPaginationChange && (
        <TablePagination
          component="div"
          count={pagination.count}
          page={pagination.page}
          onPageChange={(_, page) => {
            onPaginationChange({ ...pagination, page });
          }}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={(e) => {
            onPaginationChange({
              ...pagination,
              rowsPerPage: e.target.value as any,
            });
          }}
        />
      )}
    </div>
  );
};
