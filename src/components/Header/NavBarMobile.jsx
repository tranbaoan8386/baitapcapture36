import React, { useState } from "react";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutAction } from "../../stores/user";

const NavBarMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.userSlice);

  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Phim", path: "/movies" },
    { label: "Rạp", path: "/cinemas" },
    { label: "Ưu đãi", path: "/promotions" },
    { label: "Tin tức", path: "/news" },
  ];

  const handleLogout = () => {
    dispatch(setLogoutAction());
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-2xl text-gray-700">
        <MenuOutlined />
      </button>

      <Drawer
        title="BC85 MOVIE"
        placement="left"
        closable
        onClose={() => setOpen(false)}
        open={open}
      >
        {/* Menu */}
        <ul className="flex flex-col gap-4">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className="cursor-pointer text-lg hover:text-orange-500 transition"
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* User */}
        <div className="mt-6">
          {infoUser ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate("/info");
                  setOpen(false);
                }}
                className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                {infoUser?.hoTen}
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="px-3 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                  setOpen(false);
                }}
                className="px-3 py-2 rounded-lg bg-gray-100 border hover:bg-gray-200 transition"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default NavBarMobile;
