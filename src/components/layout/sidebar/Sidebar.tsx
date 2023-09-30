"use client";

import { NewProjectBtn } from "@/core/features/projects";
import {
  AccountTree,
  BugReport,
  Dashboard,
  Email,
  People,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  return (
    <aside className="relative shrink-0 shadow-lg w-[240px] bg-primary text-white min-h-screen">
      <div className="sticky top-0">
        <div className="flex items-center gap-3 justify-center">
          <BugReport className="w-[50px] h-[50px]" sx={{ color: "white" }} />
          <h2 className="font-semibold text-white">Bug Tracker</h2>
        </div>

        <nav className="w-full mt-20">
          <ul className="list-none">
            <Divider />
            <NavItem icon={Dashboard} to="/" label="Dashboard" />
            <Divider />
            <NavItem icon={BugReport} to="/tickets" label="Tickets" />
            <Divider />
            <NavItem icon={People} to="/team" label="Team" />
            <Divider />
            <NavItem icon={Email} to="/invites" label="Invites" />
            <Divider />
            <NavItem icon={AccountTree} to="/projects" label="Your Projects" />
          </ul>
        </nav>
        <div className="px-2 mt-10">
          <NewProjectBtn className="w-full" />
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({
  label,
  to,
  icon: Icon,
}: {
  label: string;
  to: string;
  icon: any;
}) => {
  const router = useRouter();
  return (
    <li
      onClick={() => {
        router.push(to);
      }}
      className="p-5 hover:opacity-50 cursor-pointer font-semibold flex items-center gap-3"
    >
      <Icon />
      {label}
    </li>
  );
};
