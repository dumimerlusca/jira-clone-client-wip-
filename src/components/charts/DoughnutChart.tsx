"use client";

import { Chart, ChartConfiguration, registerables } from "chart.js";
import classNames from "classnames";
import { assign } from "lodash";
import { useCallback, useEffect, useRef } from "react";

const reg = registerables ? registerables : [];
Chart.register(...reg);

type DoughnutChartDatasetType = {
  label?: string;
  data: number[];
  backgroundColor: string[];
  hoverOffset?: number;
};

type DoughnutChartDataType = {
  canvasId: string;
  wrapperClassName?: string;
  datasets: DoughnutChartDatasetType[];
  labels?: string[];
  content?: React.ReactNode;
  cutout?: number;
  tooltip?: (ctx: any) => string;
};

export const DoughnutChart: React.FC<DoughnutChartDataType> = ({
  canvasId,
  wrapperClassName,
  datasets,
  labels = [],
  content,
  cutout = 90,
  tooltip,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"doughnut">>();

  const defaultTooltip = useCallback(
    (context: any) => {
      const label = labels[context.dataIndex];
      if (!label) return context.raw;
      return `${labels[context.dataIndex]}  ${context.raw}`;
    },
    [labels]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasContext = canvasRef.current.getContext("2d");

    if (!canvasContext) return;

    const config: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [...datasets],
      },

      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: tooltip || defaultTooltip,
            },
          },
        },
        cutout: cutout,
      },
    };

    if (!chartRef.current) {
      chartRef.current = new Chart<"doughnut">(canvasContext, config);
      return;
    }

    // If chart exists, update it
    updateChart(chartRef.current, config);
  }, [cutout, datasets, defaultTooltip, labels, tooltip]);

  return (
    <div className={classNames("relative", wrapperClassName)}>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        {content}
      </div>
      <canvas id={canvasId} ref={canvasRef}></canvas>
    </div>
  );
};

function updateChart(
  chart: Chart<"doughnut">,
  config: ChartConfiguration<"doughnut">
) {
  // Update chart options
  if (config.options) {
    chart.options = config.options;
  }

  // Update chart datasets
  if (chart.data.datasets.length !== config.data.datasets.length) {
    // If the nr of datasets is different, reassign the object
    chart.data.datasets = config.data.datasets;
  } else {
    for (let i = 0; i < config.data.datasets.length; i++) {
      const dataset = config.data.datasets[i];
      assign(chart.data.datasets[i], dataset);
    }
  }

  // Update chart labels
  if (chart.data.labels) {
    chart.data.labels = config.data.labels;
  }

  // Re-draw chart
  chart.update();
}
