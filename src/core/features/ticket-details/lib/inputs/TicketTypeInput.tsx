import { useUpdateTicket } from "@/api-client/tickets";
import { TicketTypeIcon } from "@/components/icons";
import { events } from "@/constants/events";
import { ticketTypeList } from "@/constants/tickets";
import EventBus from "@/util/event-bus/EventBus";
import { Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useTicketDetailsContext } from "../ticket-details-context";

export const TicketTypeInput = () => {
  const [open, setOpen] = useState(false);
  const { ticket } = useTicketDetailsContext();
  const btnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const { execute } = useUpdateTicket();
  return (
    <Tooltip arrow placement="top" title={"Change ticket type"}>
      <div>
        <button
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          ref={btnRef}
        >
          <TicketTypeIcon type={ticket.type} />
        </button>
        <Menu
          disableScrollLock
          onClose={close}
          open={open}
          anchorEl={btnRef.current}
        >
          {ticketTypeList.map((item) => {
            return (
              <MenuItem
                selected={ticket.type === item.value}
                className="gap-3"
                key={item.value}
                onClick={async () => {
                  close();
                  try {
                    await execute(ticket.id, { type: item.value });
                    EventBus.dispatch(events.TICKET_UPDATED);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <TicketTypeIcon type={item.value} />
                <Typography>{item.label}</Typography>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </Tooltip>
  );
};
