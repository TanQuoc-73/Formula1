import React from "react";
import { Team } from "@/types/team";

interface UpdateTeamFormProps {
  team: Team;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  error: string;
}

export const UpdateTeamForm: React.FC<UpdateTeamFormProps> = ({
  team,
  onInputChange,
  onSubmit,
  onCancel,
  error,
}) => (
  <form onSubmit={onSubmit} className="mt-6 max-w-md mx-auto bg-white p-4 rounded shadow-md">
    <h2 className="text-xl font-bold mb-4">Cập nhật đội: {team.teamName}</h2>
    {error && <p className="text-red-600 mb-2">{error}</p>}
    <div className="mb-4">
      <label className="block mb-1">Tên Đội:</label>
      <input
        type="text"
        name="teamName"
        value={team.teamName}
        onChange={onInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Địa điểm:</label>
      <input
        type="text"
        name="baseLocation"
        value={team.baseLocation}
        onChange={onInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Số danh hiệu:</label>
      <input
        type="number"
        name="numChampTitles"
        value={team.numChampTitles}
        onChange={onInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Tổng điểm:</label>
      <input
        type="number"
        name="totalPoints"
        value={team.totalPoints}
        onChange={onInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div className="flex justify-end">
      <button type="button" onClick={onCancel} className="mr-4 text-gray-600 hover:underline">
        Hủy
      </button>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Cập nhật
      </button>
    </div>
  </form>
);