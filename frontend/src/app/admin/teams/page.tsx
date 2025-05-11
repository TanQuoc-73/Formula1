"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useTeams } from "@/hooks/useTeams";
import { Team, Driver } from "@/types/team";
import { createTeamAPI, updateTeamAPI, deleteTeamAPI } from "@/services/teamsService";
import { predictTeamOutcomeAPI } from "@/services/aiService";

export default function AdminTeamsPage() {
  const { teams, loading, error, refreshTeams } = useTeams();
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [newTeamData, setNewTeamData] = useState<Team | null>(null);
  const [addingTeam, setAddingTeam] = useState(false);
  const [newTeam, setNewTeam] = useState<Team>({
    teamId: 0,
    teamName: "",
    baseLocation: "",
    numChampTitles: 0,
    totalPoints: 0,
    drivers: [],
  });
  const [updateError, setUpdateError] = useState("");
  const [prediction, setPrediction] = useState<{ [key: number]: string }>({});

  const handleEditClick = (team: Team) => {
    setEditingTeam(team);
    setNewTeamData({ ...team });
  };

  const handleDeleteClick = async (teamId: number) => {
    if (confirm("Bạn có chắc muốn xóa đội này không?")) {
      try {
        await deleteTeamAPI(teamId);
        refreshTeams();
      } catch (err: any) {
        alert("Xóa đội thất bại: " + err.message);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (editingTeam && newTeamData) {
      setNewTeamData({
        ...newTeamData,
        [name]: type === "number" ? Number(value) : value,
      });
    } else {
      setNewTeam({
        ...newTeam,
        [name]: type === "number" ? Number(value) : value,
      });
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamData) return;
    try {
      await updateTeamAPI(newTeamData.teamId, newTeamData);
      setEditingTeam(null);
      refreshTeams();
    } catch (err: any) {
      setUpdateError(err.message || "Cập nhật thất bại");
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTeamAPI(newTeam);
      setAddingTeam(false);
      setNewTeam({
        teamId: 0,
        teamName: "",
        baseLocation: "",
        numChampTitles: 0,
        totalPoints: 0,
        drivers: [],
      });
      refreshTeams();
    } catch (err: any) {
      alert("Thêm đội thất bại: " + err.message);
    }
  };

  const handlePredictClick = async (team: Team) => {
    try {
      const result = await predictTeamOutcomeAPI({
        teamId: team.teamId,
        totalPoints: team.totalPoints,
      });
      setPrediction((prev) => ({ ...prev, [team.teamId]: result }));
    } catch (err: any) {
      alert("Dự đoán thất bại: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Quản lý Đội (Admin)</h1>

        {/* Nút thêm đội mới */}
        <button
          onClick={() => setAddingTeam(true)}
          className="mb-6 bg-green-600 text-white px-4 py-2 rounded"
        >
          Thêm Đội Mới
        </button>

        {/* Form thêm đội mới */}
        {addingTeam && (
          <form
            onSubmit={handleAddSubmit}
            className="mb-6 max-w-md mx-auto bg-white p-4 rounded shadow-md"
          >
            <h2 className="text-xl font-bold mb-4">Thêm Đội Mới</h2>
            <div className="mb-4">
              <label className="block mb-1">Tên Đội:</label>
              <input
                type="text"
                name="teamName"
                value={newTeam.teamName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Địa điểm:</label>
              <input
                type="text"
                name="baseLocation"
                value={newTeam.baseLocation}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Số danh hiệu:</label>
              <input
                type="number"
                name="numChampTitles"
                value={newTeam.numChampTitles}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Tổng điểm:</label>
              <input
                type="number"
                name="totalPoints"
                value={newTeam.totalPoints}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setAddingTeam(false)}
                className="mr-4 text-gray-600 hover:underline"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Thêm
              </button>
            </div>
          </form>
        )}

        {/* Hiển thị danh sách đội */}
        {loading && <p>Đang tải danh sách đội...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {teams && teams.length > 0 ? (
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
                        onClick={() => handlePredictClick(team)}
                        className="text-green-600 hover:underline"
                      >
                        Dự đoán
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEditClick(team)}
                      className="mr-2 text-blue-600 hover:underline"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteClick(team.teamId)}
                      className="text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && (
            <p className="text-center text-gray-500">Không tìm thấy đội nào.</p>
          )
        )}

        {/* Form cập nhật đội */}
        {editingTeam && newTeamData && (
          <form
            onSubmit={handleUpdateSubmit}
            className="mt-6 max-w-md mx-auto bg-white p-4 rounded shadow-md"
          >
            <h2 className="text-xl font-bold mb-4">
              Cập nhật đội: {editingTeam.teamName}
            </h2>
            {updateError && <p className="text-red-600 mb-2">{updateError}</p>}
            <div className="mb-4">
              <label className="block mb-1">Tên Đội:</label>
              <input
                type="text"
                name="teamName"
                value={newTeamData.teamName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Địa điểm:</label>
              <input
                type="text"
                name="baseLocation"
                value={newTeamData.baseLocation}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Số danh hiệu:</label>
              <input
                type="number"
                name="numChampTitles"
                value={newTeamData.numChampTitles}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Tổng điểm:</label>
              <input
                type="number"
                name="totalPoints"
                value={newTeamData.totalPoints}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setEditingTeam(null)}
                className="mr-4 text-gray-600 hover:underline"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Cập nhật
              </button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}