"use client";

import { useFetchTickets } from "@/api-client/tickets";
import { useAuthContext } from "@/context/auth-context";
import { Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { CardTicketListItem } from "../CardTicketListItem";
import { DashboardCard } from "./DashboardCard";

export const MyTicketsCard = () => {
  const { currentUser } = useAuthContext();
  const { data, isLoading } = useFetchTickets({
    assignee: currentUser.id,
  } as any);

  const tickets = useMemo(() => data?.payload || [], [data?.payload]);

  const router = useRouter();

  return (
    <DashboardCard>
      <Typography variant="h5" className="text-center">
        Assigneed to me
      </Typography>
      {isLoading && <Skeleton className="grow" />}
      {tickets.length === 0 && !isLoading && (
        <Typography className="grow flex items-center justify-center">
          No tickets
        </Typography>
      )}
      <ul>
        {tickets.map((ticket) => {
          return (
            <CardTicketListItem
              onClick={() => {
                router.push(`/tickets/${ticket.key}`);
              }}
              key={ticket.id}
              ticket={ticket}
            />
          );
        })}
      </ul>
    </DashboardCard>
  );
};
