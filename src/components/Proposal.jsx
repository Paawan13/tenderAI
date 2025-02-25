import React, { useState } from "react";

import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import axios from "axios";
const Proposal = () => {
  function saveDocumentToFile(doc, fileName) {
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, fileName);
    });
  }
  const generateWordDocument = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query:
          "Your task is to analyze the tender document and create a compelling proposal that meets all requirements, complies with specified terms, The proposal should adhere to formal and professional language standards.",
        chat_history: [],
        system_str: "",
        topk_retrieval: 12,
        max_tokens: 1024,
      });
      console.log("🚀 ~ generateWordDocument ~ response:", response);
      const formattedText = response.data["chat_history"][0][1].replace(/\n/g, "\n\n");
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [new TextRun(formattedText)],
              }),
            ],
          },
        ],
      });
      saveDocumentToFile(doc, "Proposal.docx");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      onClick={generateWordDocument}
      className="my-2 p-1 float-end text-white bg-slate-300 rounded transition-transform transform hover:scale-105"
    >
      Proposal
    </button>
  );
};

export default Proposal;
