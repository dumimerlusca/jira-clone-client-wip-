import { useProjectContext } from "@/context/project-context";
import { CreateTicketModal } from "@/core/features/tickets/lib/CreateTicketModal";
import { Button } from "@mui/material";
import { useState } from "react";

const NewTicketBtn = ({ classNames }: { classNames?: string }) => {
  const [open, setOpen] = useState(false);

  const { projects } = useProjectContext();

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
        className={classNames}
        color="info"
        disabled={projects.length === 0}
        variant="contained"
      >
        New Ticket
      </Button>
    </>
  );
};

export default NewTicketBtn;
