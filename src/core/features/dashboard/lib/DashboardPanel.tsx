import { ImportantTicketsCard } from "./cards/ImportantTicketsCard";
import { MyTicketsCard } from "./cards/MyTicketsCard";
import { TicketsStatsPieCard } from "./cards/TicketsStatsPieCard";

export const DashboardPanel = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <TicketsStatsPieCard />
      <MyTicketsCard />
      <ImportantTicketsCard />
    </div>
  );
};
