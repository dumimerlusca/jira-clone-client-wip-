import {
  useCreateImportantTicket,
  useFetchTickets,
} from "@/api-client/tickets";
import { ModalWrapper } from "@/components/modal";
import { events } from "@/constants/events";
import { ModalProps } from "@/types/modal";
import EventBus from "@/util/event-bus/EventBus";
import {
  Skeleton,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { CardTicketListItem } from "./CardTicketListItem";

export const TicketsModal = ({ open, onClose }: ModalProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const { data, isLoading } = useFetchTickets({
    limit: 5,
    page,
    title: search,
  } as any);

  const onChange = useCallback((val: string) => {
    setSearch(val);
  }, []);

  const debounceOnChange = useDebouncedCallback((val) => {
    onChange(val);
  }, 250);

  const { execute } = useCreateImportantTicket();

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Typography variant="h5" className="mb-5">
        Select ticket
      </Typography>
      <TextField
        onChange={(e) => {
          debounceOnChange(e.target.value);
        }}
        className="w-full"
        size="small"
        placeholder="Search by summary..."
        variant="outlined"
      />
      {data?.payload?.length === 0 && !isLoading && (
        <Typography className="text-center py-12">No tickets</Typography>
      )}
      <ul className="my-2">
        {isLoading && (
          <>
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </>
        )}
        {data?.payload?.map((ticket) => {
          return (
            <CardTicketListItem
              onClick={async () => {
                try {
                  await execute(ticket.id);
                  EventBus.dispatch(events.IMPORTANT_TICKET_UPDATE);
                  onClose();
                } catch (error) {
                  console.error(error);
                }
              }}
              key={ticket.id}
              ticket={ticket}
            />
          );
        })}
      </ul>
      <TablePagination
        component="div"
        count={data?.metadata?.totalCount ?? 0}
        page={page}
        onPageChange={(_, page) => {
          setPage(page);
        }}
        rowsPerPage={5}
        rowsPerPageOptions={[{ value: 5, label: "5" }]}
      />
    </ModalWrapper>
  );
};
