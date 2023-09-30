import { useGetTicketHistory } from "@/api-client/tickets";
import { UserAvatar } from "@/components/icons";
import { events } from "@/constants/events";
import EventBus from "@/util/event-bus/EventBus";
import { Typography } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { useTicketDetailsContext } from "../ticket-details-context";

export const HistorySection = () => {
  const { ticket } = useTicketDetailsContext();
  const { data = [], mutate, isLoading } = useGetTicketHistory(ticket.id);

  useEffect(() => {
    const listener = EventBus.addListener(events.TICKET_UPDATED, () => {
      mutate();
    });

    return () => {
      listener.removeListener();
    };
  }, [mutate]);

  return (
    <div>
      <ul className="space-y-7">
        {data.map((item, index) => {
          return (
            <li key={`${index}-${item.created_at}`}>
              <div className="flex gap-3 w-full">
                <UserAvatar className="w-6 h-6" />
                <div className="w-full">
                  <Typography>
                    <span className="font-semibold">
                      {item.updatedBy.username}
                    </span>{" "}
                    <span className="text-gray-500 font-light">
                      updated field
                    </span>{" "}
                    <span className="font-semibold text-gray-700">
                      {item.fieldName}
                    </span>
                    <span className="font-light text-sm text-gray-500 ml-3">
                      {moment(item.created_at).fromNow()}
                    </span>
                  </Typography>
                  <div className="flex gap-5 mt-2 items-center">
                    <div className="text-gray-600">
                      {item.from?.displayValue || "None"}
                    </div>
                    <div className="font-semibold text-gray-600 whitespace-nowrap">{`-->`}</div>
                    <div className="text-gray-600">
                      {item.to?.displayValue || "None"}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        <li className="flex gap-3">
          <UserAvatar className="w-6 h-6" />
          <div>
            <span className="font-semibold">{ticket.creator.username}</span>{" "}
            <span className="text-gray-500 font-light">
              created this ticket
            </span>{" "}
            <span className="font-light text-sm text-gray-500 ml-3">
              {moment(ticket.created_at).fromNow()}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};
