import { TicketTypeIcon } from "@/components/icons";
import { TicketType } from "@/types/tickets";

export const TypeColumn = ({ type }: { type: TicketType }) => {
  return (
    <div>
      <TicketTypeIcon type={type} />
    </div>
  );
};
