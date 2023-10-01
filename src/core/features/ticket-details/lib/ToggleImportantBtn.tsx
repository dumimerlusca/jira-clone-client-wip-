import { useCreateImportantTicket } from "@/api-client/tickets";
import { StarBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import classNames from "classnames";

export const ToggleImportantBtn = ({
  ticketId,
  className,
}: {
  ticketId: string;
  className?: string;
}) => {
  const create = useCreateImportantTicket();

  return (
    <IconButton
      disabled={create.isLoading}
      onClick={() => {
        create.execute(ticketId);
      }}
      className={classNames(className)}
    >
      <StarBorder />
    </IconButton>
  );
};
