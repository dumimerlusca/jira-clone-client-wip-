import { FilterOption } from "@/types/filters";
import { useOpen } from "@/util/hooks";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import { Divider, Menu, Typography } from "@mui/material";
import { isNil } from "lodash";
import { useRef } from "react";
import { useFiltersContext } from ".";
import { DropdownArrow } from "../icons";

export const FilterChip = ({
  options,
  label,
  name,
}: {
  options: FilterOption[];
  label: string;
  name: string;
}) => {
  const { open, setOpen, close } = useOpen();
  const ref = useRef(null);

  const {
    findActiveValue,
    updateActiveValue,
    findValueLabel,
    clearActiveValue,
  } = useFiltersContext();

  const activeValue = findActiveValue(name);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        ref={ref}
        className="flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        <Typography className="text-sm font-semibold">
          {label}
          {!isNil(activeValue) && (
            <>
              :
              <span className="font-medium ml-1">
                {findValueLabel(name, activeValue)}
              </span>
            </>
          )}
        </Typography>
        <DropdownArrow open={false} />
      </div>
      <Menu
        onClose={close}
        anchorEl={ref.current}
        open={open}
        disableScrollLock
      >
        {options.map(({ label, value, icon }) => {
          const selected = value === activeValue;

          return (
            <li
              key={value}
              onClick={() => {
                close();
                updateActiveValue(name, value);
              }}
              className="px-2 py-1 flex items-center gap-2 min-w-[150px] hover:bg-gray-100 cursor-pointer"
            >
              {icon}
              <Typography className="text-sm font-medium text-gray-700">
                {label}
              </Typography>
              {selected ? (
                <CheckBoxOutlined color="primary" className="w-4 h-4 ml-auto" />
              ) : (
                <CheckBoxOutlineBlank
                  color="primary"
                  className="w-4 h-4 ml-auto"
                />
              )}
            </li>
          );
        })}
        <Divider />
        <button
          className="text-left w-full mt-2 p-1 hover:bg-gray-100"
          onClick={() => {
            clearActiveValue(name);
            close();
          }}
        >
          Clear selection
        </button>
      </Menu>
    </>
  );
};
