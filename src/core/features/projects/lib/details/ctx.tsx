"use client";

import { useFetchProjectDetails } from "@/api-client/projects";
import { events } from "@/constants/events";
import { useAuthContext } from "@/context/auth-context";
import { Project } from "@/types/project";
import EventBus from "@/util/event-bus/EventBus";
import { useParams } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";

type Ctx = {
  project: Project;
  isLoading: boolean;
  hasPermissionToEdit: boolean;
};

const ProjectDetailsContext = createContext<Ctx>({} as Ctx);

export const ProjectDetailsProvider = ({ children }: PropsWithChildren<{}>) => {
  const { projectId } = useParams();
  const { data, isLoading, mutate } = useFetchProjectDetails(
    projectId as string
  );

  useEffect(() => {
    const l = EventBus.addListener(events.PROJECT_UPDATED, () => {
      mutate();
    });

    return () => {
      l.removeListener();
    };
  }, [mutate]);

  const { currentUser } = useAuthContext();

  const hasPermissionToEdit = useMemo(
    () => currentUser.id === data?.creator.id,
    [currentUser.id, data?.creator.id]
  );

  return (
    <ProjectDetailsContext.Provider
      value={{
        project: data ?? ({} as any),
        isLoading,
        hasPermissionToEdit,
      }}
    >
      {children}
    </ProjectDetailsContext.Provider>
  );
};

export const useProjectDetailsContext = () => useContext(ProjectDetailsContext);
