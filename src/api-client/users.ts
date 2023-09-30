import { User } from "@/types/users";
import { toQueryString } from "@/util/helpers/misc.helpers";
import { useFetchData } from "@/util/hooks";
import { api } from "./instance";

export const getWorkspaceMembers = async (projectId?: string) => {
  const res = await api.get(
    `/users/workspace-members?${toQueryString({ projectId })}`
  );
  return res.data.data;
};

export const useGetWorkspaceMembers = (projectId?: string) => {
  return useFetchData<User[]>(["/users/workspace-members", projectId], () =>
    getWorkspaceMembers(projectId)
  );
};
