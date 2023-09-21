import { ModalWrapper } from "@/components/modal";
import { events } from "@/constants/events";
import EventBus from "@/util/event-bus/EventBus";
import { CreateTicketForm } from "./CreateTicketForm";

export const CreateTicketModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <ModalWrapper onClose={onClose} open={open}>
      <CreateTicketForm
        onSuccess={() => {
          EventBus.dispatch(events.TICKET_CREATED);
          setTimeout(() => {
            onClose();
          }, 1000);
        }}
      />
    </ModalWrapper>
  );
};
