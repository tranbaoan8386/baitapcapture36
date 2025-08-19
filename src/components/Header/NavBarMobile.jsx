import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { useNavigate } from "react-router-dom";

const NavBarMobile = () => {
  const navigate = useNavigate();   

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        placement="left"
      >
        <button onClick={() => navigate("/login")} className="bg-purple-400">
          Đăng nhập
        </button>
        <br />
        <button onClick={() => navigate("/register")} className="bg-purple-400">
          Đăng ký
        </button>
      </Drawer>
    </>
  );
};

export default NavBarMobile;
