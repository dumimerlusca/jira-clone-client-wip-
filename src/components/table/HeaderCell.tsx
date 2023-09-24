import { ExpandLess, ExpandMore, UnfoldMore } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { HeaderContext } from "@tanstack/react-table";
import { useMemo } from "react";

type HeaderCellProps = {
  label: string;
} & HeaderContext<any, any>;

export const HeaderCell = ({ label, column }: HeaderCellProps) => {
  const sort = column.getIsSorted();
  const canSort = column.getCanSort();
  const sortIcon = useMemo(() => {
    if (!sort) return <UnfoldMore className="w-3 h-3" />;
    if (sort === "asc") {
      return <ExpandLess className="w-3 h-3" />;
    } else {
      return <ExpandMore className="w-3 h-3" />;
    }
  }, [sort]);

  return (
    <div
      onClick={() => {
        column.toggleSorting();
      }}
      className="p-2 rounded-md text-gray-900 whitespace-nowrap flex items-center justify-center"
    >
      <Typography className="font-semibold text-xs ">{label}</Typography>
      {canSort && sortIcon}
    </div>
  );
};
