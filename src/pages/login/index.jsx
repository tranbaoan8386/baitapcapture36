import React from "react";
import { Button, Form, Input } from "antd";
import { userService } from "../../service/userService";
import { useDispatch } from "react-redux";
import { setInfoUserAction } from "../../stores/user";
import { keysLocalStorage, localStorageUtil } from "../../util/localStorage";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../../asset/Movietimeanimation.json";
import { roleUser } from "../../HOC/AuthCheck";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const responseLogin = await userService.login(values);
      const infoUser = responseLogin.data.content;

      // Lưu vào Redux
      dispatch(setInfoUserAction(infoUser));

      // Lưu vào localStorage
      localStorageUtil.set(keysLocalStorage.INFO_USER, infoUser);

      // Điều hướng dựa trên quyền
      if (infoUser.maLoaiNguoiDung === roleUser.ADMIN) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full mx-auto">
      {/* Animation */}
      <div className="w-full md:w-1/2">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2">
        <h3 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Login
        </h3>

        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="taiKhoan"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="matKhau"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
