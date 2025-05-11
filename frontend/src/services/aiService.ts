export const predictTeamOutcomeAPI = async (teamData: {
  teamId: number;
  totalPoints: number;
}): Promise<string> => {
  const response = await fetch("http://localhost:8080/api/ai/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamData),
  });

  if (!response.ok) {
    throw new Error("Failed to predict team outcome");
  }

  return response.text();
};