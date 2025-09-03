import { NavLink, useNavigate } from "react-router-dom";
import { apiRegisterForCustomer } from "../../config/api";
import { toast } from "react-toastify";
import CustomToast from "../../components/common/toast.message";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const handleRegister: SubmitHandler<RegisterFormInputs> = async (values) => {

    const response = await apiRegisterForCustomer(values.name, values.email, values.password, values.phone);
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
                      {...register("email", { required: true })}
                      aria-invalid={errors.email ? "true" : "false"}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      required
                      placeholder="Nhập email"
                      aria-describedby="email-error"
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
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Vui lòng nhập địa chỉ email hợp lệ
                  </p>
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
                      {...register("password", { required: true })}
                      aria-invalid={errors.password ? "true" : "false"}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      required
                      aria-describedby="password-error"
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
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="password-error"
                  >
                    Mật khẩu phải có ít nhất 8 ký tự
                  </p>
                </div>
                {/* End Form Password */}

                {/* Form FullName */}
                <div>
                  <label htmlFor="name" className="block text-base mb-2">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: true })}
                      aria-invalid={errors.name ? "true" : "false"}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      required
                      placeholder="Nhập họ và tên"
                      aria-describedby="email-error"
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
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Vui lòng nhập họ và tên hợp lệ
                  </p>
                </div>
                {/* End Form FullName */}

                {/* Form Phone */}
                <div>
                  <label htmlFor="phone" className="block text-base mb-2">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="phone"
                      {...register("phone", { required: true })}
                      aria-invalid={errors.phone ? "true" : "false"}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      required
                      placeholder="Nhập số điện thoại"
                      aria-describedby="email-error"
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
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Vui lòng nhập số điện thoại hợp lệ
                  </p>
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
