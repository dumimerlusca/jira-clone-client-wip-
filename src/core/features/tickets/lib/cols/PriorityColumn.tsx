import { TicketPriority } from "@/types/tickets";
import { getTicketPriorityLabel } from "@/util/helpers/misc.helpers";
import Image from "next/image";

export const PriorityColumn = ({ priority }: { priority: TicketPriority }) => {
  return (
    <div>
      <Image
        height={20}
        width={20}
        src={`/ticket-priority/${getTicketPriorityLabel(priority)}.svg`}
        alt={`Priority ${priority}`}
      />
    </div>
  );
};
