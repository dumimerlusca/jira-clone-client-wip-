import { ExpandLess, ExpandMore } from "@mui/icons-material";

export const DropdownArrow = ({
  className,
  open,
}: {
  className?: string;
  open: boolean;
}) => {
  return open ? (
    <ExpandLess className={className} />
  ) : (
    <ExpandMore className={className} />
  );
};
