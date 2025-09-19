import { NavLink, useNavigate } from "react-router-dom";
import { apiRegisterForCustomer } from "../../config/api";
import { toast } from "react-toastify";
import CustomToast from "../../components/common/toast.message";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const RegisterPage = () => {
  const createUserSchema = yup
    .object({
      fullName: yup.string().required("Tên không được để trống"),
      email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      password: yup
        .string()
        .required("Mật khẩu không được để trống")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{12,})/,
          "Mật khẩu phải chứa ít nhất 12 kí tự: bao gồm chữ hoa, chữ thường, số và kí tự đặc biệt"
        ),
      confirmPassword: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([yup.ref("password")], "Mật khẩu nhập lại không khớp"),
      phone: yup
        .string()
        .required("Số địện thoai không được để trống")
        .matches(/(0[3|5|7|8|9])+(\d{8})\b/g, "Số địện thoai không hợp lệ"),
      address: yup
        .string()
        .required("Địa chỉ không được bỏ trống")
    })
    .required();

  type FormValues = yup.InferType<typeof createUserSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(createUserSchema) as any });
  const navigate = useNavigate();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const handleRegister: SubmitHandler<FormValues> = async ({ confirmPassword, ...values }) => {
    const response = await apiRegisterForCustomer(
      values.fullName,
      values.email,
      values.password,
      values.address,
      values.phone
    );
    console.log(values);
    if (response.data?.data?.id) {
      toast.success(
        <CustomToast
          message="Đăng ký thành công!"
          className="text-green-600"
        />
      );
      navigate("/login");
    } else {
      toast.error(
        <CustomToast
          message={response.statusText ?? "Đã xảy ra lỗi!"}
          className="text-red-600"
        />
      );
    }
  };

  const handleShowPassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="absolute pointer-events-none inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/30 rounded-full animate-[float_6s_ease-in-out_infinite] shadow-[0_0_50px_rgba(220,38,38,0.4)]"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-300/25 rounded-lg rotate-45 animate-[float_8s_ease-in-out_infinite_reverse] shadow-[0_0_40px_rgba(220,38,38,0.4)]"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-blue-500/30 rounded-full animate-[float_7s_ease-in-out_infinite] shadow-[0_0_35px_rgba(220,38,38,0.4)]"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-400/20 rounded-lg rotate-12 animate-[float_9s_ease-in-out_infinite_reverse] shadow-[0_0_45px_rgba(220,38,38,0.3)]"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:100px_100px] opacity-10"></div>

        {/* Radial pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px] opacity-10"></div>

        {/* Gradient overlays  */}
        <div className="absolute top-0 left-0 w-96 h-96 
      bg-[radial-gradient(circle_at_center,_rgba(248,113,113,0.2),_rgba(239,68,68,0.15),_rgb(239,68,68))] 
      rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 
      bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.2),_rgba(185,28,28,0.15),_rgb(239,68,68))] 
      rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-xl w-full bg-white border border-gray-200 rounded-xl shadow-2xs">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Đăng ký
            </h1>
            <p className="mt-2 text-base text-gray-600">
              Nếu bạn đã có tài khoản?
              <NavLink
                className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                to={"/login"}
              >
                {" "} Đăng nhập tại đây
              </NavLink>
            </p>
          </div>
          <div className="mt-5">
            <div className="py-3 flex items-center before:flex-1 before:border-t before:border-gray-200">
            </div>
            <form
              onSubmit={handleSubmit(handleRegister)}
            >
              <div className="grid gap-y-4">
                {/* Form Email */}
                <div>
                  <label htmlFor="email" className="block text-base mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Nhập email"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                      <svg
                        className="shrink-0 size-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  </div>
                  <div>
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                {/* End Form Eamil */}

                {/* Form Password */}
                <div>
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <label htmlFor="password" className="block text-base mb-2">
                      Mật khẩu
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={isVisiblePassword ? "text" : "password"}
                      id="password"
                      {...register("password")}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Nhập mật khẩu"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                      <svg
                        className="shrink-0 size-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                        <circle cx="16.5" cy="7.5" r=".5"></circle>
                      </svg>
                    </div>

                    <div className="absolute inset-y-0 end-0 flex items-center pe-2 peer-disabled:opacity-50">
                      <button
                        onClick={handleShowPassword}
                        className="cursor-pointer"
                        type="button"
                        tabIndex={0}
                      >
                        {isVisiblePassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="size-4 shrink-0 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="size-4 shrink-0 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    {errors.password && (
                      <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
                    )}</div>
                </div>
                {/* End Form Password */}

                {/* Form Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-base mb-2">
                    Nhập lại mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={isVisiblePassword ? "text" : "password"}
                      id="confirmPassword"
                      {...register("confirmPassword")}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Nhập lại mật khẩu"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2">
                      <svg
                        className="shrink-0 size-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.4 10c1.5-5 7-7 8.6-7s7.1 2 8.6 7c-1.5 5-7 7-8.6 7S4.9 15 3.4 10Z" />
                      </svg>
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
                {/* End Form Confirm Password */}

                {/* Form FullName */}
                <div>
                  <label htmlFor="fullName" className="block text-base mb-2">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      {...register("fullName")}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Nhập họ và tên"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                      <svg
                        className="shrink-0 size-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
                        <circle cx="9" cy="10" r="3"></circle>
                        <path d="M15 8h4"></path>
                        <path d="M15 12h4"></path>
                      </svg>
                    </div>

                  </div>
                  <div>
                    {errors.fullName && (
                      <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>
                    )}
                  </div>
                </div>
                {/* End Form FullName */}
                {/* Form Address */}
                <div>
                  <label htmlFor="address" className="block text-base mb-2">
                    Địa chỉ
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="address"
                      {...register("address")}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Nhập địa chỉ"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                      <svg
                        className="shrink-0 size-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
                        <circle cx="9" cy="10" r="3"></circle>
                        <path d="M15 8h4"></path>
                        <path d="M15 12h4"></path>
                      </svg>
                    </div>

                  </div>
                  <div>
                    {errors.address && (
                      <p className="text-xs text-red-600 mt-1">{errors.address.message}</p>
                    )}
                  </div>
                </div>
                {/* End Form Address */}
                {/* Form Phone */}
                <div>
                  <label htmlFor="phone" className="block text-base mb-2">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="phone"
                      {...register("phone")}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Nhập số điện thoại"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                      <svg
                        className="shrink-0 size-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 
             19.79 19.79 0 0 1-8.63-3.07 
             19.5 19.5 0 0 1-6-6 
             19.79 19.79 0 0 1-3.07-8.63 
             A2 2 0 0 1 4.11 2h3a2 2 0 0 1 
             2 1.72c.12.81.3 1.6.57 2.35a2 
             2 0 0 1-.45 2.11l-1.27 1.27a16 
             16 0 0 0 6 6l1.27-1.27a2 
             2 0 0 1 2.11-.45c.75.27 1.54.45 
             2.35.57a2 2 0 0 1 1.72 2z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                {/* End Form Phone */}

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-base font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 focus:outline-hidden focus:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
