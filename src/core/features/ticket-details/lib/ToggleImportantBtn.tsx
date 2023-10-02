import {
  useCreateImportantTicket,
  useDeleteImportantTicket,
} from "@/api-client/tickets";
import { events } from "@/constants/events";
import EventBus from "@/util/event-bus/EventBus";
import { Star, StarBorder } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import classNames from "classnames";
import { useMemo } from "react";

export const ToggleImportantBtn = ({
  ticketId,
  className,
  isImportant,
}: {
  ticketId: string;
  className?: string;
  isImportant: boolean;
}) => {
  const create = useCreateImportantTicket();
  const deleteImp = useDeleteImportantTicket();

  const action = useMemo(
    () => (isImportant ? deleteImp : create),
    [create, deleteImp, isImportant]
  );

  return (
    <Tooltip
      arrow
      placement="top"
      title={
        isImportant
          ? "Unmark important ticket"
          : "Mark ticket as `important`, you will see them in the dashboard card"
      }
    >
      <IconButton
        disabled={action.isLoading}
        onClick={async () => {
          try {
            await action.execute(ticketId);
            EventBus.dispatch(events.TICKET_UPDATED);
            EventBus.dispatch(events.IMPORTANT_TICKET_UPDATE);
          } catch (error) {
            console.error(error);
          }
        }}
        className={classNames(className)}
      >
        {isImportant ? (
          <Star color="success" />
        ) : (
          <StarBorder color="success" />
        )}
      </IconButton>
    </Tooltip>
  );
};
