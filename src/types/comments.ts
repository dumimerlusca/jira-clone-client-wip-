import { User } from "./users";

export type Comment = {
  ticket_id: string;
  id: string;
  text: string;
  created_at: string;
  updated_at: string;
  author: User;
};
