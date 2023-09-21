import { PropsWithChildren, createContext, useContext } from "react";
import { useTicketDetailsContext } from "../ticket-details-context";

const CommentsContext = createContext({});

export const CommentsContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const { ticket } = useTicketDetailsContext();

  return (
    <CommentsContext.Provider value={{}}>{children}</CommentsContext.Provider>
  );
};

export const useCommentsContext = () => useContext(CommentsContext);
