"use client";

import { UserAvatar } from "@/components/icons";
import { formatDate } from "@/util/helpers/misc.helpers";
import { Typography } from "@mui/material";
import { ProjectMembers } from "./ProjectMembers";
import { useProjectDetailsContext } from "./ctx";
import { DescriptionInput } from "./inputs/DescriptionInput";
import { TitleInput } from "./inputs/TitleInput";

export const ProjectDetailsPanel = () => {
  const { isLoading, project } = useProjectDetailsContext();

  if (isLoading) return <div>Loading</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="flex gap-5 bg-white rounded-md">
      <div className="flex-[2] p-5 space-y-3">
        <div>
          <Typography className="font-bold text-gray-600" variant="caption">
            Project Name:
          </Typography>
          <TitleInput />
        </div>
        <div>
          <DescriptionInput />
        </div>
        <div>
          <Typography className="font-bold text-gray-600" variant="caption">
            Created by:
          </Typography>
          <div className="flex gap-3">
            <UserAvatar />
            <p>{project.creator.username}</p>
          </div>
        </div>
        <div>
          <Typography className="font-bold text-gray-600" variant="caption">
            Created at: {formatDate(project.created_at)}
          </Typography>
        </div>
      </div>
      <div className="flex-1 p-5 border-l border-solid border-0 border-primary/30">
        <Typography className="font-bold text-gray-600" variant="caption">
          Project Members
        </Typography>
        <ProjectMembers />
      </div>
    </div>
  );
};
