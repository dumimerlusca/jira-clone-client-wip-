"use client";

import { fetchProjects } from "@/api-client/projects";
import { Initializing } from "@/components/loaders/Initializing";
import { LOCAL_STORAGE_KEYS } from "@/constants/constants";
import { events } from "@/constants/events";
import { Project } from "@/types/project";
import EventBus from "@/util/event-bus/EventBus";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ProjectContext = {
  activeProject: Project | undefined;
  projectId: string | undefined;
  projects: Project[];
  selectProject: (id: string) => void;
};

const ProjectContext = createContext<ProjectContext>({} as ProjectContext);

export const ProjectContextProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [activeProject, setActiveProject] = useState<Project | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjectsHandler = useCallback(async () => {
    try {
      const res = await fetchProjects();
      const projects = res.data.data;
      setProjects(projects);
      const lastProjectId = localStorage.getItem(
        LOCAL_STORAGE_KEYS.lastProjectId
      );

      if (projects.length === 0) {
        return;
      }
      const project = projects.find((p) => p.id === lastProjectId);

      if (project) {
        setActiveProject(project);
      } else {
        setActiveProject(projects[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectProject = useCallback(
    (id: string) => {
      setActiveProject(projects.find((p) => p.id === id));
      localStorage.setItem(LOCAL_STORAGE_KEYS.lastProjectId, id);
    },
    [projects]
  );

  useEffect(() => {
    fetchProjectsHandler();
  }, [fetchProjectsHandler]);

  useEffect(() => {
    const listener = EventBus.addListener(
      events.PROJECT_CREATED,
      fetchProjectsHandler
    );

    return () => {
      listener.removeListener();
    };
  }, [fetchProjectsHandler]);

  return (
    <ProjectContext.Provider
      value={{
        activeProject,
        projectId: activeProject?.id,
        projects,
        selectProject,
      }}
    >
      {isLoading ? <Initializing /> : children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
