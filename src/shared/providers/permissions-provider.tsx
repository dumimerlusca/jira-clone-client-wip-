import { PropsWithChildren, createContext } from "react";

const PermissionsContext = createContext({});

export const PermissionsProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <PermissionsContext.Provider value={{}}>
      {children}
    </PermissionsContext.Provider>
  );
};
