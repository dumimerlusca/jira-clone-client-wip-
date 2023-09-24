"use client";

import { fetchProjects } from "@/api-client/projects";
import { Initializing } from "@/components/loaders/Initializing";
import { LOCAL_STORAGE_KEYS } from "@/constants/constants";
import { events } from "@/constants/events";
import { AllOption, Project } from "@/types/project";
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
  all: boolean;
};

const ProjectContext = createContext<ProjectContext>({} as ProjectContext);

export const ProjectContextProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [activeProject, setActiveProject] = useState<Project | undefined>(
    undefined
  );
  const [all, setAll] = useState<boolean>(false);
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

      if (lastProjectId === AllOption && projects.length > 1) {
        setAll(true);
        return;
      }
      const project = projects.find((p) => p.id === lastProjectId);

      if (project) {
        setActiveProject(project);
      } else {
        if (projects.length > 1) {
          setAll(true);
        } else {
          setActiveProject(projects[0]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectProject = useCallback(
    (id: string) => {
      if (id === AllOption) {
        setAll(true);
        setActiveProject(undefined);
      } else {
        setAll(false);
        const newActiveProject = projects.find((item) => item.id === id);
        setActiveProject(newActiveProject);
      }
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
        all,
      }}
    >
      {isLoading ? <Initializing /> : children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
