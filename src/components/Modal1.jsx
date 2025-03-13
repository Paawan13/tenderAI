import React, { useState } from "react";
import axios from "axios";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import TypingIndicator from "./TypingIndicator.jsx";
const Modal1 = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      message: "Hello, I am your tender expert ",
    },
    {
      id: 2,
      sender: "bot",
      message: "How can I help you today?",
    },
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === "") return;
    console.log("render");
    const user = {
      id: messages.length + 1,
      sender: "user",
      message: input,
    };
    setInput("");
    setMessages((prev) => [...prev, user]);
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://7e9d-125-63-116-114.ngrok-free.app/rag_inference",
        {
          query: input,
          chat_history: [],
          system_str: "",
          topk_retrieval: 12,
          max_tokens: 1024,
        }
      );
      const bot = {
        id: messages.length + 2,
        sender: "bot",
        message: data["chat_history"][0][1],
      };
      setMessages((prev) => [...prev, bot]);
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="chat-container border p-4 rounded">
      <div className="chat-messages max-h-80 h-80 overflow-y-auto flex flex-col justify-end gap-2 pb-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mx-4 my-1 p-3 rounded-lg max-w-7xl ${
              msg.sender === "user"
                ? "bg-slate-400 self-end"
                : "bg-slate-300 self-start"
            }`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {msg.message}
            </ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div className="mx-4 my-1 p-3 rounded-lg text-sm max-w-xs bg-slate-300 self-start">
            <TypingIndicator />
          </div>
        )}
      </div>
      <form className="chat-input flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          className="p-2 border rounded outline-none w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default Modal1;
