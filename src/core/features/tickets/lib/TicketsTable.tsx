import { useFetchTickets } from "@/api-client/tickets";
import { DataTable } from "@/components/table/DataTable";
import { HeaderCell } from "@/components/table/HeaderCell";
import { events } from "@/constants/events";
import { Ticket } from "@/types/tickets";
import EventBus from "@/util/event-bus/EventBus";
import { formatDate } from "@/util/helpers/misc.helpers";
import { Button } from "@mui/material";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { AssigneeCell } from "./cols/AssigneeCell";
import { PriorityColumn } from "./cols/PriorityColumn";
import { TypeColumn } from "./cols/TypeColumn";

const columnHelper = createColumnHelper<Ticket>();

export const TicketsTable = () => {
  const { data = [], mutate } = useFetchTickets();

  const columns = useColumns();

  useEffect(() => {
    const listener = EventBus.addListener(events.TICKET_CREATED, () => {
      mutate();
    });

    return () => {
      listener.removeListener();
    };
  }, [mutate]);

  return <DataTable className="min-w-[1000px]" data={data} columns={columns} />;
};

const useColumns = () => {
  const router = useRouter();

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor("type", {
          header() {
            return <HeaderCell label="Type" />;
          },
          cell: (info) => <TypeColumn type={info.getValue()} />,
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("key", {
          header() {
            return <HeaderCell label="Key" />;
          },
          cell: (info) => {
            const key = info.getValue();
            return (
              <div>
                <Button
                  onClick={() => {
                    router.push(`/tickets/${key}`);
                  }}
                  className="whitespace-nowrap"
                  variant="text"
                >
                  {key}
                </Button>
              </div>
            );
          },
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("title", {
          header() {
            return <HeaderCell label="Summary" />;
          },
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("priority", {
          header() {
            return <HeaderCell label="Priority" />;
          },
          cell: (info) => <PriorityColumn priority={info.getValue()} />,
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("status", {
          header() {
            return <HeaderCell label="Status" />;
          },
        }),
        columnHelper.accessor("assignee", {
          header() {
            return <HeaderCell label="Assignee" />;
          },
          cell: (info) => <AssigneeCell user={info.getValue()} />,
        }),
        columnHelper.accessor("creator", {
          header() {
            return <HeaderCell label="Created By" />;
          },
          cell: (info) => <AssigneeCell user={info.getValue()} />,
        }),
        columnHelper.accessor("created_at", {
          header() {
            return <HeaderCell label="Created" />;
          },
          cell: (info) => (
            <div className="whitespace-nowrap">
              {formatDate(info.getValue())}
            </div>
          ),
        }),
      ] as ColumnDef<any>[],
    [router]
  );
  return columns;
};
