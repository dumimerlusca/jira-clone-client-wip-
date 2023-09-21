import { User } from "@/types/users";

export const AssigneeCell = ({ user }: { user: User | null | undefined }) => {
  if (!user) {
    return <div> - </div>;
  }

  return <div>{user.username}</div>;
};
