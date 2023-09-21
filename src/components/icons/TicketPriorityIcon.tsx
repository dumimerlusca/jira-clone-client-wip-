import { TicketPriority } from "@/types/tickets";
import { getTicketPriorityLabel } from "@/util/helpers/misc.helpers";
import Image from "next/image";

export const TicketPriorityIcon = ({
  priority,
  height = 20,
  width = 20,
}: {
  priority: TicketPriority;
  height?: number;
  width?: number;
}) => {
  return (
    <Image
      height={height}
      width={width}
      src={`/ticket-priority/${getTicketPriorityLabel(priority)}.svg`}
      alt={""}
    />
  );
};
