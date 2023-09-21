import { useUpdateTicket } from "@/api-client/tickets";
import { TicketStatus } from "@/types/tickets";
import { Button, Menu, MenuItem } from "@mui/material";
import { capitalize } from "lodash";
import { useCallback, useRef, useState } from "react";
import { useTicketDetailsContext } from "../ticket-details-context";

export const StatusInput = () => {
  const [open, setOpen] = useState(false);
  const { ticket, mutate } = useTicketDetailsContext();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const btnRef = useRef<HTMLButtonElement>(null);

  const { execute } = useUpdateTicket();

  return (
    <div>
      <Button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        ref={btnRef}
        className="whitespace-nowrap"
      >
        {ticket.status}
      </Button>
      <Menu
        disableScrollLock={true}
        anchorEl={btnRef.current}
        open={open}
        onClose={handleClose}
      >
        {Object.values(TicketStatus).map((item) => {
          return (
            <MenuItem
              key={item}
              selected={ticket.status === item}
              value={item}
              onClick={async () => {
                handleClose();
                try {
                  await execute(ticket.id, { status: item });
                  mutate();
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              {capitalize(item)}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
