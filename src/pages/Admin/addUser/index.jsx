import React from "react";
import { Form, Input, Button, Select, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../service/userService";

const { Option } = Select;

const AddUser = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        maNhom: "GP00",
      };
      console.log("🚀 Payload gửi lên BE:", payload);
      await userService.addUser(payload);
      message.success("Thêm người dùng thành công!");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Lỗi thêm user:", err.response?.data);
      message.error(err.response?.data?.content || "Thêm người dùng thất bại");
    }
  };

  return (
    <Card title="Thêm người dùng" className="max-w-2xl mx-auto mt-6 shadow">
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ maNhom: "GP00" }}
      >
        <Form.Item
          label="Tài khoản"
          name="taiKhoan"
          rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Họ tên"
          name="hoTen"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="soDt" // ✅ sửa lại "soDt" để BE nhận đúng
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mã nhóm" name="maNhom">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Loại người dùng"
          name="maLoaiNguoiDung"
          rules={[{ required: true, message: "Vui lòng chọn loại người dùng" }]}
        >
          <Select placeholder="Chọn loại người dùng">
            <Option value="KhachHang">Khách hàng</Option>
            <Option value="QuanTri">Quản trị</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm người dùng
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddUser;
