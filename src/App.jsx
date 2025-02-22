import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Chatcontainer from "./components/Chatcontainer";
import Pdfcontainer from "./components/Pdfcontainer";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  CloseSquareOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { goToNextPage, goToPreviousPage } from "./features/pdf/pdfSlice";
import Dialog from "./components/Drawer";
const App = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const [viewFile, setviewFile] = useState(null);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pdf.currentPage);
  const numPages = useSelector((state) => state.pdf.numPages);

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    setOriginalFile(selectedFile);
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e) => {
        setviewFile(e.target.result);
      };
    }
  };
  return (
    <>
      <div className="flex w-full max-sm:flex-col" style={{ height: "90vh" }}>
        {/* Left Division for PDF Viewer */}
        <div
          style={{ height: "100%" }}
          className="border-r-4 max-sm:border-none max-sm:overflow-visible max-sm:w-screen relative w-2/4 flex flex-col items-end justify-start overflow-auto"
        >
          <button
            className="absolute left-5 max-sm:left-0.5 max-sm:m-0 top-5 ml-5 border-2 px-1 rounded"
            onClick={showDrawer}
          >
            <DoubleRightOutlined />
          </button>
          <Dialog setOpen={setOpen} open={open} />
          {/* Main Container */}
          <div
            className={`flex ${viewFile && `border`
              } rounded-sm flex-col mr-10 w-5/6 mt-1 overflow-hidden`}
          >
            {/* Header with Close and Upload Buttons   */}
            {viewFile && (
              <div className="flex justify-between flex-row-reverse m-2 items-center">
                <button onClick={() => setviewFile(null)}>
                  <CloseSquareOutlined
                    style={{ fontSize: "24px", fontWeight: "lighter" }}
                  />
                </button>
                <label
                  htmlFor="file-upload"
                  className="rounded border p-1 text-sm"
                >
                  Upload
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* PDF Display Area */}
            <div className="flex-grow overflow-auto">
              {viewFile ? (
                <Pdfcontainer fileUrl={viewFile} file={originalFile} />
              ) : (
                <div className="w-full max-w-xs">
                  <label className="text-sm font-medium">PDF</label>
                  <input
                    id="picture"
                    type="file"
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600"
                  />
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            {viewFile && (
              <div className="flex items-center justify-center w-full border-t bg-gray-100">
                <button
                  onClick={() => dispatch(goToPreviousPage())}
                  disabled={currentPage <= 1}
                  className={`my-2 px-2 rounded-md ${currentPage <= 1
                      ? "opacity-50 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                  <LeftOutlined />
                </button>
                <p className="mx-4 text-lg">
                  {currentPage}/{numPages}
                </p>
                <button
                  onClick={() => dispatch(goToNextPage())}
                  disabled={currentPage >= numPages}
                  className={`my-2 px-2 rounded-md ${currentPage >= numPages
                      ? "opacity-50 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                  <RightOutlined />
                </button>
              </div>
            )}
          </div>
        </div>
        <Chatcontainer />
      </div>
    </>
  );
};

export default App;
