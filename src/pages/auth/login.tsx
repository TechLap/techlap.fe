import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomToast from "../../components/common/toast.message";
import { apiLoginForCustomer } from "../../config/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserLoginInfo } from "../../redux/slice/account.slice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const navigate = useNavigate();
  const dispacth = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (values: any) => {
    const { username, password } = values;
    const response = await apiLoginForCustomer(username, password);
    if (response.data?.data) {
      localStorage.setItem("access_token", response?.data.data?.access_token);
      dispacth(setUserLoginInfo(response?.data.data?.user));
      toast.success(
        <CustomToast message="Đăng nhập thành công!" className="text-green-600" />
      );
      navigate("/");
    } else {
      toast.error(
        <CustomToast message="Đăng nhập thất bại!" className="text-red-600" />
      );
    }
  };

  const handleShowPassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full bg-white border border-gray-200 rounded-xl shadow-2xs">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Đăng nhập
            </h1>
            <p className="mt-2 text-base text-gray-600">
              Bạn chưa có tài khoản?
              <NavLink
                className="text-green-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                to={"/register"}
              >
                Đăng ký tại đây
              </NavLink>
            </p>
          </div>

          <div className="mt-5">
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg
                className="w-4 h-auto"
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
              >
                <path
                  d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                  fill="#4285F4"
                />
                <path
                  d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                  fill="#34A853"
                />
                <path
                  d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                  fill="#FBBC05"
                />
                <path
                  d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                  fill="#EB4335"
                />
              </svg>
              Đăng nhập với Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
              Hoặc
            </div>

            {/* Form */}
            <form
              onSubmit={(event) => {
                event.preventDefault(); // Ngăn form gửi dữ liệu lên URL
                handleLogin({ username, password });
              }}
            >
              <div className="grid gap-y-4">
                {/* Form Group */}
                <div>
                  <label htmlFor="email" className="block text-base mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-green-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
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
                {/* End Form Group */}

                {/* Form Group */}
                <div>
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <label htmlFor="password" className="block text-base mb-2">
                      Mật khẩu
                    </label>
                    <a
                      className="inline-flex items-center gap-x-1 text-base text-green-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                      href="../examples/html/recover-account.html"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={isVisiblePassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-base focus:border-t-transparent focus:border-x-transparent focus:border-b-green-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
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
                {/* End Form Group */}

                {/* Checkbox */}
                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ms-3">
                    <label htmlFor="remember-me" className="text-base">
                      Ghi nhớ tôi
                    </label>
                  </div>
                </div>
                {/* End Checkbox */}

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-base font-medium rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-600 focus:outline-hidden focus:bg-green-600 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
