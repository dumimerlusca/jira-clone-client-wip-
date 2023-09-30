"use client";

import { useFetchTickets } from "@/api-client/tickets";
import { TicketPriorityIcon, TicketTypeIcon } from "@/components/icons";
import { useAuthContext } from "@/context/auth-context";
import { Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export const MyTicketsCard = () => {
  const { currentUser } = useAuthContext();
  const { data } = useFetchTickets({ assignee: currentUser.id } as any);

  console.log({ currentUser });

  const tickets = useMemo(() => data?.payload || [], [data?.payload]);

  const router = useRouter();

  return (
    <Card variant="elevation">
      <CardContent>
        <Typography variant="h5" className="text-center">
          Assigneed to me
        </Typography>
        <ul>
          {tickets.map((item) => {
            return (
              <li
                onClick={() => {
                  router.push(`/tickets/${item.key}`);
                }}
                key={item.id}
                className="overflow-hidden p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-md"
              >
                <TicketTypeIcon type={item.type} />
                <TicketPriorityIcon priority={item.priority} />
                <Typography className="whitespace-nowrap text-sm font-semibold text-gray-700">
                  {item.key}
                </Typography>
                <Typography className="whitespace-nowrap truncate text-sm ml-2 text-gray-700">
                  {item.title}
                </Typography>
                <Typography className="whitespace-nowrap truncate text-sm ml-auto text-gray-700">
                  {item.status}
                </Typography>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
