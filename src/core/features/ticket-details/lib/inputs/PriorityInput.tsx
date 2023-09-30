import { useUpdateTicket } from "@/api-client/tickets";
import { TicketPriorityIcon } from "@/components/icons";
import { events } from "@/constants/events";
import { ticketPriorityList } from "@/constants/tickets";
import { TicketPriority } from "@/types/tickets";
import EventBus from "@/util/event-bus/EventBus";
import { getTicketPriorityLabel } from "@/util/helpers/misc.helpers";
import { Button, Menu, MenuItem, Typography, capitalize } from "@mui/material";
import { useCallback, useRef, useState } from "react";

export const PriorityInput = ({
  priority,
  ticketId,
}: {
  priority: TicketPriority;
  ticketId: string;
}) => {
  const [open, setOpen] = useState(false);
  const { execute } = useUpdateTicket();
  const btnRef = useRef<HTMLButtonElement>(null);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        ref={btnRef}
        className="flex items-center gap-3"
      >
        <TicketPriorityIcon priority={priority} />
        <Typography>{capitalize(getTicketPriorityLabel(priority))}</Typography>
      </Button>
      <Menu
        onClose={onClose}
        disableScrollLock={true}
        open={open}
        anchorEl={btnRef.current}
      >
        {ticketPriorityList.map((item) => {
          return (
            <MenuItem
              key={item.value}
              onClick={async () => {
                try {
                  await execute(ticketId, { priority: item.value });
                  EventBus.dispatch(events.TICKET_UPDATED);
                  onClose();
                } catch (error) {
                  console.error(error);
                }
              }}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
