import { useProjectContext } from "@/context/project-context";
import { CreateTicketModal } from "@/core/features/tickets/lib/CreateTicketModal";
import { Button } from "@mui/material";
import { useState } from "react";

const NewTicketBtn = ({ classNames }: { classNames?: string }) => {
  const [open, setOpen] = useState(false);

  const { projectId } = useProjectContext();

  return (
    <>
      <CreateTicketModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Button
        onClick={() => {
          setOpen(true);
        }}
        disabled={!projectId}
        className={classNames}
        color="info"
        variant="contained"
      >
        New Ticket
      </Button>
    </>
  );
};

export default NewTicketBtn;
