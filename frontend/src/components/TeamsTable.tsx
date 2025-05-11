import React from "react";
import { Team } from "@/types/team";

interface TeamsTableProps {
  teams: Team[];
  prediction: { [key: number]: string };
  onEditClick: (team: Team) => void;
  onDeleteClick: (teamId: number) => void;
  onPredictClick: (team: Team) => void;
}

export const TeamsTable: React.FC<TeamsTableProps> = ({
  teams,
  prediction,
  onEditClick,
  onDeleteClick,
  onPredictClick,
}) => (
  <table className="min-w-full bg-white rounded-lg shadow-md">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2">ID</th>
        <th className="px-4 py-2">Tên Đội</th>
        <th className="px-4 py-2">Địa điểm</th>
        <th className="px-4 py-2">Danh hiệu</th>
        <th className="px-4 py-2">Tổng Điểm</th>
        <th className="px-4 py-2">Tay Đua</th>
        <th className="px-4 py-2">Dự đoán</th>
        <th className="px-4 py-2">Hành động</th>
      </tr>
    </thead>
    <tbody>
      {teams.map((team) => (
        <tr key={team.teamId} className="border-t">
          <td className="px-4 py-2">{team.teamId}</td>
          <td className="px-4 py-2">{team.teamName}</td>
          <td className="px-4 py-2">{team.baseLocation}</td>
          <td className="px-4 py-2">{team.numChampTitles}</td>
          <td className="px-4 py-2">{team.totalPoints}</td>
          <td className="px-4 py-2">
            {team.drivers && team.drivers.length > 0 ? (
              <ul>
                {team.drivers.map((driver) => (
                  <li key={driver.driverId}>
                    {driver.driverName} ({driver.driverPoints} điểm)
                  </li>
                ))}
              </ul>
            ) : (
              "Không có tay đua"
            )}
          </td>
          <td className="px-4 py-2">
            {prediction[team.teamId] ? (
              <p>{prediction[team.teamId]}</p>
            ) : (
              <button
                onClick={() => onPredictClick(team)}
                className="text-green-600 hover:underline"
              >
                Dự đoán
              </button>
            )}
          </td>
          <td className="px-4 py-2">
            <button
              onClick={() => onEditClick(team)}
              className="mr-2 text-blue-600 hover:underline"
            >
              Sửa
            </button>
            <button
              onClick={() => onDeleteClick(team.teamId)}
              className="text-red-600 hover:underline"
            >
              Xóa
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);