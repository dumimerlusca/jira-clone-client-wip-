import { useProjectContext } from "@/context/project-context";
import {
  Ticket,
  TicketHistoryItem,
  TicketPriority,
  TicketStatus,
  TicketType,
} from "@/types/tickets";
import { toQueryString } from "@/util/helpers/misc.helpers";
import { useAsyncFunc, useFetchData } from "@/util/hooks";
import { api } from "./instance";

export const fetchTickets = async (
  projectId?: string,
  query?: { order?: string }
) => {
  const q = {
    ...query,
    projectId: projectId,
  };

  const { data } = await api.get(`/tickets?${toQueryString(q)}`);
  return data.data;
};

type GetTicketsResponse = {
  payload: Ticket[];
  metadata: {
    page: number;
    limit: number;
    totalCount: number;
  };
};

export const useFetchTickets = (query?: {
  order?: string;
  limit?: number;
  page?: number;
}) => {
  const { projectId } = useProjectContext();

  return useFetchData<GetTicketsResponse>([projectId, "tickets", query], () =>
    fetchTickets(projectId, query)
  );
};

type CreateTicketPayload = {
  title: string;
  description: string;
  priority: TicketPriority;
};

export const createTicket = (projectId: string, data: CreateTicketPayload) => {
  return api.post(`/projects/${projectId}/tickets/create`, data);
};

export const useCreateTicket = () => {
  return useAsyncFunc<typeof createTicket>(createTicket);
};

export const fetchTicketDetails = async (ticketKey: string) => {
  const { data } = await api.get(`/tickets/${ticketKey}`);
  return data.data;
};

export const useFetchTicketDetails = (ticketKey: string) => {
  return useFetchData<Ticket>(["tickets", ticketKey], () =>
    fetchTicketDetails(ticketKey)
  );
};

export type UpdateTicketPayload = {
  title?: string;
  description?: string;
  priority?: TicketPriority;
  status?: TicketStatus;
  story_points?: number;
  type?: TicketType;
  assignee_id?: string;
};

export const updateTicket = async (
  ticketId: string,
  payload: UpdateTicketPayload
) => {
  const { data } = await api.patch(`/tickets/update/${ticketId}`, payload);
  return data.data;
};

export const useUpdateTicket = () => {
  return useAsyncFunc<typeof updateTicket>(updateTicket);
};

export const getTicketHistory = async (ticketId: string) => {
  const { data } = await api.get(`/tickets/history/${ticketId}`);
  return data.data;
};

export const useGetTicketHistory = (ticketId: string) => {
  return useFetchData<TicketHistoryItem[]>(`tickets/history/${ticketId}`, () =>
    getTicketHistory(ticketId)
  );
};

export const getImportantTickets = async () => {
  const { data } = await api.get("/important-tickets");
  return data.data;
};

export const useGetImportantTickets = () => {
  return useFetchData<Ticket[]>("/important-tickets", getImportantTickets);
};

export const createImportantTicket = (ticketId: string) => {
  return api.post(`/important-tickets/create`, { ticketId: ticketId });
};

export const useCreateImportantTicket = () => {
  return useAsyncFunc<typeof createImportantTicket>(createImportantTicket);
};

export const deleteImportantTicket = (ticketId: string) => {
  return api.delete(`/important-tickets/delete/${ticketId}`);
};

export const useDeleteImportantTicket = () => {
  return useAsyncFunc<typeof deleteImportantTicket>(deleteImportantTicket);
};

export const fetchOverallTicketsStats = async (projectId?: string) => {
  const { data } = await api.get(
    `/stats/tickets?${toQueryString({ projectId })}`
  );

  return data.data;
};

export const useFetchOverallTicketsStats = (projectId?: string) => {
  return useFetchData<Record<string, number>>(
    [`/stats/tickets`, projectId],
    () => fetchOverallTicketsStats(projectId)
  );
};
