import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, message, Card } from "antd";
import { userService } from "../../../service/userService";

const { Option } = Select;

const EditUser = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const { taiKhoan } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getUserById(taiKhoan);
        const userData = res.data.content;

        console.log("🔹 Dữ liệu user từ API:", userData);

        setUser(userData);

        // ⚡ Chỉ gọi setFieldsValue sau khi form đã mount
        setTimeout(() => {
          form.setFieldsValue({
            matKhau: userData.matKhau,
            hoTen: userData.hoTen,
            email: userData.email,
            soDT: userData.soDT || "",
            maLoaiNguoiDung: userData.maLoaiNguoiDung,
          });
        }, 0);
      } catch (err) {
        console.error("❌ Fetch user failed:", err);
        message.error("Không tìm thấy người dùng!");
      }
    };

    fetchUser();
  }, [taiKhoan, form]);

  const onFinish = async (values) => {
    console.log("✅ Giá trị form submit:", values);

    try {
      const payload = {
        taiKhoan: user.taiKhoan,
        maNhom: user.maNhom || "GP01",
        hoTen: values.hoTen,
        email: values.email,
        soDT: values.soDT,
        maLoaiNguoiDung: values.maLoaiNguoiDung,
        matKhau: values.matKhau || user.matKhau,
      };

      console.log("🚀 Payload gửi lên BE:", payload);

      const res = await userService.updateInfoUser(payload);

      console.log("✅ Kết quả update:", res.data);
      message.success("Cập nhật người dùng thành công!");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Update error:", err);
      message.error(err.response?.data?.content || "Cập nhật thất bại");
    }
  };

  if (!user) return <div>Đang tải...</div>;

  return (
    <Card
      title="Chỉnh sửa người dùng"
      className="max-w-2xl mx-auto mt-6 shadow"
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Tài khoản">
          <Input
            value={user.taiKhoan}
            readOnly
            style={{ backgroundColor: "#fafafa", color: "#555", opacity: 0.7 }}
          />
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

        {/* ⚡ sửa lại đúng key "soDT" */}
        <Form.Item
          label="Số điện thoại"
          name="soDT"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mã nhóm">
          <Input
            value={user.maNhom}
            readOnly
            style={{ backgroundColor: "#fafafa", color: "#555", opacity: 0.7 }}
          />
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
            Cập nhật người dùng
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditUser;
