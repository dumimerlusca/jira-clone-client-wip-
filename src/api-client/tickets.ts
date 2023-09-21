import { useProjectContext } from "@/context/project-context";
import {
  Ticket,
  TicketPriority,
  TicketStatus,
  TicketType,
} from "@/types/tickets";
import { useAsyncFunc, useFetchData } from "@/util/hooks";
import { api } from "./instance";

export const fetchTickets = async (projectId: string) => {
  const { data } = await api.get(`/projects/${projectId}/tickets`);
  return data.data;
};

export const useFetchTickets = () => {
  const { projectId } = useProjectContext();

  return useFetchData<Ticket[]>([projectId, "tickets"], () =>
    fetchTickets(projectId!)
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
