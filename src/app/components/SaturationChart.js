"use client";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

export default function SaturationChart({ data }) {
  const arms = ["North", "South", "East", "West"];
  const times = ["Morning", "Day", "Evening"];

  const datasets = arms.map((arm) => {
    const colorMap = {
      North: "#FF5733",
      South: "#33FF57",
      East: "#3357FF",
      West: "#F1C40F",
    };

    return {
      label: arm,
      data: times.map((time) => {
        const match = data.find((d) => d.arm === arm && d.time === time);
        return match ? match.saturation : 0;
      }),
      borderColor: colorMap[arm],
      backgroundColor: colorMap[arm],
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.4,
      fill: false,
    };
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Saturation Chart
      </h2>
      <Line
        data={{
          labels: times,
          datasets: datasets,
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.dataset.label}: ${context.parsed.y} vehicles/hour`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time of Day",
              },
            },
            y: {
              title: {
                display: true,
                text: "Saturation (vehicles/hour)",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}
