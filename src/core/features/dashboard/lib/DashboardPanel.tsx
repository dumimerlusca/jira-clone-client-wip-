import { Card, CardContent } from "@mui/material";
import { MyTicketsCard } from "./cards/MyTicketsCard";

export const DashboardPanel = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card variant="elevation">
        <CardContent>Pie chart with all statuses of projects</CardContent>
      </Card>
      <MyTicketsCard />
      <Card variant="elevation">
        <CardContent>Important tickets</CardContent>
      </Card>
    </div>
  );
};
