"use client";

import { Logout } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { ActiveProjectSelector } from "./ActiveProjectSelector";
import NewTicketBtn from "./NewTicketBtn";

export const TopBar = ({ width }: { width: number }) => {
  const router = useRouter();

  return (
    <nav
      className="fixed right-0 top-0 bg-primary w-full flex items-center z-50 overflow-hidden"
      style={{ width: `calc(100% - ${width}px)` }}
    >
      <div className="flex items-center w-full px-5 h-[70px]">
        <ActiveProjectSelector className="ml-auto" />
        <NewTicketBtn classNames="ml-auto" />
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="ml-auto"
        >
          <Logout sx={{ color: "white" }} />
        </button>
      </div>
    </nav>
  );
};
