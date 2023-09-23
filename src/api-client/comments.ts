import { Comment } from "@/types/comments";
import { useAsyncFunc, useFetchData } from "@/util/hooks";
import { api } from "./instance";

export const getComments = async (ticketId: string) => {
  const { data } = await api.get(`/tickets/${ticketId}/comments`);
  return data.data as Comment[];
};

export const useGetComments = (ticketId: string) => {
  return useFetchData<Comment[]>(`${ticketId}/comments`, () =>
    getComments(ticketId)
  );
};

type CreateCommentPayload = {
  text: string;
};

export const createComment = async (
  ticketId: string,
  payload: CreateCommentPayload
) => {
  const { data } = await api.post(
    `/tickets/${ticketId}/comments/create`,
    payload
  );
  return data.data;
};

export const useCreateComment = () => {
  return useAsyncFunc<typeof createComment>(createComment);
};

export const deleteComment = async (id: string) => {
  return api.delete(`/comments/delete/${id}`);
};

export const useDeleteComment = () => {
  return useAsyncFunc<typeof deleteComment>(deleteComment);
};

export type UpdateCommentPayload = {
  text: string;
};

export const updateComment = async (
  id: string,
  payload: UpdateCommentPayload
) => {
  const { data } = await api.patch(`/comments/update/${id}`, payload);
  return data.data;
};

export const useUpdateComment = () => {
  return useAsyncFunc<typeof updateComment>(updateComment);
};
