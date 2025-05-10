import { useState, useEffect, useCallback } from "react";
import { Team } from "@/types/team";
import { fetchTeams } from "@/services/teamsService";

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const loadTeams = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTeams();
      setTeams(data);
      setError("");
    } catch (err: any) {
      setError(err.message || "Không thể tải danh sách đội.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  return { teams, loading, error, refreshTeams: loadTeams };
}