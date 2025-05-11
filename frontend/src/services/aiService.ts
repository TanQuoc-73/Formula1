export const predictTeamOutcomeAPI = async (teamData: {
  teamId: number;
  totalPoints: number;
}): Promise<string> => {
  console.log("Predict request body:", teamData);
  const response = await fetch("http://localhost:8080/api/ai/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to predict team outcome: ${errorText}`);
  }

  const text = await response.text();
  console.log("Predict response:", text);
  return text;
};