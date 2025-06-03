"use client";
import { useEffect, useState } from "react";
import SaturationChart from "./components/SaturationChart";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://63.250.52.19:8078/api/traffic-analysis/intersection")
      .then((res) => res.json())
      .then((json) => {
        const maxSaturation = Math.max(
          ...json.map((row) => Number(row["Saturation (vehicle/hour)"]))
        );
        const newData = json.map((row) => ({
          ...row,
          isMax: Number(row["Saturation (vehicle/hour)"]) === maxSaturation,
        }));
        setData(newData);
      });
  }, []);

  const chartData = data.map((row) => ({
    arm: row.arm.charAt(0).toUpperCase() + row.arm.slice(1),
    time: row.waktu_puncak.includes("Morning")
      ? "Morning"
      : row.waktu_puncak.includes("Day")
      ? "Day"
      : row.waktu_puncak.includes("Evening")
      ? "Evening"
      : row.waktu_puncak,
    saturation: Number(
      String(row["Saturation (vehicle/hour)"]).replace(/[^0-9.]/g, "")
    ),
  }));

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-blue-200 via-cyan-200 to-teal-100">
      <div className="mb-6 mx-auto bg-white rounded-lg shadow-lg p-6 max-w-6xl">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Traffic Analysis Table
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md bg-white text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700 font-semibold">
                <th className="p-2">Time</th>
                <th className="p-2">Arm</th>
                <th className="p-2">Saturation (vehicle/hour)</th>
                <th className="p-2">Flow Ratio</th>
                <th className="p-2">Cycle time(s)</th>
                <th className="p-2">Green Time(s)</th>
                <th className="p-2">Capacity (vehicle/hour)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className={`text-center ${
                    row.isMax
                      ? "bg-yellow-200 font-bold"
                      : i % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="p-2">{row.waktu_puncak}</td>
                  <td className="p-2">{row.arm}</td>
                  <td className="p-2">{row["Saturation (vehicle/hour)"]}</td>
                  <td className="p-2">{row["Flow Ratio"]}</td>
                  <td className="p-2">{row["Cycle time(s)"]}</td>
                  <td className="p-2">{row["Green Time(s)"]}</td>
                  <td className="p-2">{row["Capacity (vehicle/hour)"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <SaturationChart data={chartData} />
      </div>
    </div>
  );
}
