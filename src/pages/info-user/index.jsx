import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { userService } from "../../service/userService";

const schema = yup.object({
  taiKhoan: yup
    .string("Tài khoản phải là chuỗi")
    .trim()
    .required("Vui lòng nhập tài khoản")
    .max(10, "Tài khoản phải nho hon 10 ky tu"),
  matKhau: yup
    .string("Mật khâu phải là chuỗi")
    .required("Vui lòng nhập mật khâu"),
  hoTen: yup
    .string()
    .trim()
    .typeError("Ho ten phải là chuỗi")
    .max(30, "Ho ten phai nho hon 30 ky tu")
    .required("Vui lòng nhập ho ten"),
  email: yup.string("Email phải là chuỗi").required("Vui lòng nhập email"),
  soDT: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(
      /^(?:\+?84|0)(?:3[2-9]|5[25689]|7(?:0|[6-9])|8[1-9]|9[0-9])\d{7}$/,
      "Số điện thoại phải là số việt nam"
    ),
});

const UserInfoPage = () => {
  //         {
  //     "taiKhoan": "bc85movie",
  //     "matKhau": "123456",
  //     "hoTen": "lam tran",
  //     "email": "bc85movie@gmail.com",
  //     "soDT": "0911111111",
  //     "maLoaiNguoiDung": "KhachHang",
  //   }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
    },
  });

  const handleSubmitValueForm = async (dataForm) => {
    console.log("dataForm: ", dataForm);

    try {
      await userService.updateInfoUser({ ...dataForm, maNhom: "GP00" });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchInfoUser = async () => {
    try {
      const response = await userService.getInfoUser();
      console.log("response: ", response);
      const { taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung, maNhom } =
        response.data.content;

      reset({
        taiKhoan,
        matKhau,
        hoTen,
        email,
        soDT,
        maLoaiNguoiDung,
        maNhom,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchInfoUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h3>Thông tin người dùng</h3>

      <div className="border-2 rounded-2xl shadow-2xl p-8">
        <form
          onSubmit={handleSubmit(handleSubmitValueForm)}
          className="space-y-3"
        >
          {/* Tài khoản */}
          <div>
            <p className="w-full">Tài khoản</p>
            <input
              {...register("taiKhoan")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.taiKhoan?.message}</p>
          </div>
          {/* Mật khẩu */}
          <div>
            <p className="w-full">Mật khẩu</p>
            <input
              {...register("matKhau")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.matKhau?.message}</p>
          </div>
          {/* Họ tên */}
          <div>
            <p className="w-full">Họ tên</p>
            <input
              {...register("hoTen")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.hoTen?.message}</p>
          </div>
          {/* Email */}
          <div>
            <p className="w-full">Email</p>
            <input
              {...register("email")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          {/* Số điện thoại */}
          <div>
            <p className="w-full">Số điện thoại</p>
            <input
              {...register("soDT")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.soDT?.message}</p>
          </div>
          {/* Mã người dùng */}

          <div>
            <p className="w-full ">Mã loại người dùng</p>
            <select
              className="border p-2 rounded-2xl"
              {...register("maLoaiNguoiDung")}
            >
              <option value="KhachHang">Khách Hàng</option>
              <option value="QuanTri">Quản Trị</option>
            </select>
          </div>

          <button className="mt-3 bg-purple-400 p-2 rounded text-white">
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoPage;
