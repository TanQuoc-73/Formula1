import { useState, useEffect } from "react";
import { Team } from "@/types/team";
import { getTeamsAPI } from "@/services/teamsService";

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const data = await getTeamsAPI();
      setTeams(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return { teams, loading, error, refreshTeams: fetchTeams };
};