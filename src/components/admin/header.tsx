import { useNavigate } from "react-router-dom";
import { apiLogout } from "../../config/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLogoutAction } from "../../redux/slice/account.slice";
import { toast } from "react-toastify";
import CustomToast from "../common/toast.message";

const Header = () => {
  const userInfo = useAppSelector((state) => state.account.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await apiLogout();
    if (response.data?.statusCode === 200) {
      dispatch(setLogoutAction());
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
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-20 w-full bg-white border-b border-gray-200 text-sm py-2.5 lg:ps-48">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div className="w-full flex items-center justify-end">
          <div className="flex flex-row items-center gap-3">
            <button
              type="button"
              className="size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg
                className="shrink-0 size-4 text-green-800"
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
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="sr-only">Notifications</span>
            </button>

            <div className="hs-dropdown relative inline-flex">
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
                <div className="py-2 px-3 border-b border-gray-200 bg-green-50">
                  <p className="text-xs text-gray-500">Đăng nhập với tư cách</p>
                  <p className="text-xs font-medium text-gray-800">
                    {userInfo?.name}
                  </p>
                </div>
                <div className="p-1 space-y-0.5">
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-xs text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                    href="#"
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
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                    Thư mới
                  </a>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-xs text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                    href="#"
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
