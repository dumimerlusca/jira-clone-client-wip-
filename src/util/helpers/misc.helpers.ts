import { TicketPriority } from "@/types/tickets";
import { isNil } from "lodash";
import moment from "moment";

export const formatDate = (isoDate: string) => {
  return moment(isoDate).format("lll");
};

export function getTicketPriorityLabel(priority: TicketPriority) {
  for (const key in TicketPriority) {
    const val = TicketPriority[key] as any;

    if (val === priority) {
      return key;
    }
  }

  return String(priority);
}

export function toQueryString(obj: Record<string, any> | undefined) {
  const values: string[] = [];

  if (!obj) return "";

  Object.keys(obj).forEach((key) => {
    const val = obj[key];

    if (isNil(val) || val === "") {
      return;
    }

    const queryVal = `${key}=${val}`;
    values.push(queryVal);
  });

  return values.join("&");
}
