import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, DatePicker, message, Card } from "antd";
import dayjs from "dayjs";
import { movieService } from "../../../service/movieService";

const CreateShowtime = () => {
  const { maPhim } = useParams();
  const navigate = useNavigate();

  const [cinemaSystems, setCinemaSystems] = useState([]);
  const [clusters, setClusters] = useState([]);

  const [form] = Form.useForm();

  // load hệ thống rạp
  useEffect(() => {
    movieService.getCinemaSystems().then((res) => {
      setCinemaSystems(res.data.content);
    });
    form.setFieldsValue({ maPhim });
  }, [maPhim]);

  // chọn hệ thống rạp → load cụm rạp
  const handleSystemChange = async (systemId) => {
    if (!systemId) return;
    const res = await movieService.getCinemaClusters(systemId);
    setClusters(res.data.content);
    form.setFieldsValue({ cluster: "" });
  };

  // submit form
  const handleSubmit = async (values) => {
    try {
      const payload = {
        maPhim: values.maPhim,
        ngayChieuGioChieu: dayjs(values.ngayChieuGioChieu).format(
          "DD/MM/YYYY HH:mm:ss"
        ),
        maRap: values.cluster,
        giaVe: Number(values.giaVe),
      };

      console.log("Payload gửi đi:", payload);

      await movieService.createShowtime(payload);
      message.success("Tạo lịch chiếu thành công!");
      navigate("/admin/movie");
    } catch (err) {
      console.error(" Lỗi tạo lịch chiếu:", err);
      message.error("Tạo lịch chiếu thất bại!");
    }
  };

  return (
    <Card title="Tạo Lịch Chiếu" className="max-w-xl mx-auto mt-6 shadow-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ maPhim }}
      >
        {/* Mã phim */}
        <Form.Item label="Mã Phim" name="maPhim">
          <Input disabled />
        </Form.Item>

        {/* Ngày giờ chiếu */}
        <Form.Item
          label="Ngày Giờ Chiếu"
          name="ngayChieuGioChieu"
          rules={[{ required: true, message: "Vui lòng chọn ngày giờ chiếu!" }]}
        >
          <DatePicker showTime format="DD/MM/YYYY HH:mm" className="w-full" />
        </Form.Item>

        {/* Hệ thống rạp */}
        <Form.Item
          label="Hệ Thống Rạp"
          name="system"
          rules={[{ required: true, message: "Vui lòng chọn hệ thống rạp!" }]}
        >
          <Select
            placeholder="Chọn hệ thống rạp"
            onChange={handleSystemChange}
            options={cinemaSystems.map((system) => ({
              label: system.tenHeThongRap,
              value: system.maHeThongRap,
            }))}
          />
        </Form.Item>

        {/* Cụm rạp */}
        <Form.Item
          label="Cụm Rạp"
          name="cluster"
          rules={[{ required: true, message: "Vui lòng chọn cụm rạp!" }]}
        >
          <Select
            placeholder="Chọn cụm rạp"
            options={clusters.map((cluster) => ({
              label: cluster.tenCumRap,
              value: cluster.maCumRap,
            }))}
          />
        </Form.Item>

        {/* Giá vé */}
        <Form.Item
          label="Giá Vé"
          name="giaVe"
          rules={[{ required: true, message: "Vui lòng nhập giá vé!" }]}
        >
          <Input type="number" placeholder="Nhập giá vé" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Tạo lịch chiếu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateShowtime;
