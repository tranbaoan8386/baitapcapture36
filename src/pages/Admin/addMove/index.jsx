import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Switch,
  InputNumber,
  Upload,
  message,
  Card,
} from "antd";
import dayjs from "dayjs";
import { movieService } from "../../../service/movieService";
import { useNavigate } from "react-router-dom"; // <- import useNavigate

const AddMovie = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // <- khởi tạo navigate

  const beforeUploadCheck = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ cho phép file JPG/PNG!");
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File phải nhỏ hơn 2MB!");
      return Upload.LIST_IGNORE;
    }

    console.log("File được chọn:", file); // <- log kiểm tra tồn tại
    setFile(file);
    return false; // ngăn auto upload
  };

  const onFinish = async (values) => {
    try {
      console.log("Form values:", values);

      if (!file) {
        message.error("Vui lòng chọn hình phim!");
        return;
      }

      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("trailer", values.trailer || "");
      formData.append("moTa", values.moTa || "");
      formData.append("maNhom", "GP01");
      formData.append(
        "ngayKhoiChieu",
        values.ngayKhoiChieu
          ? dayjs(values.ngayKhoiChieu).format("DD/MM/YYYY")
          : ""
      );
      formData.append("sapChieu", values.sapChieu || false);
      formData.append("dangChieu", values.dangChieu || false);
      formData.append("hot", values.hot || false);
      formData.append("danhGia", values.danhGia || 5);
      formData.append("File", file, file.name);

      console.log("Gửi formData...", formData);

      await movieService.addMovie(formData);

      message.success("Thêm phim thành công!");
      form.resetFields();
      setFile(null);

      // Điều hướng về trang quản lý phim
      navigate("/admin/movie");
    } catch (err) {
      console.error("Lỗi thêm phim:", err);
      message.error("Có lỗi xảy ra khi thêm phim!");
    }
  };

  return (
    <Card
      title="Thêm phim mới"
      className="max-w-2xl mx-auto mt-5 shadow-lg rounded-lg"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên phim"
          name="tenPhim"
          rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Trailer" name="trailer">
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="moTa">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Ngày khởi chiếu"
          name="ngayKhoiChieu"
          rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item label="Đánh giá" name="danhGia" initialValue={5}>
          <InputNumber min={1} max={10} />
        </Form.Item>

        <Form.Item label="Sắp chiếu" name="sapChieu" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Đang chiếu" name="dangChieu" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Hot" name="hot" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <Upload beforeUpload={beforeUploadCheck} maxCount={1}>
            <Button>Chọn hình</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm phim
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddMovie;
