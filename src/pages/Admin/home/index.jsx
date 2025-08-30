import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { userService } from "../../../service/userService";
import { Table, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const AdminHomePage = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  // Xoá user
  const { mutate } = useMutation({
    mutationFn: async (taiKhoan) => {
      // Hiện thông báo loading trước khi gọi API
      message.loading({
        content: `🔄 Đang xoá tài khoản "${taiKhoan}"...`,
        key: "deleteUser",
      });
      return await userService.deleteUser(taiKhoan);
    },
    onSuccess: (_, taiKhoan) => {
      message.success({
        content: `✅ Đã xoá tài khoản "${taiKhoan}"`,
        key: "deleteUser",
        duration: 2,
      });
      qc.invalidateQueries({ queryKey: ["listUser"] });
    },
    onError: (err, taiKhoan) => {
      message.error({
        content: `❌ Xoá thất bại cho tài khoản "${taiKhoan}"`,
        key: "deleteUser",
        duration: 3,
      });
      console.log("Lỗi xoá:", err.response?.data || err.message);
    },
  });

  // Lấy toàn bộ danh sách user
  const { data, error, isLoading } = useQuery({
    queryKey: ["listUser"],
    queryFn: async () => await userService.getListUser(),
  });

  let listUser = data?.data.content || [];

  // 👉 Đảo ngược để user mới nhất nằm đầu
  listUser = [...listUser].reverse();

  // Lọc theo từ khóa (frontend filter)
  const filteredUsers = listUser.filter((user) => {
    if (!keyword) return true;
    const kw = keyword.toLowerCase();
    return (
      user.taiKhoan?.toLowerCase().includes(kw) ||
      user.hoTen?.toLowerCase().includes(kw) ||
      user.email?.toLowerCase().includes(kw) ||
      user.soDT?.toLowerCase().includes(kw)
    );
  });

  const columns = [
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Họ Tên", dataIndex: "hoTen", key: "hoTen" },
    {
      title: "Mã Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },
    { title: "Tài Khoản", dataIndex: "taiKhoan", key: "taiKhoan" },
    { title: "Mật Khẩu", dataIndex: "matKhau", key: "matKhau" },
    { title: "Số Điện Thoại", dataIndex: "soDT", key: "soDT" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/admin/edit/${record.taiKhoan}`)}
            className="bg-blue-400 text-white px-3 py-1 rounded-2xl"
          >
            Sửa
          </button>
          <button
            onClick={() => mutate(record.taiKhoan)}
            className="bg-red-400 text-white px-3 py-1 rounded-2xl"
          >
            Xoá
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h3 className="text-3xl font-bold text-center mb-4">
        Danh sách người dùng
      </h3>

      {/* Thanh tìm kiếm + nút thêm */}
      <div className="mb-4 flex justify-between items-center max-w-xl mx-auto">
        <Search
          placeholder="Nhập tên, tài khoản, email hoặc SĐT..."
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={(value) => setKeyword(value)}
          style={{ flex: 1, marginRight: 16 }}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/admin/add-user")}
        >
          Thêm người dùng
        </Button>
      </div>

      {/* Table danh sách */}
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="taiKhoan"
        loading={isLoading}
      />
    </div>
  );
};

export default AdminHomePage;
