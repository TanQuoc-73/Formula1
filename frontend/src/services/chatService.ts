import apiClient from "../lib/apiClient";

interface ChatInput {
  message: string;
}

interface ChatResponse {
  response: string;
}

const CHAT_ENDPOINT = "/chat";

export const sendChatMessageAPI = async (input: ChatInput): Promise<string> => {
  const response = await apiClient<ChatResponse>(CHAT_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(input),
  });
  return response.response;
};