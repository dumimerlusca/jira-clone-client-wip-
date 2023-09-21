import { Project } from "@/types/project";
import { ResponseBody } from "@/types/response";
import { useAsyncFunc } from "@/util/hooks";
import { api } from "./instance";

export const fetchProjects = () => {
  return api.get<ResponseBody<Project[]>>("/projects");
};

type CreateProjectPayload = {
  name: string;
  key: string;
  description: string;
};

export const createProject = (data: CreateProjectPayload) => {
  return api.post("/projects/create", data);
};

export const useCreateProject = () => {
  return useAsyncFunc<typeof createProject>(createProject);
};
