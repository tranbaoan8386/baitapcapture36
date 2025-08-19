import { axiosCustom } from "./config";

export const movieService = {
  getListMovies: () => {
    return axiosCustom.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },

  getMovieDetail: (movieId) => {
    return axiosCustom.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
  },
};
