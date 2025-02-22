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
