"use client";

import { NewProjectBtn } from "@/core/features/projects";
import { BugReport } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  return (
    <aside className="relative shrink-0 shadow-lg w-[240px] bg-white ">
      <div className="sticky top-0">
        <div className="flex items-center gap-3 justify-center">
          <BugReport
            className="w-[50px] h-[50px]"
            sx={{ color: "var(--color-primary)" }}
          />
          <h2 className="font-semibold text-primary">Bug Tracker</h2>
        </div>

        <nav className="w-full mt-10">
          <ul className="list-none">
            <Divider />
            <NavItem to="/" label="Dashboard" />
            <Divider />
            <NavItem to="/tickets" label="Tickets" />
            <Divider />
            <NavItem to="/team" label="Team" />
            <Divider />
            <NavItem to="/invites" label="Invites" />
            <Divider />
            <NavItem to="/projects" label="Your Projects" />
          </ul>
        </nav>
        <div className="px-2 mt-10">
          <NewProjectBtn className="w-full" />
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ label, to }: { label: string; to: string }) => {
  const router = useRouter();
  return (
    <li
      onClick={() => {
        router.push(to);
      }}
      className="p-5 hover:bg-primary/20"
    >
      {label}
    </li>
  );
};
