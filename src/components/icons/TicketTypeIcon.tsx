import { TicketType } from "@/types/tickets";
import Image from "next/image";

export const TicketTypeIcon = ({
  type,
  height = 20,
  width = 20,
}: {
  type: TicketType;
  height?: number;
  width?: number;
}) => {
  return (
    <Image
      height={height}
      width={width}
      src={`/ticket-types/${type}.svg`}
      alt={type}
    />
  );
};
