import { TicketPriority, TicketType } from "@/types/tickets";

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
