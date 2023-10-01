import { Card, CardContent } from "@mui/material";
import { PropsWithChildren } from "react";

export const DashboardCard = ({ children }: PropsWithChildren) => {
  return (
    <Card>
      <CardContent className="min-h-[300px] h-full flex flex-col">
        {children}
      </CardContent>
    </Card>
  );
};
