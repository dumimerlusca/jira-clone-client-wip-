import { User } from "./users";

export type Project = {
  id: string;
  name: string;
  key: string;
  description: string;
  creator: User;
  created_at: string;
};

export const AllOption = "all";
