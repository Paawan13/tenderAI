import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Sendmessage from "./Sendmessage";
import ReactMarkdown from "react-markdown";
import TypingIndicator from "./TypingIndicator.jsx";
import remarkGfm from "remark-gfm";
import Proposal from "./Proposal.jsx";

const Chatcontainer = () => {
  const [chat, setChat] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const dummy = useRef();
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    const userMessage = {
      id: chat.length + 1,
      sender: "user",
      message: input,
      timestamp: new Date().toISOString(),
    };

    setChat((prevChat) => [...prevChat, userMessage]);
    setInput("");
    setisLoading(true);

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: input,
        chat_history: [],
        system_str: "",
        topk_retrieval: 4,
        max_tokens: 1024,
      });

      const aiMessage = {
        id: chat.length + 2,
        sender: "friend",
        message: response.data["chat_history"][0][1],
        timestamp: new Date().toISOString(),
      };

      setChat((prevChat) => [...prevChat, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat]);

  return (
    <div className="w-6/12 max-sm:w-screen flex justify-center flex-col items-center h-full relative">
      <div className="w-full" style={{width: "90%"}}>
    <Proposal />
      </div>
      <div
        style={{ width: "90%", height: "90%" }}
        className="border-2 p-4 rounded flex flex-col justify-end gap-2 bg-gray-100 bg-opacity-75"
      >
        <div className="overflow-y-auto flex flex-col gap-2">
          {chat.length ? (
            chat.map((msg) => (
              <div
                key={msg.id}
                className={`mx-4 my-1 p-3 rounded-lg max-w-7xl ${
                  msg.sender === "user"
                    ? "bg-slate-400 self-end"
                    : "bg-slate-300 self-start"
                }`}
              >
                {msg.sender === "friend" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.message}
                  </ReactMarkdown>
                ) : (
                  <p>{msg.message}</p>
                )}
              </div>
            ))
          ) : (
            <div className="flex h-screen items-center justify-center">
              <h1 className="text-slate-400 italic">Chat here</h1>
            </div>
          )}
          {isloading && (
            <div className="mx-4 my-1 p-3 rounded-lg text-sm max-w-xs bg-slate-300 self-start">
              <TypingIndicator />
            </div>
          )}
          <div ref={dummy}></div>
        </div>
        <Sendmessage
          handleChange={handleChange}
          val={input}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Chatcontainer;
