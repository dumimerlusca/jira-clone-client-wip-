import { useUpdateTicket } from "@/api-client/tickets";
import { useGetWorkspaceMembers } from "@/api-client/users";
import { UserAvatar } from "@/components/icons";
import { events } from "@/constants/events";
import { User } from "@/types/users";
import EventBus from "@/util/event-bus/EventBus";
import { useOpen } from "@/util/hooks";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useRef } from "react";

export const AssigneeInput = ({
  assignee,
  projectId,
  ticketId,
}: {
  assignee?: User | null;
  projectId: string;
  ticketId: string;
}) => {
  const { data = [] } = useGetWorkspaceMembers(projectId);

  const { close, open, setOpen, toggleOpen } = useOpen();
  const { execute } = useUpdateTicket();

  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <Button
        onClick={toggleOpen}
        ref={btnRef}
        className="flex items-center gap-3"
      >
        <UserAvatar />
        <Typography className="text-md text-gray-900 normal-case">
          {assignee?.username ?? "Unnassigned"}
        </Typography>
      </Button>
      <Menu
        onClose={close}
        disableScrollLock={true}
        open={open}
        anchorEl={btnRef.current}
      >
        <MenuItem
          onClick={async () => {
            try {
              await execute(ticketId, { assignee_id: "" });
              EventBus.dispatch(events.TICKET_UPDATED);
              close();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Unnasigneed
        </MenuItem>

        {data.map((item) => {
          return (
            <MenuItem
              key={item.id}
              onClick={async () => {
                try {
                  await execute(ticketId, { assignee_id: item.id });
                  EventBus.dispatch(events.TICKET_UPDATED);
                  close();
                } catch (error) {
                  console.error(error);
                }
              }}
              value={item.id}
            >
              {item.username}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
