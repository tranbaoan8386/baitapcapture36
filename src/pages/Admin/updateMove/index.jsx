import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Switch,
  Upload,
  Button,
  message,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { movieService } from "../../../service/movieService";

const UpdateMovie = () => {
  const { maPhim } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);

  // Lấy thông tin phim
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await movieService.getMovieDetail(maPhim);
        const movie = res.data.content;

        // Set giá trị cho form
        form.setFieldsValue({
          maPhim: movie.maPhim,
          tenPhim: movie.tenPhim,
          biDanh: movie.biDanh,
          moTa: movie.moTa,
          trailer: movie.trailer,
          ngayKhoiChieu: dayjs(movie.ngayKhoiChieu),
          sapChieu: movie.sapChieu,
          danChieu: movie.dangChieu,
          hot: movie.hot,
          danhGia: movie.danhGia,
        });

        // Nếu có hình ảnh, hiển thị trước
        if (movie.hinhAnh) {
          setFileList([
            {
              uid: "-1",
              name: "poster.jpg",
              status: "done",
              url: movie.hinhAnh,
            },
          ]);
        }

        setLoading(false);
      } catch (error) {
        message.error("Lấy thông tin phim thất bại!");
        console.error(error);
      }
    };
    fetchMovie();
  }, [maPhim, form]);

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("maPhim", values.maPhim);
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("trailer", values.trailer);
      formData.append(
        "ngayKhoiChieu",
        dayjs(values.ngayKhoiChieu).format("YYYY-MM-DD")
      );
      formData.append("sapChieu", values.sapChieu ? "true" : "false");
      formData.append("danChieu", values.danChieu ? "true" : "false");
      formData.append("hot", values.hot ? "true" : "false");
      formData.append("danhGia", values.danhGia);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("File", fileList[0].originFileObj);
      }

      await movieService.updateMovie(formData); // gọi API đúng
      message.success("Cập nhật phim thành công!");
      navigate("/admin/movie");
    } catch (error) {
      message.error("Cập nhật phim thất bại!");
      console.error(error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spin size="large" />
      </div>
    );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <Form.Item label="Mã Phim" name="maPhim">
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Tên Phim"
        name="tenPhim"
        rules={[{ required: true, message: "Vui lòng nhập tên phim" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Bí Danh" name="biDanh">
        <Input />
      </Form.Item>

      <Form.Item label="Trailer" name="trailer">
        <Input />
      </Form.Item>

      <Form.Item label="Mô tả" name="moTa">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Ngày Khởi Chiếu"
        name="ngayKhoiChieu"
        rules={[{ required: true, message: "Vui lòng chọn ngày khởi chiếu" }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item label="Sắp Chiếu" name="sapChieu" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="Đang Chiếu" name="danChieu" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="Hot" name="hot" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="Đánh Giá" name="danhGia">
        <InputNumber min={0} max={10} />
      </Form.Item>

      <Form.Item label="Hình Ảnh">
        <Upload
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleFileChange}
          maxCount={1}
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>Chọn File</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Cập Nhật Phim
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateMovie;
