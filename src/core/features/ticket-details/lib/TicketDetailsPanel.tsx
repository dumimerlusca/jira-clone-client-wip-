"use client";

import { UserAvatar } from "@/components/icons/UserAvatar";
import { Button, Stack, Typography } from "@mui/material";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import { TicketActivitySection } from "./TicketActivitySection";
import { AssigneeInput } from "./inputs/AssigneeInput";
import { DescriptionInput } from "./inputs/DescriptionInput";
import { PriorityInput } from "./inputs/PriorityInput";
import { StatusInput } from "./inputs/StatusInput";
import { StoryPointsInput } from "./inputs/StoryPointsInput";
import { TicketTypeInput } from "./inputs/TicketTypeInput";
import { TitleInput } from "./inputs/TitleInput";
import { useTicketDetailsContext } from "./ticket-details-context";

export const TicketDetailsPanel = () => {
  const { ticket } = useTicketDetailsContext();

  return (
    <div className="rounded-lg bg-white">
      <div className="grid grid-cols-3">
        <div className="col-span-2 p-5">
          <div className="flex items-center gap-3 mb-5">
            <TicketTypeInput />
            <Typography className="whitespace-nowrap text-sm text-gray-600">
              {ticket.key}
            </Typography>
          </div>
          <Stack spacing={3}>
            <TitleInput />
            <DescriptionInput />
            <TicketActivitySection />
          </Stack>
        </div>
        <div className="col-span-1  border-l border-solid border-0 border-primary/30 p-5">
          <div className="grid grid-cols-3 gap-y-3">
            <FieldItemName name="Status" />
            <FildItemValueNode className="flex items-center">
              <StatusInput />
            </FildItemValueNode>

            <FieldItemName name="Assignee" />
            <FildItemValueNode>
              <AssigneeInput
                ticketId={ticket.id}
                projectId={ticket.project_id}
                assignee={ticket.assignee}
              />
            </FildItemValueNode>

            <FieldItemName name="Creator" />
            <FildItemValueNode>
              <Button disabled className="flex items-center gap-3">
                <UserAvatar />
                <Typography className="text-md text-gray-900 normal-case">
                  {ticket.creator.username}
                </Typography>
              </Button>
            </FildItemValueNode>

            <FieldItemName name="Priority" />
            <FildItemValueNode className="flex items-center gap-3">
              <PriorityInput ticketId={ticket.id} priority={ticket.priority} />
            </FildItemValueNode>

            <FieldItemName name="Story Points" />
            <FildItemValueNode className="flex items-center gap-3">
              <StoryPointsInput />
            </FildItemValueNode>
          </div>
        </div>
      </div>
    </div>
  );
};

const FieldItemName = ({ name }: { name: string }) => {
  return <p className="font-bold text-gray-600 text-sm col-span-1">{name}</p>;
};

const FildItemValueNode: React.FC<
  PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return <div className={classNames("col-span-2", className)}>{children}</div>;
};
