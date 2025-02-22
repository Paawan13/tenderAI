import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { app, storage } from "../features/store/fireabse";
import {
  setNumPages,
  goToNextPage,
  goToPreviousPage,
} from "../features/pdf/pdfSlice";
import "./Pdfcontainer.css";
import { getAuth } from "firebase/auth";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `
//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pdfcontainer = ({ fileUrl, file }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pdf.currentPage);
  const [isloading, setisLoading] = useState(false);
  const onDocumentLoadSuccess = async ({ numPages }) => {
    dispatch(setNumPages(numPages));
    const form = new FormData();
    form.append("file", file);
    const { name } = file;
    setisLoading(true);
    try {
      const fileName = name
        .split("-")
        .map((part) => part.replace(/[^a-zA-Z0-9]/g, ""))
        .join("");
      console.log("🚀 ~ onDocumentLoadSuccess ~ fileName:", fileName);

      const response = await axios.post(import.meta.env.VITE_UPLOAD_URL, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("🚀 ~ onDocumentLoadSuccess ~ response:", response);
      const response2 = await axios.post(import.meta.env.VITE_NAME_URL, {
        project_name: fileName,
        embed_model: "nvidia/nv-embedqa-e5-v5",
      });
      console.log("🚀 ~ onDocumentLoadSuccess ~ response2:", response2);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      {isloading && (
        <div className="loading-banner fixed top-0 left-0 right-0 bg-gray-800 text-white text-center py-2">
          Loading...
        </div>
      )}
      <div className="w-max mt-4">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("Failed to load PDF:", error)}
        >
          <Page scale={1} pageNumber={currentPage} />
        </Document>
      </div>
    </div>
  );
};

export default Pdfcontainer;
