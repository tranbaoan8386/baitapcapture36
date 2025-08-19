import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const roleUser = {
  ADMIN: "QuanTri",
  USER: "KhachHang",
};

const AuthCheck = ({ children, isNeedLogin, pagePermission }) => {
  const { infoUser } = useSelector((state) => state.userSlice);

  const location = useLocation();
  // trường hợp mã loại người dùng là admin thì đá về trang admin

  if (
    infoUser?.maLoaiNguoiDung === roleUser.ADMIN &&
    infoUser &&
    !location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/admin" replace />;
  }
  if (
    infoUser?.maLoaiNguoiDung === roleUser.USER &&
    infoUser &&
    pagePermission === roleUser.ADMIN
  ) {
    return <Navigate to="/" replace />;
  }

  //   trường hợp user muốn vào lại trang đăng nhập hoặc đăng ký khi đã login
  if (infoUser && !isNeedLogin) {
    return <Navigate to="/" replace />;
  }

  //   nếu user chưa login thì sẽ đá về trang login với 1 số pages : xem chi tiết
  if (!infoUser && isNeedLogin) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
};

export default AuthCheck;

/*     "taiKhoan": "baoan12",
    "matKhau": "123456", */
