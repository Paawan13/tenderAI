import React from "react";
import "./Sendmessage.css";
const Sendmessage = ({ handleChange, handleSubmit, val }) => {
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
        required=""
        value={val}
        onChange={handleChange}
        autoComplete="off"
      />
      <button id="sendButton" onClick={handleSubmit}>
        <svg
          viewBox="0 0 664 663"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            fill="none"
          ></path>
          <path
            d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            stroke="#6c6c6c"
            strokeWidth="33.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Sendmessage;
