import { Team } from "@/types/team";

export async function fetchTeams(): Promise<Team[]> {
  const res = await fetch("http://localhost:8080/api/teams");
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return await res.json();
}

export async function updateTeamAPI(teamId: number, team: Team): Promise<Team> {
  const res = await fetch(`http://localhost:8080/api/teams/${teamId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });
  if (!res.ok) {
    throw new Error(`Failed to update team. Status: ${res.status}`);
  }
  return await res.json();
}

export async function deleteTeamAPI(teamId: number): Promise<void> {
  const res = await fetch(`http://localhost:8080/api/teams/${teamId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete team. Status: ${res.status}`);
  }
}