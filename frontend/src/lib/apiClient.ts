export default async function apiClient(endpoint: string, options: any = {}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  return response.json();
}