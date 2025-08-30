import React from "react";
import { Table } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { movieService } from "../../../service/movieService";

const MovieAdminPage = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  // Mutation xoá phim
  const { mutate: deleteMovie } = useMutation({
    mutationFn: async (maPhim) => await movieService.deleteMovie(maPhim),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listMovies"] });
    },
  });

  // Query lấy danh sách phim
  const { data, isLoading } = useQuery({
    queryKey: ["listMovies"],
    queryFn: async () => await movieService.getListMovies(),
  });

  const listMovies = data?.data.content || [];

  const columns = [
    { title: "Mã Phim", dataIndex: "maPhim", key: "maPhim" },
    { title: "Tên Phim", dataIndex: "tenPhim", key: "tenPhim" },
    { title: "Bí Danh", dataIndex: "biDanh", key: "biDanh" },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (hinhAnh) => (
        <img
          src={hinhAnh}
          alt="poster"
          className="w-20 h-28 object-cover rounded"
        />
      ),
    },
    {
      title: "Ngày Khởi Chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      render: (ngay) => new Date(ngay).toLocaleDateString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => deleteMovie(record.maPhim)}
            className="bg-red-400 text-white px-3 py-1 rounded-2xl hover:bg-red-500"
          >
            Xoá
          </button>
          <button
            onClick={() => navigate(`/admin/update-movie/${record.maPhim}`)}
            className="bg-yellow-400 text-white px-3 py-1 rounded-2xl hover:bg-yellow-500"
          >
            Sửa
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => navigate(`/admin/create-showtime/${record.maPhim}`)}
          >
            Tạo lịch chiếu
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold">Quản lý phim</h3>
        <button
          onClick={() => navigate("/admin/add-movie")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Thêm phim
        </button>
      </div>

      <Table
        columns={columns}
        dataSource={listMovies}
        rowKey="maPhim"
        loading={isLoading}
      />
    </div>
  );
};

export default MovieAdminPage;
