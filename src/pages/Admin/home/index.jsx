import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { userService } from "../../../service/userService";
import { Space, Table, Tag } from "antd";
const AdminHomePage = () => {
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (taiKhoan) => await userService.deleteUser(taiKhoan),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["listUser"],
      });
    },
  });

  const { data, error } = useQuery({
    queryKey: ["listUser"],
    queryFn: async () => await userService.getListUser(),
  });

  const listUser = data?.data.content || [];
  console.log("listUser: ", listUser);
  console.log("error: ", error);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Mã Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Mật Khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() => console.log("Sửa:", record)}
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
        );
      },
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div>
      <h3 className="text-3xl font-bold text-center">Danh sách người dùng</h3>
      <Table columns={columns} dataSource={listUser} rowKey="taiKhoan" />
    </div>
  );
};

export default AdminHomePage;
