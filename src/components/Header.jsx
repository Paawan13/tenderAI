import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { app } from "../features/store/fireabse";
import Modal1 from "./Modal1";
import Modal2 from "./Modal2";
import { IoChatbubbleOutline } from "react-icons/io5";
const Header = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const handleOk = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };
  const handleCancel = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };
  const items = [
    {
      key: "1",
      label: (
        <a
          className="flex items-center justify-between gap-2"
          onClick={() => {
            signOut(getAuth(app));
            window.location.reload();
          }}
        >
          <LogoutOutlined />
          logout
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          className="flex items-center justify-between gap-2"
          onClick={() => setIsModalOpen1(true)}
        >
          <IoChatbubbleOutline />
          Chat
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          className="flex items-center justify-between gap-2"
          onClick={() => setIsModalOpen2(true)}
        >
          <SettingOutlined />
          settings
        </a>
      ),
    },
  ];

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <nav>
      <Modal
        className="w-4/5"
        title={isModalOpen1 ? "Chat with AI" : "Settings"}
        open={isModalOpen1 || isModalOpen2}
        onCancel={handleCancel}
        width={800}
        footer={null}
        centered
      >
        {isModalOpen1 ? <Modal1 /> : <Modal2 />}
      </Modal>
      <ul className="flex px-10 py-2 justify-between items-center">
        <li>Tender AI</li>
        <li>
          {!user ? (
            <button
              onClick={() => Navigate("/login")}
              className="py-2 px-3 capitalize rounded-sm bg-gray-300 transition-all duration-75 hover:bg-slate-200"
            >
              login
            </button>
          ) : (
            <Dropdown
              trigger={["click"]}
              menu={{
                items,
              }}
            // placement="bottom"
            >
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
