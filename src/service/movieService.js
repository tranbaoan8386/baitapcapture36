import { axiosCustom } from "./config";

export const movieService = {
  // ================== MOVIE ==================
  // Lấy danh sách phim
  getListMovies: () => {
    return axiosCustom.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },

  // Lấy chi tiết phim
  getMovieDetail: (movieId) => {
    return axiosCustom.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
  },

  // Lấy lịch chiếu của phim
  getMovieShowtimes: (movieId) => {
    return axiosCustom.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`);
  },

  // Lấy thông tin hệ thống rạp
  getCinemaSystems: () => {
    return axiosCustom.get("/QuanLyRap/LayThongTinHeThongRap");
  },

  // Lấy cụm rạp theo hệ thống
  getCinemaClusters: (cinemaSystemId) => {
    return axiosCustom.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinemaSystemId}`);
  },

  // Lấy lịch chiếu toàn hệ thống rạp
  getCinemaShowtimes: () => {
    return axiosCustom.get("/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01");
  },

  // ================== BOOKING ==================
  // Lấy danh sách phòng vé (sơ đồ ghế theo mã lịch chiếu)
  getRoomDetail: (showtimeId) => {
    return axiosCustom.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeId}`);
  },

  // Đặt vé (gửi danh sách ghế + mã lịch chiếu)
  bookTickets: (bookingInfo) => {
    // bookingInfo dạng { maLichChieu: 1234, danhSachVe: [{maGhe: 456, giaVe: 75000}] }
    return axiosCustom.post("/QuanLyDatVe/DatVe", bookingInfo);
  },

  // Tạo lịch chiếu (chức năng admin)
  createShowtime: (showtimeInfo) => {
    // showtimeInfo dạng { maPhim: 123, ngayChieuGioChieu: "...", maRap: "abc", giaVe: 75000 }
    return axiosCustom.post("/QuanLyDatVe/TaoLichChieu", showtimeInfo);
  },
  //thêm phim
  addMovie: (formData) => {
    return axiosCustom.post("/QuanLyPhim/ThemPhimUploadHinh", formData);
  },

  // Cập nhật phim (chức năng admin)
  updateMovie: (formData) => {
    return axiosCustom.post("/QuanLyPhim/CapNhatPhimUpload", formData);
  },

  // Xoá phim (chức năng admin)
  deleteMovie: (maPhim) => {
    return axiosCustom.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  },



};
