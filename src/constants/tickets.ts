import { TicketPriority, TicketStatus, TicketType } from "@/types/tickets";

export const ticketPriorityList = [
  {
    value: TicketPriority.highest,
    label: "highest",
  },
  {
    value: TicketPriority.high,
    label: "high",
  },
  {
    value: TicketPriority.medium,
    label: "medium",
  },
  {
    value: TicketPriority.low,
    label: "low",
  },
  {
    value: TicketPriority.lowest,
    label: "lowest",
  },
];

export const ticketTypeList = [
  { value: TicketType.bug, label: "Bug" },
  { value: TicketType.devOps, label: "DevOps " },
  { value: TicketType.story, label: "Story" },
  { value: TicketType.subTask, label: "Sub-task" },
  { value: TicketType.technicalStory, label: "Technical Story" },
  { value: TicketType.design, label: "Design" },
  { value: TicketType.epic, label: "Epic" },
];

export const ticketStatusColorMap = {
  [TicketStatus.open]: "#67e6dd",
  [TicketStatus.underDevelopment]: "#3e9e98",
  [TicketStatus.underReview]: "#6091d1",
  [TicketStatus.deployedToDev]: "#5f4cd9",
  [TicketStatus.tested]: "#5fba6e",
  [TicketStatus.closed]: "#508058",
};
