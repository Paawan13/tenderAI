import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Sendmessage from "./Sendmessage";
import ReactMarkdown from "react-markdown";
import TypingIndicator from "./TypingIndicator.jsx";
import remarkGfm from "remark-gfm";
import { useNavigate, useLocation } from "react-router-dom";

const Chatcontainer = () => {
  const [chat, setChat] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const dummy = useRef();
  const [input, setInput] = useState("");
  const [isSummaryGenerated, setIsSummaryGenerated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isPdfLoading = useSelector((state) => state.pdf.isPdfLoading);

  useEffect(() => {
    if (isPdfLoading) {
      setChat([]);
    }
  }, [isPdfLoading]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

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
      const collectionName = localStorage.getItem("file");
      console.log("Collection name from localStorage:", collectionName);
      console.log("Sending request:", { query: input, collection_name: collectionName });
      const response = await axios.post(
        `https://lyric-emails-treo-background.trycloudflare.com/query?query=${encodeURIComponent(input)}&collection_name=${encodeURIComponent(collectionName || "")}`,
        {},
        { timeout: 10000 }
      );
      console.log("Raw response:", response);
      console.log("Response data:", response.data);
      const aiMessage = {
        id: chat.length + 2,
        sender: "friend",
        message: response.data.response || response.data.answer || response.data.message || "No response from server",
        timestamp: new Date().toISOString(),
      };

      setChat((prevChat) => [...prevChat, aiMessage]);
      if (input.toLowerCase().includes("summary")) {
        setIsSummaryGenerated(true);
      }
    } catch (error) {
      console.error("Chat error - Full response:", error.response);
      console.error("Chat error - Data:", error.response?.data);
      console.error("Chat error - Message:", error.message);
      setChat((prevChat) => [
        ...prevChat,
        {
          id: chat.length + 2,
          sender: "friend",
          message: `Error: ${error.message}. Please try again.`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setisLoading(false);
    }
  };

  const handleGenerateProposal = async () => {
    setisLoading(true);
    try {
      const collectionName = localStorage.getItem("file");
      if (!collectionName) {
        throw new Error("No document selected. Please upload a PDF first.");
      }
  
      console.log("Collection name from localStorage:", collectionName);
      console.log("Fetching proposal for:", { collection_name: collectionName });
      const response = await axios.post(
        `https://fame-associate-independently-ict.trycloudflare.com/tender_details`,
        { collection_name: collectionName }, // Ensure this is sent
        { timeout: 10000, headers: { "Content-Type": "application/json" } }
      );
      console.log("Proposal response:", response.data);
  
      navigate("/proposal", { state: { proposal: response.data.proposal || response.data.response || response.data.message || "No proposal generated." } });
    } catch (error) {
      console.error("Proposal error - Full response:", error.response);
      console.error("Proposal error - Data:", error.response?.data);
      console.error("Proposal error - Validation Details:", error.response?.data?.detail);
      console.error("Proposal error - Message:", error.message);
      setChat((prevChat) => [
        ...prevChat,
        {
          id: chat.length + 1,
          sender: "friend",
          message: `Error generating proposal: ${error.message}. Please try again. Collected value: ${localStorage.getItem("file") || 'null'}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat]);

  const handleDownloadSummary = () => {
    if (isSummaryGenerated) {
      console.log("Downloading summary...");
    }
  };

  return (
    <div className="w-6/12 max-sm:w-screen flex justify-center flex-col items-center h-screen relative bg-gray-100">
      <div className="w-full max-w-4xl mt-6" style={{ width: "90%" }}></div>

      <div
        style={{ width: "95%", height: "95%" }}
        className="border border-blue-200 shadow-lg rounded-lg flex flex-col bg-white overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 font-medium flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span className="text-lg">TenderAI Assistant</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              className="bg-gradient-to-b from-white to-blue-50 text-blue-600 px-4 py-2 text-sm rounded-md shadow-md hover:from-blue-50 hover:to-blue-100 hover:shadow-lg transition-all duration-200 border border-blue-100 font-medium flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"
                />
              </svg>
              Summary
            </button>
            <button
              onClick={handleGenerateProposal}
              className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center gap-2 ${
                location.pathname === "/proposal"
                  ? "bg-white text-blue-600 font-semibold border border-blue-100"
                  : "bg-blue-700 hover:bg-blue-800 text-white"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Proposal
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-6 bg-gray-50 flex flex-col gap-4">
          {isPdfLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-2 flex items-center space-x-3 animate-pulse">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-blue-700 font-medium">Processing your document. Please wait...</span>
            </div>
          )}
          {chat.length ? (
            chat.map((msg) => (
              <div
                key={msg.id}
                className={`my-2 p-4 rounded-lg max-w-xs md:max-w-md lg:max-w-lg shadow-md ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-white border border-blue-100 self-start"
                }`}
              >
                {msg.sender === "friend" ? (
                  <ReactMarkdown
                    className="prose prose-sm max-w-none text-gray-800"
                    remarkPlugins={[remarkGfm]}
                  >
                    {msg.message}
                  </ReactMarkdown>
                ) : (
                  <p>{msg.message}</p>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col h-full items-center justify-center text-center p-6 bg-gray-100 rounded-lg">
              <h1 className="text-gray-500 font-semibold text-lg">Ask me about your document</h1>
              <p className="text-gray-400 text-sm mt-2">
                I can help you understand the tender requirements and provide insights
              </p>
            </div>
          )}
          {isloading && (
            <div className="my-2 p-4 rounded-lg max-w-xs bg-white border border-blue-100 shadow-sm self-start">
              <TypingIndicator />
            </div>
          )}
          <div ref={dummy}></div>
        </div>

        <div className="border-t border-blue-100 p-4 bg-white">
          <Sendmessage
            handleChange={handleChange}
            val={input}
            handleSubmit={handleSubmit}
            isDisabled={isPdfLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatcontainer;