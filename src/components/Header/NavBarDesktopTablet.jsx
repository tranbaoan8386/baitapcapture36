import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogoutAction } from "../../stores/user";

const NavBarDesktopTablet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.userSlice);

  const handleLogout = () => {
    dispatch(setLogoutAction());
  };

  const menuItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Phim", path: "/movies" },
    { label: "Rạp", path: "/cinemas" },
    { label: "Ưu đãi", path: "/promotions" },
    { label: "Tin tức", path: "/news" },
  ];

  return (
    <nav className="flex items-center gap-8">
      {/* Menu */}
      <ul className="flex items-center gap-6 text-gray-700 font-medium">
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            onClick={() => navigate(item.path)}
            className="cursor-pointer hover:text-orange-500 transition"
          >
            {item.label}
          </li>
        ))}
      </ul>

      {/* User */}
      {infoUser ? (
        <div className="flex items-center gap-3">
          <span
            className="cursor-pointer font-semibold text-gray-800"
            onClick={() => navigate("/info")}
          >
            {infoUser?.hoTen}
          </span>
          <button
            onClick={handleLogout}
            className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Đăng nhập
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-3 py-1 rounded-lg bg-gray-100 border hover:bg-gray-200 transition"
          >
            Đăng ký
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBarDesktopTablet;
