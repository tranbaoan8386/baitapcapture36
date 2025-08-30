import { axiosCustom } from "./config";

export const userService = {
  login: (infoUser) => {
    return axiosCustom.post("/QuanLyNguoiDung/DangNhap", infoUser);
  },
  //đăng kýt
  register: (infoUser) => {
    return axiosCustom.post("/QuanLyNguoiDung/DangKy", infoUser);
  },

  getInfoUser: () => {
    return axiosCustom.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  },

  // Tìm kiếm người dùng
  searchUser: (keyword) => {
    return axiosCustom.get(
      `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${keyword}`
    );
  },

  // Thêm user
  addUser: (newUser) => {
    return axiosCustom.post("/QuanLyNguoiDung/ThemNguoiDung", newUser);
  },

  // Cập nhật user 
  updateInfoUser: (infoUser) => {
    return axiosCustom.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", infoUser);
  },

  // Lấy danh sách user
  getListUser: (maNhom = "GP00") => {
    return axiosCustom.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${maNhom}`);
  },


  // Lấy chi tiết user theo tài khoản
  getUserById: (taiKhoan) => {
    return axiosCustom.post(
      "/QuanLyNguoiDung/LayThongTinNguoiDung",
      null,
      { params: { taiKhoan } }
    );
  },

  // Xóa user
  deleteUser: (taiKhoan) => {
    return axiosCustom.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  },
};
