// src/hooks/useRaces.ts

import { useEffect, useState } from "react";
import { Race } from "@/types/race";

export const useRaces = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/races")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch races");
        return res.json();
      })
      .then(setRaces)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { races, loading, error };
};
