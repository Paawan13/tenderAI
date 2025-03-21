import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { app, storage } from "../features/store/fireabse";
import {
  setNumPages,
  goToNextPage,
  goToPreviousPage,
  setPdfLoading,
} from "../features/pdf/pdfslice";
import { getAuth } from "firebase/auth";
import axios from "axios";
import "./Pdfcontainer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pdfcontainer = ({ fileUrl, file }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pdf.currentPage);
  const numPages = useSelector((state) => state.pdf.numPages);
  const isPdfLoading = useSelector((state) => state.pdf.isPdfLoading);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.overflow = "auto";
    }
  }, []);

  const onDocumentLoadSuccess = async ({ numPages }) => {
    dispatch(setNumPages(numPages));
    const form = new FormData();
    form.append("file", file);
    const { name } = file;

    dispatch(setPdfLoading(true));

    try {
      const fileName = name
        .split("-")
        .map((part) => part.replace(/[^a-zA-Z0-9]/g, ""))
        .join("");
      console.log("🚀 ~ onDocumentLoadSuccess ~ fileName:", fileName);
      localStorage.setItem("file", fileName);

      const response = await axios.post(
        `${import.meta.env.VITE_UPLOAD_URL}/process?do_ocr=true&do_table_structure=true&do_cell_matching=true&collection_name=${fileName}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("🚀 ~ onDocumentLoadSuccess ~ response:", response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setPdfLoading(false));
    }
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.1));
  };

  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 px-2 sm:px-4 md:px-6 min-h-screen">
      {isPdfLoading && (
        <div className="loading-banner fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white text-center py-3 shadow-md">
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium">Processing document...</span>
          </div>
        </div>
      )}

      <div ref={containerRef} className="w-full max-w-4xl mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 border border-blue-100 overflow-auto">
        {/* Navigation and Zoom Controls */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => dispatch(goToPreviousPage())}
            disabled={currentPage <= 1}
            className="py-2 px-4 rounded-md bg-blue-500 text-white font-medium transition-all duration-300 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleZoomOut}
              className="py-2 px-4 rounded-md bg-gray-500 text-white font-medium transition-all duration-300 hover:bg-gray-600"
            >
              -
            </button>
            <span className="text-sm font-medium text-gray-700">Zoom: {Math.round(scale * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="py-2 px-4 rounded-md bg-gray-500 text-white font-medium transition-all duration-300 hover:bg-gray-600"
            >
              +
            </button>
          </div>
          <button
            onClick={() => dispatch(goToNextPage())}
            disabled={currentPage >= numPages}
            className="py-2 px-4 rounded-md bg-blue-500 text-white font-medium transition-all duration-300 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="pdf-container w-full h-[70vh] relative rounded-md border border-blue-200 flex justify-center items-center overflow-auto bg-gray-50">
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} className="flex justify-center">
            <Page
              pageNumber={currentPage}
              className="pdf-page"
              scale={scale}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default Pdfcontainer;