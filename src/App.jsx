import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Chatcontainer from "./components/Chatcontainer";
import Pdfcontainer from "./components/Pdfcontainer";
import Header from "./components/Header";
import Dialog from "./components/Drawer";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FileAddOutlined, FileTextOutlined, CloseOutlined } from "@ant-design/icons";

const App = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewFile, setViewFile] = useState(null);

  const showDrawer = () => {
    console.log("Opening Drawer...");
    setOpen(true);
  };

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    setOriginalFile(selectedFile);
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e) => {
        setViewFile(e.target.result);
      };
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-gray-50">
      <Header showDrawer={showDrawer} />

      {/* Main content */}
      <div className="flex flex-1 w-full max-sm:flex-col overflow-y-auto">
        <Dialog setOpen={setOpen} open={open} />

        {/* Left Division for PDF Viewer */}
        <div className="w-1/2 max-sm:w-full border-r border-gray-200 flex flex-col overflow-y-auto">
          <div className="flex-1 flex flex-col p-4">
            {viewFile ? (
              <div className="flex flex-col h-full max-sm:h-[80vh] border rounded-lg shadow-sm bg-white overflow-hidden">
                {/* PDF Header */}
                <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b">
                  <h2 className="font-medium text-gray-700 truncate max-w-xs">
                    {originalFile?.name || "Document Viewer"}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-blue-50 text-blue-600 p-2 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      <FileAddOutlined />
                      <input
                        id="file-upload"
                        type="file"
                        onChange={handleChange}
                        className="hidden"
                        accept="application/pdf"
                      />
                    </label>
                    <button
                      onClick={() => setViewFile(null)}
                      className="bg-gray-100 text-gray-600 p-2 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                </div>

                {/* PDF Content */}
                <div className="flex-1 overflow-y-auto bg-gray-100 p-2">
                  <Pdfcontainer fileUrl={viewFile} file={originalFile} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full max-sm:h-[80vh] bg-white border-2 border-dashed border-gray-300 rounded-lg">
                <FileTextOutlined style={{ fontSize: "48px", color: "#3b82f6", marginBottom: "16px" }} />
                <h2 className="text-xl font-medium text-gray-700 mb-2">Upload a Document</h2>
                <p className="text-gray-500 mb-4 text-center max-w-xs">
                  Upload a PDF document to analyze tender requirements
                </p>
                <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Select PDF File
                  <input
                    type="file"
                    onChange={handleChange}
                    className="hidden"
                    accept="application/pdf"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Right Division for Chat - Untouched */}
        <Chatcontainer />
      </div>
    </div>
  );
};

export default App;