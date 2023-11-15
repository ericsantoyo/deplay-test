"use client"
import { CircularProgress } from "@mui/material";

import { Chart } from "react-google-charts";

type Props = {
  fetchedPlayer: any;
};

const ValueChart = ({ fetchedPlayer }: Props) => {
  const last60DaysData = fetchedPlayer.marketValues.slice(-60);
  const percentage = 0.1;

  const chartData = [
    ["Date", "Market Value"],
    ...last60DaysData.map((entry) => [
      new Date(entry.date).toLocaleDateString("es-EU", {
        month: "short",
        day: "numeric",
      }),
      entry.marketValue,
    ]),
  ];

  const marketValueArray = last60DaysData.map((entry) => entry.marketValue);

  return (
    <Chart
      width={"100%"}
      height={200}
      chartType="AreaChart"
      loader={
        <div className="flex flex-col justify-between items-center gap-4">
          <p className="text-center text-sm">Cargando...</p>
          <CircularProgress color="inherit" className="m-auto" />
        </div>
      }
      data={chartData}
      options={{
        title: "Valor de mercado",
        series: {
          0: { color: "#1a202c" },
        },
        hAxis: {
          title: "Ultimos 60 dias",
          format: "short",
          textPosition: "none",
        },
        vAxis: {
          format: "short",
          tick: 5,
        },
        chartArea: { width: "90%", height: "70%", right: 0 },

        legend: "none",

        titlePosition: "none",
      }}
    />
  );
};

export default ValueChart;
