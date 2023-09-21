"use client";

import { useFetchTicketDetails } from "@/api-client/tickets";
import { Ticket } from "@/types/tickets";
import { useParams } from "next/navigation";
import { PropsWithChildren, createContext, useContext } from "react";

type TicketDetailsContext = {
  ticket: Ticket;
  mutate: () => void;
};

const TicketDetailsContext = createContext<TicketDetailsContext>(
  {} as TicketDetailsContext
);

export const TicketDetailsContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { key } = useParams();
  const { data: ticket, mutate } = useFetchTicketDetails(key as string);

  return (
    <TicketDetailsContext.Provider value={{ ticket: ticket!, mutate }}>
      {ticket ? children : <div>No ticket found</div>}
    </TicketDetailsContext.Provider>
  );
};

export const useTicketDetailsContext = () => useContext(TicketDetailsContext);
