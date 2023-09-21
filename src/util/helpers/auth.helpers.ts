import { LOCAL_STORAGE_KEYS } from "@/constants/constants";

export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
};
