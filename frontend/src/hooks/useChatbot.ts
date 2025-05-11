import { useState } from "react";
import { sendChatMessageAPI } from "@/services/chatService";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "ai", text: "Xin chào! Tôi là AI, hãy thử nhập: 'Predict race 123 with driver 456'" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Thêm tin nhắn người dùng
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setLoading(true);
    setError(null);

    try {
      const aiResponse = await sendChatMessageAPI({ message });
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (err: any) {
      setError(err.message || "Không thể gửi tin nhắn. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
};