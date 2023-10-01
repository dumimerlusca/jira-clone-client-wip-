"use client";

import { useFetchOverallTicketsStats } from "@/api-client/tickets";
import { DoughnutChart } from "@/components/charts/DoughnutChart";
import { ticketStatusColorMap } from "@/constants/tickets";
import { useProjectContext } from "@/context/project-context";
import { Tooltip, Typography } from "@mui/material";
import { sum } from "lodash";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { DashboardCard } from "./DashboardCard";

export const TicketsStatsPieCard = () => {
  const { projectId } = useProjectContext();

  const { data = {}, isLoading } = useFetchOverallTicketsStats(projectId);

  const datasets = useMemo(() => {
    return [
      {
        label: "Test",
        backgroundColor: Object.keys(data).map(
          (key) => (ticketStatusColorMap as any)[key]
        ),
        data: Object.values(data),
      },
    ];
  }, [data]);

  const hasData = useMemo(() => {
    const total = sum(Object.values(data));
    return total !== 0;
  }, [data]);

  const router = useRouter();

  return (
    <DashboardCard>
      <div className="flex gap-3 flex-wrap">
        {Object.keys(data).map((key) => {
          return (
            <Tooltip arrow placement="top" key={key} title="View tickets">
              <button
                onClick={() => {
                  router.push(`/tickets?status=${key}`);
                }}
                className="flex items-center gap-1"
              >
                <Typography className="text-xs whitespace-nowrap">
                  {key + ` (${data[key]})`}
                </Typography>
                <div
                  style={{
                    backgroundColor: (ticketStatusColorMap as any)[key],
                  }}
                  className="w-3 h-3 rounded-sm"
                ></div>
              </button>
            </Tooltip>
          );
        })}
      </div>
      {!hasData && !isLoading && (
        <Typography className="grow flex items-center justify-center">
          No tickets
        </Typography>
      )}
      {hasData && (
        <div className="flex justify-center grow">
          <DoughnutChart
            labels={Object.keys(data)}
            canvasId="canvas-123"
            datasets={datasets}
          />
        </div>
      )}
    </DashboardCard>
  );
};
