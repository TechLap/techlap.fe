import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomToast from "../../components/common/toast.message";
import { apiLoginForInternalUser } from "../../config/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserLoginInfo } from "../../redux/slice/account.slice";

const LoginInternalUserPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const dispacth = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, []);

  const handleLoginInternalUser = async (values: any) => {
    const { username, password } = values;
    const response = await apiLoginForInternalUser(username, password);
    if (response.data?.data) {
      localStorage.setItem("access_token", response?.data.data?.access_token);
      dispacth(setUserLoginInfo(response?.data.data?.user));
      toast.success(
        <CustomToast message="Đăng nhập thành công!" className="text-green-600" />
      );
      navigate("/admin/dashboard");
    } else {
      toast.error(
        <CustomToast message="Đăng nhập thất bại!" className="text-red-600" />
      );
    }
  };

  const handleShowPassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    // Validation
    if (value.length > 0 && value.length < 8) {
      setPasswordError("Mật khẩu phải có ít nhất 8 ký tự");
    } else {
      setPasswordError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailErrorElement = document.getElementById("internal-email-error");
    
    if (value.length > 0 && !emailRegex.test(value)) {
      setEmailError("Vui lòng nhập địa chỉ email hợp lệ");
      if (emailErrorElement) {
        emailErrorElement.classList.remove("hidden");
      }
    } else {
      setEmailError("");
      if (emailErrorElement) {
        emailErrorElement.classList.add("hidden");
      }
    }
  };

  return (
  <div className="relative min-h-screen bg-red-500 flex items-center justify-center p-4">
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-20 w-32 h-32 bg-red-400/30 rounded-full animate-[float_6s_ease-in-out_infinite] shadow-[0_0_50px_rgba(220,38,38,0.4)]"></div>
    <div className="absolute top-40 right-32 w-24 h-24 bg-red-300/25 rounded-lg rotate-45 animate-[float_8s_ease-in-out_infinite_reverse] shadow-[0_0_40px_rgba(220,38,38,0.4)]"></div>
    <div className="absolute bottom-32 left-40 w-20 h-20 bg-red-500/30 rounded-full animate-[float_7s_ease-in-out_infinite] shadow-[0_0_35px_rgba(220,38,38,0.4)]"></div>
    <div className="absolute bottom-20 right-20 w-28 h-28 bg-red-400/20 rounded-lg rotate-12 animate-[float_9s_ease-in-out_infinite_reverse] shadow-[0_0_45px_rgba(220,38,38,0.3)]"></div>

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

      <div className="w-full max-w-md relative z-10">
        <div className="internal-card rounded-xl">
          <div className="p-6 space-y-1 pb-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-2">Đăng nhập nội bộ</h2>
              <p className="text-gray-600 text-sm mb-6">
                Bạn chưa có tài khoản?{" "}
                <NavLink to="/register" className="internal-link">
                  Đăng ký tại đây
                </NavLink>
              </p>
            </div>
          </div>
          <div className="px-6 pb-6">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleLoginInternalUser({ username, password });
              }}
              className="space-y-5"
            >
              <button type="button" className="internal-button-secondary">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Đăng nhập với Google
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    HOẶC
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="internal-email" className="text-gray-700 font-medium block">
                  Email
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="email"
                    id="internal-email"
                    name="email"
                    value={username}
                    onChange={handleEmailChange}
                    className="internal-input"
                    required
                    placeholder="Nhập email"
                  />
                </div>
                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="internal-email-error"
                >
                  Vui lòng nhập địa chỉ email hợp lệ
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="internal-password" className="text-gray-700 font-medium block">
                    Mật khẩu
                  </label>
                  <a href="#" className="text-sm internal-link">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <input
                    type={isVisiblePassword ? "text" : "password"}
                    id="internal-password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="internal-input pr-10"
                    required
                    placeholder="Nhập mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={handleShowPassword}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {isVisiblePassword ? (
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-red-600 mt-2">
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="internal-remember"
                  className="internal-checkbox"
                />
                <label htmlFor="internal-remember" className="text-sm text-gray-600">
                  Ghi nhớ tôi
                </label>
              </div>

              <button type="submit" className="internal-button-primary">
                Đăng nhập nội bộ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInternalUserPage;
