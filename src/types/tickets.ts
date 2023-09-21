import { User } from "./users";

export type Ticket = {
  id: string;
  key: string;
  type: TicketType;
  component_id: string;
  created_at: string;
  creator: User;
  description: string;
  assignee: User | null;
  status: TicketStatus;
  story_points: number;
  title: string;
  updated_at: string;
  priority: TicketPriority;
};

export enum TicketPriority {
  highest = 0,
  high = 1,
  medium = 2,
  low = 3,
  lowest = 4,
}

export enum TicketStatus {
  open = "open",
  underDevelopment = "under development",
  underReview = "under review",
  deployedToDev = "deployed to dev",
  tested = "tested",
  closed = "closed",
}

export enum TicketType {
  devOps = "devOps",
  bug = "bug",
  epic = "epic",
  story = "story",
  subTask = "sub-task",
  technicalStory = "technical-story",
  design = "design",
}

export const TicketStatusList = [
  TicketStatus.open,
  TicketStatus.underDevelopment,
  TicketStatus.underReview,
  TicketStatus.deployedToDev,
  TicketStatus.tested,
  TicketStatus.closed,
];
