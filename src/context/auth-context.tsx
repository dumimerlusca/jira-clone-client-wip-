"use client";

import { api } from "@/api-client/instance";
import { Initializing } from "@/components/loaders/Initializing";
import {
  getAccessToken,
  removeTokenFromLocalStorage,
  saveTokenToLocalStorage,
} from "@/util/helpers/auth.helpers";
import { useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContext = {
  isAuthenticated: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(undefined);

  const router = useRouter();

  const onAuthenticationSucceeded = useCallback(
    ({ token }: { token: string }) => {
      saveTokenToLocalStorage(token);
      setIsAuthenticated(true);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    },
    []
  );

  const getCurrentUser = useCallback(async () => {
    console.log("GET CURRENT USER");
    try {
      const res = await api.get("/auth/me");
      setCurrentUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error({ error });
      setIsAuthenticated(false);
      router.push("/login");
    }
  }, [router]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    removeTokenFromLocalStorage();
    api.defaults.headers["Authorization"] = "";
  }, []);

  useEffect(() => {
    const token = getAccessToken();

    if (!token || token === "" || token === "null") {
      setIsAuthenticated(false);
      router.push("/login");
    } else {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      getCurrentUser();
    }
  }, [getCurrentUser, router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {isAuthenticated ? children : <Initializing />}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
