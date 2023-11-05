import { Project } from "@/types/project";
import { ResponseBody } from "@/types/response";
import { User } from "@/types/users";
import { useAsyncFunc, useFetchData } from "@/util/hooks";
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

export const fetchProjectMembers = async (projectId: string) => {
  const { data } = await api.get(`/projects/users/${projectId}`);
  return data.data;
};

export const useFetchProjectMembers = (projectId: string) => {
  return useFetchData<User[]>(["/projects/users", projectId], () =>
    fetchProjectMembers(projectId)
  );
};

export const fetchProjectDetails = async (projectId: string) => {
  const { data } = await api.get(`/projects/details/${projectId}`);
  return data.data;
};

export const useFetchProjectDetails = (projectId: string) => {
  return useFetchData<Project>(["/projects/details", projectId], () =>
    fetchProjectDetails(projectId)
  );
};

export type UpdateProjectPayload = {
  name?: string;
  description?: string;
  key?: string;
};

export const updateProject = async (
  projectId: string,
  payload: UpdateProjectPayload
) => {
  const { data } = await api.patch(`/projects/update/${projectId}`, payload);
  return data.data;
};

export const useUpdateProject = () => {
  return useAsyncFunc<typeof updateProject>(updateProject);
};
