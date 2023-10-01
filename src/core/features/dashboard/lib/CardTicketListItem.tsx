import { TicketPriorityIcon, TicketTypeIcon } from "@/components/icons";
import { Ticket } from "@/types/tickets";
import { Typography } from "@mui/material";
import classNames from "classnames";

export const CardTicketListItem = ({
  ticket,
  onClick,
  className,
}: {
  ticket: Ticket;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <li
      onClick={onClick}
      key={ticket.id}
      className={classNames(
        "overflow-hidden p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-md",
        className
      )}
    >
      <TicketTypeIcon type={ticket.type} />
      <TicketPriorityIcon priority={ticket.priority} />
      <Typography className="whitespace-nowrap text-sm font-semibold text-gray-700">
        {ticket.key}
      </Typography>
      <Typography className="whitespace-nowrap truncate text-sm ml-2 text-gray-700">
        {ticket.title}
      </Typography>
      <Typography className="whitespace-nowrap truncate text-sm ml-auto text-gray-700">
        {ticket.status}
      </Typography>
    </li>
  );
};
