import { NavLink } from "react-router-dom";
import Access from "../../pages/auth/route/access";

const SideBar = () => {
  return (
    <div
      id="hs-application-sidebar"
      className="hs-overlay [--auto-close:lg]
    hs-overlay-open:translate-x-0
    -translate-x-full transition-all duration-300 transhtmlForm
    w-40 h-full
    hidden
    fixed inset-y-0 start-0 z-30
    bg-white border-e border-gray-200
    lg:block lg:translate-x-0 lg:end-auto lg:bottom-0"
      tabIndex={-1}
      aria-label="Sidebar"
    >
      <div className="relative flex flex-col h-full max-h-full">
        <div className="px-2 pt-2 flex items-center">
          <NavLink
            className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
            to={"/admin/dashboard"}
          >
            <img
              src="/images/Group.svg"
              alt="Tân Xuân Food Logo"
              className="w-32 max-w-full h-auto mx-auto transition-transform duration-200 hover:scale-105"
            />
          </NavLink>
        </div>

        <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
          <nav
            className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
            data-hs-accordion-always-open
          >
            <ul className="flex flex-col gap-y-1">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" +
                    (isActive ? " bg-gray-100" : "")
                  }
                  to="/admin/dashboard"
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
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Trang chủ
                </NavLink>
              </li>

              <span className="mt-4 text-sm font-semibold text-gray-800 px-2.5 py-2">
                Account
              </span>

              <Access permission={{ name: "Fetch all users" }} hideChildren>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" +
                      (isActive ? " bg-gray-100" : "")
                    }
                    to="/admin/users"
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Nhân viên
                  </NavLink>
                </li>
              </Access>

              <Access permission={{ name: "Fetch all customers" }} hideChildren>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" +
                      (isActive ? " bg-gray-100" : "")
                    }
                    to="/admin/customers"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="size-3.5 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    Khách hàng
                  </NavLink>
                </li>
              </Access>

              <span className="mt-4 text-sm font-semibold text-gray-800 px-2.5 py-2">
                Overview
              </span>

              <Access permission={{ name: "Fetch all products" }} hideChildren>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" +
                      (isActive ? " bg-gray-100" : "")
                    }
                    to="/admin/products"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="size-3.5 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                      />
                    </svg>
                    Sản phẩm
                  </NavLink>
                </li>
              </Access>

              <Access permission={{ name: "Fetch all orders" }} hideChildren>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" +
                      (isActive ? " bg-gray-100" : "")
                    }
                    to="/admin/orders"
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
                  </NavLink>
                </li>
              </Access>

              <Access permission={{ name: "Fetch all suppliers" }} hideChildren>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" +
                      (isActive ? " bg-gray-100" : "")
                    }
                    to="/admin/suppliers"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="size-3.5 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                      />
                    </svg>
                    Nhà cung cấp
                  </NavLink>
                </li>
              </Access>

              <Access
                permission={{ name: "Fetch all categories" }}
                hideChildren
              >
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" +
                      (isActive ? " bg-gray-100" : "")
                    }
                    to="/admin/categories"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="size-3.5 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6h.008v.008H6V6Z"
                      />
                    </svg>
                    Danh mục
                  </NavLink>
                </li>
              </Access>

              <Access
                permission={{ name: "Fetch all permissions" }}
                hideChildren
              >
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" +
                      (isActive ? " bg-gray-100" : "")
                    }
                    to="/admin/permissions"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="size-3.5 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                      />
                    </svg>
                    Quyền hạn
                  </NavLink>
                </li>
              </Access>

              <Access permission={{ name: "Fetch all roles" }} hideChildren>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" +
                      (isActive ? " bg-gray-100" : "")
                    }
                    to="/admin/roles"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="size-3.5 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                      />
                    </svg>
                    Vai trò
                  </NavLink>
                </li>
              </Access>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
