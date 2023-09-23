import { useGetComments } from "@/api-client/comments";
import { Comment } from "@/types/comments";
import { PropsWithChildren, createContext, useContext } from "react";
import { useTicketDetailsContext } from "../ticket-details-context";

type CommentsContext = {
  comments: Comment[];
  mutate: () => void;
};

const CommentsContext = createContext<CommentsContext>({} as CommentsContext);

export const CommentsContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const { ticket } = useTicketDetailsContext();

  const { data = [], mutate } = useGetComments(ticket.id);

  return (
    <CommentsContext.Provider value={{ comments: data, mutate }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => useContext(CommentsContext);
