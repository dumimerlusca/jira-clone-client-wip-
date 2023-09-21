import { useAsyncFunc } from "@/util/hooks";
import { api } from "./instance";

export const login = (data: { username: string; password: string }) => {
  return api.post("/auth/login", data);
};

export const register = (data: { username: string; password: string }) => {
  return api.post("/auth/register", data);
};

export const useRegister = () => {
  return useAsyncFunc<typeof register>(register);
};
