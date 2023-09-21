import { DEFAULT_AVATAR_URL } from "@/constants/constants";
import { Avatar } from "@mui/material";

export const UserAvatar = ({ src = DEFAULT_AVATAR_URL }: { src?: string }) => {
  return <Avatar alt="" src={src} />;
};
