"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useTeams } from "@/hooks/useTeams";
import { Team } from "@/types/team";
import { updateTeamAPI, deleteTeamAPI } from "@/services/teamsService";

export default function AdminTeamsPage() {
  const { teams, loading, error, refreshTeams } = useTeams();
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [newTeamData, setNewTeamData] = useState<Team | null>(null);
  const [updateError, setUpdateError] = useState("");

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
    if (newTeamData) {
      setNewTeamData({
        ...newTeamData,
        [e.target.name]:
          e.target.type === "number" ? Number(e.target.value) : e.target.value,
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

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Teams</h1>
        {loading && <p>Đang tải danh sách đội...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {teams && teams.length > 0 ? (
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Team Name</th>
                <th className="px-4 py-2">Base Location</th>
                <th className="px-4 py-2">Champ Titles</th>
                <th className="px-4 py-2">Total Points</th>
                <th className="px-4 py-2">Actions</th>
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
                    <button
                      onClick={() => handleEditClick(team)}
                      className="mr-2 text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(team.teamId)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
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
              <label className="block mb-1">Team Name:</label>
              <input
                type="text"
                name="teamName"
                value={newTeamData.teamName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Base Location:</label>
              <input
                type="text"
                name="baseLocation"
                value={newTeamData.baseLocation}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Champ Titles:</label>
              <input
                type="number"
                name="numChampTitles"
                value={newTeamData.numChampTitles}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Total Points:</label>
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
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}