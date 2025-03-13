<<<<<<< HEAD
import React from "react";
import { Drawer } from "antd";
import { MdChatBubbleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Dialog = ({ setOpen, open }) => {
  const onClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <>
      <Drawer
        title="Chats"
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
      >
        {[...Array(5)].map((_, i) => {
          return (
            <div
              style={{ cursor: "pointer" }}
              key={i}
              onClick={() => {
                navigate(`/${i}`);
                setOpen(false);
              }}
              className="flex items-center gap-5 border rounded p-2 my-5"
            >
              <MdChatBubbleOutline />
              hello
            </div>
          );
        })}
      </Drawer>
    </>
  );
};
export default Dialog;
=======
import React, { useState } from "react";
import { Drawer } from "antd";
import { MdChatBubbleOutline, MdClose, MdUploadFile } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Dialog = ({ setOpen, open }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onClose = () => setOpen(false);

  // Hardcoded list of recently updated PDFs
  const recentPdfs = [
    { id: 1, title: "Project_Scope.pdf", date: "Today" },
    { id: 2, title: "Design_Guidelines.pdf", date: "Yesterday" },
    { id: 3, title: "Budget_Plan.pdf", date: "Mar 5" },
    { id: 4, title: "Tech_Specifications.pdf", date: "Mar 3" },
    { id: 5, title: "Marketing_Strategy.pdf", date: "Feb 28" },
  ];

  // Filter PDFs based on search input
  const filteredPdfs = recentPdfs.filter((pdf) =>
    pdf.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Drawer
      title={
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-blue-600"
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
            Recent PDFs
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close drawer"
          >
            <MdClose size={24} className="text-gray-600" />
          </button>
        </div>
      }
      placement="left"
      onClose={onClose}
      open={open}
      width={350}
      styles={{
        header: { padding: "16px 24px", borderBottom: "1px solid #e5e7eb", background: "linear-gradient(to right, #f0f9ff, #e0f2fe)" },
        body: { padding: "16px 24px", backgroundColor: "#f9fafb" },
      }}
    >
      {/* ✅ Enhanced Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search PDFs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
        />
      </div>

      {/* ✅ Enhanced PDF List */}
      <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
        {filteredPdfs.length > 0 ? (
          filteredPdfs.map((pdf) => (
            <div
              key={pdf.id}
              onClick={() => {
                navigate(`/pdf/${pdf.id}`);
                setOpen(false);
              }}
              className="flex items-center gap-4 p-4 my-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <MdChatBubbleOutline className="text-blue-600" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate text-sm">{pdf.title}</p>
                <p className="text-xs text-gray-500 mt-1">{pdf.date}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-100 rounded-lg">
            <svg
              className="w-12 h-12 text-gray-400 mb-2"
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
            <p className="text-gray-500 text-sm">No recent PDFs found.</p>
          </div>
        )}
      </div>

      {/* ✅ Enhanced Start New Conversation Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => alert("Upload feature coming soon!")}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <MdUploadFile size={20} />
          Upload New PDF
        </button>
      </div>
    </Drawer>
  );
};

export default Dialog;
>>>>>>> 25c469c (updated frontend)
