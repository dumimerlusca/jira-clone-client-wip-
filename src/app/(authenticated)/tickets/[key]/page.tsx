import {
  TicketDetailsContextProvider,
  TicketDetailsPanel,
} from "@/core/features/ticket-details";
import { PropsWithChildren } from "react";

export const TicketDetailsPage: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <TicketDetailsContextProvider>
      <TicketDetailsPanel />
    </TicketDetailsContextProvider>
  );
};

export default TicketDetailsPage;
