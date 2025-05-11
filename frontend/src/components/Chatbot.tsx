"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChatbot } from "@/hooks/useChatbot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Send } from "lucide-react";

export default function Chatbot() {
  const { messages, loading, error, sendMessage } = useChatbot();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-red-500 to-red-700 text-white">
        <CardTitle className="text-lg font-bold">AI Chatbot Assistant</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-72 overflow-y-auto mb-4 p-3 bg-gray-50 rounded-lg shadow-inner space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 italic">
              Bắt đầu cuộc trò chuyện với AI...
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-white text-gray-900 border border-gray-200 shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        {error && (
          <Alert variant="destructive" className="mb-4 text-sm">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn (VD: Predict race 123 with driver 456)"
            disabled={loading}
            className="flex-1 border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}