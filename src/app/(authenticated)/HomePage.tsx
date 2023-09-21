"use client";

import { useAuthContext } from "@/context/auth-context";

const HomePage = () => {
  const { isAuthenticated } = useAuthContext();

  console.log({ isAuthenticated });
  return <div>HomePage</div>;
};

export default HomePage;
