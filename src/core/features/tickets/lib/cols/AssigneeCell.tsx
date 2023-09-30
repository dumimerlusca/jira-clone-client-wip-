import { UserAvatar } from "@/components/icons";
import { User } from "@/types/users";
import { Typography } from "@mui/material";

export const AssigneeCell = ({ user }: { user: User | null | undefined }) => {
  if (!user) {
    return <div> - </div>;
  }

  return (
    <div className="flex items-center gap-2">
      <UserAvatar className="w-6 h-6" />
      <Typography>{user.username}</Typography>
    </div>
  );
};
