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
      className={classNames("font-medium text-gray-800", className)}
    >
      {text}
    </Typography>
  );
};
