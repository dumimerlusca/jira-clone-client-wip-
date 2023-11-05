"use client";

import { useFetchProjectMembers } from "@/api-client/projects";
import { UserAvatar } from "@/components/icons";
import { useParams } from "next/navigation";

export const ProjectMembers = () => {
  const { projectId } = useParams();
  const { data = [], isLoading } = useFetchProjectMembers(projectId as string);

  console.log({ data });

  return (
    <ul className="space-y-2">
      {data.map((item) => {
        return (
          <li key={item.id} className="flex gap-3 items-center">
            <UserAvatar />
            <p>{item.username}</p>
          </li>
        );
      })}
    </ul>
  );
};
