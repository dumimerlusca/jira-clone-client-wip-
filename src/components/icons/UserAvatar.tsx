import { DEFAULT_AVATAR_URL } from "@/constants/constants";
import { Avatar } from "@mui/material";

export const UserAvatar = ({
  src = DEFAULT_AVATAR_URL,
  className,
}: {
  src?: string;
  className?: string;
}) => {
  return <Avatar className={className} alt="" src={src} />;
};
