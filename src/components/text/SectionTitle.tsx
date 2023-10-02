import { Typography } from "@mui/material";
import classNames from "classnames";

export const SectionTitle = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <Typography
      gutterBottom
      variant="h5"
      className={classNames("font-semibold text-gray-800 p-3", className)}
    >
      {text}
    </Typography>
  );
};
