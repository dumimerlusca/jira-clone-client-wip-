import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

type DataTableProps = {
  data: any[];
  columns: ColumnDef<any, any>[];
  className?: string;
  onRowClick?: (row: Row<any>) => void;
};

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  className,
  onRowClick,
}) => {
  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

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
                <th key={header.id}>
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
                  className="text-center p-5 group-hover:bg-gray-200 first-of-type:rounded-l-md last-of-type:rounded-r-md"
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
    </div>
  );
};
