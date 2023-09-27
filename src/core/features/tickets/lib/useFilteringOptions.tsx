import { TicketPriorityIcon, TicketTypeIcon } from "@/components/icons";
import { ticketPriorityList, ticketTypeList } from "@/constants/tickets";
import { Filter } from "@/types/filters";
import { TicketStatusList } from "@/types/tickets";
import { capitalize } from "lodash";
import { useMemo } from "react";

export const useFilteringOptions = () => {
  const filters = useMemo(() => {
    return [
      {
        label: "Type",
        name: "type",
        alwaysDisplay: true,
        options: ticketTypeList.map((item) => ({
          ...item,
          icon: <TicketTypeIcon type={item.value} />,
        })),
      },
      {
        label: "Priority",
        name: "priority",
        alwaysDisplay: true,
        options: ticketPriorityList.map((item) => ({
          ...item,
          icon: <TicketPriorityIcon priority={item.value} />,
        })),
      },
      {
        label: "Status",
        name: "status",
        alwaysDisplay: true,
        options: TicketStatusList.map((item) => ({
          value: item,
          label: capitalize(item),
        })),
      },
    ] as Filter[];
  }, []);

  return filters;
};
