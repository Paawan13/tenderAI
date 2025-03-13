import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { app } from "../features/store/fireabse";
import Modal1 from "./Modal1";
import Modal2 from "./Modal2";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import axios from "axios";

const Header = ({ showDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const handleOk = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };

  const handleCancel = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };

  const generateWordDocument = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query:
          "Your task is to analyze the tender document and create a compelling proposal that meets all requirements, complies with specified terms. The proposal should adhere to formal and professional language standards.",
        chat_history: [],
        system_str: "",
        topk_retrieval: 12,
        max_tokens: 1024,
      });

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

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Proposal.docx");
      });
    } catch (error) {
      console.error("Error generating document:", error);
    }
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

  return (
    <nav className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-4 px-6 shadow-lg">
      {/* ✅ Enhanced Modal for Chat and Settings */}
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

      {/* ✅ Header Content */}
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Left: Drawer Button & Title (Left unchanged as requested) */}
        <div className="flex items-center gap-4">
          <button
            onClick={showDrawer}
            className="p-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            <MenuOutlined style={{ fontSize: "18px" }} />
          </button>
          <h1 className="text-xl font-bold">Tender AI</h1>
        </div>

        {/* Right: Buttons & User Dropdown */}
        <div className="flex items-center gap-4">
          {/* ✅ Enhanced Download Button (Only on Proposal Page) */}
          {location.pathname === "/proposal" && (
            <button
              onClick={generateWordDocument}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Proposal
            </button>
          )}

          {/* User Login & Dropdown (Left unchanged as requested) */}
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="py-2 px-4 rounded-md bg-white text-blue-600 font-medium transition-all duration-300 hover:bg-blue-50"
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
  );
};

export default Header;