import { useState } from "react";
import { Team } from "@/types/team";
import { createTeamAPI, updateTeamAPI, deleteTeamAPI } from "@/services/teamsService";
import { predictTeamOutcomeAPI } from "@/services/aiService";
import { INITIAL_TEAM } from "@/constants/team";

interface UseTeamFormReturn {
  editingTeam: Team | null;
  newTeamData: Team | null;
  addingTeam: boolean;
  newTeam: Team;
  updateError: string;
  prediction: { [key: number]: string };
  setAddingTeam: (value: boolean) => void;
  handleEditClick: (team: Team) => void;
  handleDeleteClick: (teamId: number) => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateSubmit: (e: React.FormEvent) => Promise<void>;
  handleAddSubmit: (e: React.FormEvent) => Promise<void>;
  predictTeamOutcome: (team: Team) => Promise<void>;
}

export const useTeamForm = (refreshTeams: () => void): UseTeamFormReturn => {
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [newTeamData, setNewTeamData] = useState<Team | null>(null);
  const [addingTeam, setAddingTeam] = useState(false);
  const [newTeam, setNewTeam] = useState<Team>(INITIAL_TEAM);
  const [updateError, setUpdateError] = useState("");
  const [prediction, setPrediction] = useState<{ [key: number]: string }>({});

  const handleEditClick = (team: Team) => {
    setEditingTeam(team);
    setNewTeamData({ ...team });
  };

  const handleDeleteClick = async (teamId: number) => {
    if (window.confirm("Bạn có chắc muốn xóa đội này không?")) {
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
    const updatedValue = type === "number" ? Number(value) : value;

    if (editingTeam && newTeamData) {
      setNewTeamData({ ...newTeamData, [name]: updatedValue });
    } else {
      setNewTeam({ ...newTeam, [name]: updatedValue });
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamData) return;
    try {
      await updateTeamAPI(newTeamData.teamId, newTeamData);
      setEditingTeam(null);
      setNewTeamData(null);
      setUpdateError("");
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
      setNewTeam(INITIAL_TEAM);
      refreshTeams();
    } catch (err: any) {
      alert("Thêm đội thất bại: " + err.message);
    }
  };

  const predictTeamOutcome = async (team: Team) => {
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

  return {
    editingTeam,
    newTeamData,
    addingTeam,
    newTeam,
    updateError,
    prediction,
    setAddingTeam,
    handleEditClick,
    handleDeleteClick,
    handleInputChange,
    handleUpdateSubmit,
    handleAddSubmit,
    predictTeamOutcome,
  };
};