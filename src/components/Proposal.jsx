import React, { useState, useEffect } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { app } from "../features/store/fireabse";
import Modal1 from "./Modal1";
import Modal2 from "./Modal2";
import { Avatar, Dropdown, Modal } from "antd";
import { IoChatbubbleOutline } from "react-icons/io5";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  MenuOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Proposal = ({ showDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [proposal, setProposal] = useState(""); // State to hold the proposal

  useEffect(() => {
    // Firebase auth state
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    // Get the proposal data from navigation state
    const { state } = location;
    if (state && state.proposal) {
      setProposal(state.proposal);
    } else {
      setProposal("No proposal data available. Please generate a proposal from the chat page.");
    }
  }, [location]);

  const handleOk = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };

  const handleCancel = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };

  const handleDownloadProposal = () => {
    // Generate a Word document with the proposal text
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(proposal)],
            }),
          ],
        },
      ],
    });

    // Convert to blob and trigger download
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Proposal.docx");
    });
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <button
          className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
          onClick={() => {
            signOut(getAuth(app));
            window.location.reload();
          }}
        >
          <LogoutOutlined /> Logout
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
          onClick={() => setIsModalOpen1(true)}
        >
          <IoChatbubbleOutline /> Chat
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
          onClick={() => setIsModalOpen2(true)}
        >
          <SettingOutlined /> Settings
        </button>
      ),
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Modal for Chat and Settings */}
      <Modal
        className="w-4/5"
        title={isModalOpen1 ? "Chat with AI" : "Settings"}
        open={isModalOpen1 || isModalOpen2}
        onCancel={handleCancel}
        width={900}
        footer={null}
        centered
        styles={{
          body: { padding: "24px", backgroundColor: "#f9fafb" },
          header: { background: "linear-gradient(to right, #f0f9ff, #e0f2fe)", padding: "16px 24px" },
        }}
      >
        {isModalOpen1 ? <Modal1 /> : <Modal2 />}
      </Modal>

      {/* Header with Back Icon */}
      <nav className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-4 px-4 sm:px-6 shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-blue-700 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeftOutlined style={{ fontSize: "18px" }} />
            </button>
            <button
              onClick={showDrawer}
              className="p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <MenuOutlined style={{ fontSize: "18px" }} />
            </button>
            <h1 className="text-lg sm:text-xl font-bold truncate">Tender AI</h1>
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="py-2 px-4 rounded-lg bg-white text-blue-600 font-medium transition-all duration-300 hover:bg-blue-50 shadow-md hover:shadow-lg"
              >
                Login
              </button>
            ) : (
              <Dropdown trigger={["click"]} menu={{ items: menuItems }}>
                <Avatar className="cursor-pointer bg-white text-blue-600" icon={<UserOutlined />} />
              </Dropdown>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 max-w-3xl mx-auto p-6 sm:p-8 mt-8 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-blue-600 mx-auto"
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
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-4">Proposal</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-md">
              Here is your generated proposal based on the tender requirements.
            </p>
          </div>

          {/* Display the Proposal */}
          <div className="w-full text-left prose prose-sm max-w-none text-gray-800 mb-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{proposal}</ReactMarkdown>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownloadProposal}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Proposal
          </button>
        </div>
      </div>

      {/* Sticky Footer */}
      <footer className="mt-auto py-4 bg-gray-200 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Tender AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Proposal;