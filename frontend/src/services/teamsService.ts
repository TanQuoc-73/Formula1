import { Team } from "@/types/team";

// Lấy danh sách đội
export const getTeamsAPI = async (): Promise<Team[]> => {
  const response = await fetch("http://localhost:8080/api/teams", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }

  return response.json();
};

// Thêm đội mới
export const createTeamAPI = async (team: Team): Promise<void> => {
  const response = await fetch("http://localhost:8080/api/teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });

  if (!response.ok) {
    throw new Error("Failed to create team");
  }
};

// Cập nhật đội
export const updateTeamAPI = async (teamId: number, team: Team): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/teams/${teamId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });

  if (!response.ok) {
    throw new Error("Failed to update team");
  }
};

// Xóa đội
export const deleteTeamAPI = async (teamId: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/teams/${teamId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete team");
  }
};