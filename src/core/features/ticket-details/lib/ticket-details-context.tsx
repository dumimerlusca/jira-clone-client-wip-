"use client";

import { useFetchTicketDetails } from "@/api-client/tickets";
import { events } from "@/constants/events";
import { Ticket } from "@/types/tickets";
import EventBus from "@/util/event-bus/EventBus";
import { useParams } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

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

  useEffect(() => {
    const listener = EventBus.addListener(events.TICKET_UPDATED, () => {
      mutate();
    });

    return () => {
      listener.removeListener();
    };
  }, [mutate]);

  return (
    <TicketDetailsContext.Provider value={{ ticket: ticket!, mutate }}>
      {ticket ? children : <div>No ticket found</div>}
    </TicketDetailsContext.Provider>
  );
};

export const useTicketDetailsContext = () => useContext(TicketDetailsContext);
