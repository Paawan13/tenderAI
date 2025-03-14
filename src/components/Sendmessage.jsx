import React from "react";
import "./Sendmessage.css";

const Sendmessage = ({ handleChange, handleSubmit, handleSummarize, val, isDisabled, isLoading }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="messageBox">
      <div className="fileUploadWrapper">
        <input name="file" id="file" type="file" />
      </div>

      <input
        id="messageInput"
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Message..."
        required
        value={val}
        onChange={handleChange}
        autoComplete="off"
        disabled={isDisabled || isLoading}
      />

      {/* Send Button */}
      <button id="sendButton" onClick={handleSubmit} disabled={isDisabled || isLoading}>
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 mx-auto text-gray-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        ) : (
          <svg viewBox="0 0 664 663" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              stroke="#6c6c6c"
              strokeWidth="33.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Sendmessage;
