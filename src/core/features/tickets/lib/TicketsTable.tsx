import { useFetchTickets } from "@/api-client/tickets";
import { useFiltersContext } from "@/components/filters";
import { DataTable } from "@/components/table/DataTable";
import { HeaderCell } from "@/components/table/HeaderCell";
import { events } from "@/constants/events";
import { Ticket } from "@/types/tickets";
import EventBus from "@/util/event-bus/EventBus";
import { getParameterByName } from "@/util/helpers/misc.helpers";
import { Button, Tooltip, Typography } from "@mui/material";
import {
  ColumnDef,
  ColumnSort,
  createColumnHelper,
} from "@tanstack/react-table";
import { isNil } from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AssigneeCell } from "./cols/AssigneeCell";
import { PriorityColumn } from "./cols/PriorityColumn";
import { TypeColumn } from "./cols/TypeColumn";

const columnHelper = createColumnHelper<Ticket>();

export const TicketsTable = () => {
  const [sort, setSort] = useState<ColumnSort | undefined>(undefined);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    rowsPerPage: 10,
  });

  const { activeValues, applyFilter } = useFiltersContext();

  const queryFilters = useMemo(
    () =>
      Object.keys(activeValues).reduce((acc, key) => {
        const val = activeValues[key];
        if (val === "" || isNil(val)) {
          return acc;
        }

        return { ...acc, [key]: val };
      }, {}),
    [activeValues]
  );

  const { data, mutate } = useFetchTickets({
    order: sort ? `${sort.id}.${sort.desc ? "desc" : "asc"}` : undefined,
    limit: pagination.rowsPerPage,
    page: pagination.page,
    ...queryFilters,
  });

  const columns = useColumns();

  useEffect(() => {
    const listener = EventBus.addListener(events.TICKET_CREATED, () => {
      mutate();
    });

    return () => {
      listener.removeListener();
    };
  }, [mutate]);

  useEffect(() => {
    const status = getParameterByName("status");

    if (status !== "") {
      applyFilter("status", status);
    }
  }, [applyFilter]);

  return (
    <DataTable
      onSortingChange={(sorting) => {
        setSort(sorting[0]);
      }}
      className="min-w-[1000px]"
      data={data?.payload ?? []}
      columns={columns}
      onPaginationChange={setPagination}
      pagination={{ ...pagination, count: data?.metadata?.totalCount ?? 0 }}
    />
  );
};

const useColumns = () => {
  const router = useRouter();

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor("type", {
          header(props) {
            return <HeaderCell label="Type" {...props} />;
          },
          cell: (info) => <TypeColumn type={info.getValue()} />,
          footer: (info) => info.column.id,
          enableSorting: true,
        }),
        columnHelper.accessor("key", {
          header(props) {
            return <HeaderCell label="Key" {...props} />;
          },
          cell: (info) => {
            const key = info.getValue();
            return (
              <div>
                <Button
                  onClick={() => {
                    router.push(`/tickets/${key}`);
                  }}
                  className="whitespace-nowrap text-sm"
                  variant="text"
                >
                  {key}
                </Button>
              </div>
            );
          },
          footer: (info) => info.column.id,
          enableSorting: true,
        }),
        columnHelper.accessor("title", {
          header(props) {
            return <HeaderCell {...props} label="Summary" />;
          },
          cell: (info) => (
            <div className="max-w-[300px]">
              <Tooltip arrow title={info.getValue()}>
                <Typography className="text-sm whitespace-nowrap truncate">
                  {info.getValue()}
                </Typography>
              </Tooltip>
            </div>
          ),
          enableSorting: true,
        }),
        columnHelper.accessor("priority", {
          header(props) {
            return <HeaderCell label="Priority" {...props} />;
          },
          cell: (info) => <PriorityColumn priority={info.getValue()} />,
          footer: (info) => info.column.id,
          enableSorting: true,
        }),
        columnHelper.accessor("status", {
          header(props) {
            return <HeaderCell label="Status" {...props} />;
          },
          enableSorting: true,
        }),
        columnHelper.accessor("assignee", {
          header(props) {
            return <HeaderCell label="Assignee" {...props} />;
          },
          cell: (info) => <AssigneeCell user={info.getValue()} />,
        }),
        columnHelper.accessor("creator", {
          header(props) {
            return <HeaderCell label="Created By" {...props} />;
          },
          cell: (info) => <AssigneeCell user={info.getValue()} />,
        }),
        columnHelper.accessor("created_at", {
          header(props) {
            return <HeaderCell label="Created" {...props} />;
          },
          cell: (info) => (
            <div className="text-sm whitespace-nowrap">
              {moment(info.getValue()).fromNow()}
            </div>
          ),
          enableSorting: true,
        }),
        columnHelper.accessor("updated_at", {
          header(props) {
            return <HeaderCell label="Updated" {...props} />;
          },
          cell: (info) => (
            <div className="text-sm whitespace-nowrap">
              {moment(info.getValue()).fromNow()}
            </div>
          ),
          enableSorting: true,
        }),
      ] as ColumnDef<Ticket>[],
    [router]
  );
  return columns;
};
