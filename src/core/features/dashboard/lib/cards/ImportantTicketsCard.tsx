"use client";

import {
  useDeleteImportantTicket,
  useGetImportantTickets,
} from "@/api-client/tickets";
import { events } from "@/constants/events";
import EventBus from "@/util/event-bus/EventBus";
import { useOpen } from "@/util/hooks";
import { Add, RemoveCircle } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CardTicketListItem } from "../CardTicketListItem";
import { TicketsModal } from "../TicketsModal";
import { DashboardCard } from "./DashboardCard";

export const ImportantTicketsCard = () => {
  const { data = [], mutate } = useGetImportantTickets();

  const router = useRouter();

  const { open, close, setOpen } = useOpen();

  useEffect(() => {
    const listener = EventBus.addListener(
      events.IMPORTANT_TICKET_UPDATE,
      () => {
        mutate();
      }
    );

    return () => {
      listener.removeListener();
    };
  }, [mutate]);

  const deleteTicket = useDeleteImportantTicket();

  return (
    <>
      <TicketsModal open={open} onClose={close} />
      <DashboardCard>
        <Typography variant="h5" className="text-center">
          Important tickets
        </Typography>
        <ul className="max-h-[300px] overflow-auto">
          {data.map((ticket) => {
            return (
              <div className="flex gap-3 items-center" key={ticket.id}>
                <CardTicketListItem
                  className="w-full"
                  onClick={() => {
                    router.push(`/tickets/${ticket.key}`);
                  }}
                  ticket={ticket}
                />
                <Tooltip placement="top" arrow title="Remove from list">
                  <button
                    onClick={async () => {
                      try {
                        await deleteTicket.execute(ticket.id);
                        mutate();
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    <RemoveCircle color="error" className="w-4 h-4" />
                  </button>
                </Tooltip>
              </div>
            );
          })}
        </ul>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="flex items-center justify-center w-full grow bg-gray-200 rounded-md mt-3"
        >
          <Add
            color="primary"
            className={classNames({
              "w-28 h-28": data.length <= 2,
              "w-20 h-20": data.length <= 4,
              "w-10 h-10": data.length > 4,
            })}
          />
        </button>
      </DashboardCard>
    </>
  );
};
