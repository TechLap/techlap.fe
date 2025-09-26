import { Laptop, ShoppingCart, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiLogoutForCustomer } from "../../config/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCustomerLogoutAction } from "../../redux/slice/customer.slide";
import CustomToast from "../common/toast.message";

const Header = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.customer.isAuthenticated
  );

  const customerInfo = useAppSelector((state) => state.customer.customer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await apiLogoutForCustomer();
    if (response.data?.statusCode === 200) {
      dispatch(setCustomerLogoutAction())
      navigate("/login");
      toast.success(
        <CustomToast
          message="Đăng xuất thành công"
          className="text-green-600"
        />
      );
    } else {
      toast.error(
        <CustomToast message="Đăng xuất thất bại" className="text-red-600" />
      );
    }
  };

  return (
    <header className="sticky top-0 inset-x-0 z-30 flex flex-col bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-gray-200 text-sm pt-2 shadow-sm">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto mb-2 py-2">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <div>
              <NavLink to="/">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-xl shadow-lg">
                    <Laptop className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      TechLap
                    </h1>
                    <p className="text-sm text-blue-200 font-medium">Thế giới LapTop dành cho bạn</p>
                  </div>
                </div>
              </NavLink>
            </div>

            {/* <div className="relative w-72 hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                <svg
                  className="shrink-0 size-4 text-gray-400"
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <input
                className="py-2 sm:py-2.5 ps-10 pe-4 block w-full border-gray-200 border rounded-full sm:text-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                type="text"
                id="search"
                placeholder="Tìm kiếm sản phẩm..."
              />
            </div> */}
          </div>

          <div className="hidden md:flex flex-row items-center gap-4">
            {isAuthenticated && (
              <NavLink
                to="/cart"
                className="relative hidden py-3 px-4 md:inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {/* Badge số lượng */}
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {customerInfo.totalCart || 0}
                  </span>
                </div>
                Giỏ hàng
              </NavLink>
            )}
            {!isAuthenticated ? (
              <NavLink
                to="/login"
                className="hidden py-3 px-4 md:inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent  text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                <User className="h-5 w-5" />
                Đăng nhập
              </NavLink>

            ) : (
              <div className="hidden hs-dropdown relative md:inline-flex">
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="hs-dropdown-toggle inline-flex items-center gap-x-2 font-medium rounded-full text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  <img
                    className="shrink-0 size-9 rounded-full"
                    src="/images/default-avatar.png"
                    alt="Avatar"
                  />
                </button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="py-2 px-3 border-b border-gray-200 bg-blue-50">
                    <p className="text-xs text-gray-500">Đăng nhập với tư cách</p>
                    <p className="text-xs font-medium text-gray-800">
                      {customerInfo?.fullName || 'Người dùng'}
                    </p>
                  </div>
                  <div className="p-1 space-y-0.5">
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-xs text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                      href="/change-password"
                    >
                      <svg
                        className="shrink-0 size-3.5"
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
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        <path d="M12 15v2" />
                        <path d="M10 19h4" />
                      </svg>
                      Đổi mật khẩu
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-xs text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                      href="/history-order"
                    >
                      <svg
                        className="shrink-0 size-3.5"
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
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                      </svg>
                      Đơn hàng
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-xs text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 w-full"
                    >
                      <svg
                        className="shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                        />
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
