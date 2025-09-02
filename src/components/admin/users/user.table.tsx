import { useQuery } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { apiFetchAllRole } from "../../../config/api";
import { IUser, IUserFilter } from "../../../types/backend";
import DateFilter from "../../common/date.picker";
import Filter from "../../common/icons/filter";
import Access from "../../../pages/auth/route/access";
import { Delete, Edit } from "../../common/icons";
import DataTable from "../../common/data.table";

interface IProps {
  userData?: IUser[] | null;
  onEditClick: (user: IUser) => void;
  onDeleteClick: (user: IUser) => void;
  filters: IUserFilter;
  onFilterChange: (key: string, value: string) => void;
}

const UserTable = (props: IProps) => {
  const { userData, onEditClick, onDeleteClick, filters, onFilterChange } =
    props;

  const { data: roles } = useQuery({
    queryKey: ["fetchAllRoles"],
    queryFn: () => apiFetchAllRole(`page=1&size=20`),
  });

  const columns = [
    {
      key: "fullName",
      header: (
        <div className="flex flex-nowrap items-center gap-x-1">
          Tên người dùng
          <div className="hs-dropdown [--placement:top] [--auto-close:inside] relative inline-flex">
            <button
              id="hs-dropdown-filter-name"
              type="button"
              className="hs-dropdown-toggle inline-flex items-center gap-x-2 text-gray-400 shadow-2xs focus:text-gray-400 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <Filter
                size={16}
                className="text-gray-400 hover:text-gray-800 hover:bg-gray-50 focus:bg-gray-50 rounded-lg"
              />
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-dropdown-filter-name"
            >
              <input
                className="peer py-2.5 sm:py-1 pe-0 ps-2 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-xs focus:border-t-transparent focus:border-x-transparent focus:border-b-green-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Lọc theo tên"
                value={filters.fullName}
                onChange={(e) => onFilterChange("fullName", e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
      render: (row: IUser) => row.fullName,
      className: "font-semibold",
    },
    { key: "email", header: "Email", render: (row: IUser) => row.email },
    {
      key: "role",
      header: (
        <div className="flex flex-nowrap items-center gap-x-1">
          Vai trò
          <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-left] [--strategy:absolute] relative inline-flex">
            <button
              id="hs-dropdown-filter-role"
              type="button"
              className="hs-dropdown-toggle inline-flex items-center gap-x-2 text-gray-400 shadow-2xs focus:text-gray-400 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <Filter size={16} className="text-gray-400 hover:text-gray-800 hover:bg-gray-50 focus:bg-gray-50 rounded-lg"/>
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-40 bg-white shadow-md rounded-lg p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-dropdown-filter-role"
            >
              <div className="relative">
                <select
                  data-hs-select='{
              "placeholder": "Lọc theo vai trò...",
              "optionAllowEmptyOption": true,
"toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
"toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-green-500 rounded-lg text-start text-xs focus:outline-hidden",
"dropdownClasses": "mt-2 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
"optionClasses": "py-2 px-4 w-full text-xs text-gray-800 cursor-pointer hover:bg-green-50 rounded-lg focus:outline-hidden focus:bg-green-50",
"optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"></span></div>"
}'
                  onChange={(e) => {
                    onFilterChange("role", e.target.value);
                    console.log("Selected role:", e.target.value);
                  }}
                >
                  <option value="">Tất cả vai trò</option>
                  {roles?.data?.data?.result?.map((role) => (
                    <option value={role.id} key={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                  <svg
                    className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
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
                    <path d="m7 15 5 5 5-5"></path>
                    <path d="m7 9 5-5 5 5"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      render: (row: IUser) => row.role?.name,
    },
    {
      key: "phone",
      header: "Số điện thoại",
      render: (row: IUser) => row.phone,
    },
    { key: "address", header: "Địa chỉ", render: (row: IUser) => row.address },
    {
      key: "createdAt",
      header: (
        <div className="flex flex-nowrap items-center gap-x-1">
          Ngày tạo
          <div className="hs-dropdown [--placement:bottom] [--auto-close:inside] relative inline-flex">
            <button
              id="hs-dropdown-filter-createdAt"
              type="button"
              className="hs-dropdown-toggle inline-flex items-center gap-x-2 text-gray-400 shadow-2xs focus:text-gray-400 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-3 shrink-0"
              >
                <path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25A.75.75 0 0 1 8 7.5h2.25a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75ZM5.75 9.5a.75.75 0 0 0 0 1.5H8a.75.75 0 0 0 0-1.5H5.75Z" />
                <path
                  fillRule="evenodd"
                  d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 mt-2 min-w-40 bg-white shadow-md rounded-lg p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-dropdown-filter-createdAt"
            >
              <DateFilter
                value={filters.createdAt ? new Date(filters.createdAt) : null}
                onChange={(date) => {
                  if (date) {
                    const dateString = date.toLocaleDateString("en-CA");
                    onFilterChange("createdAt", dateString);
                  } else {
                    onFilterChange("createdAt", "");
                  }
                }}
              />
            </div>
          </div>
        </div>
      ),
      render: (row: IUser) => row.createdAt,
    },
    { key: "actions", header: "Thao tác", render: (row: IUser) => (
      <>
      <Access permission={{name: "Update a user"}} hideChildren>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-500 dark:hover:text-gray-400 dark:focus:text-gray-400"
          onClick={() => onEditClick(row)}
        >
          <Edit size={16} className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 focus:bg-blue-100 rounded-lg"/>
        </button>
        </Access>

        <Access permission={{name: "Delete a user"}} hideChildren>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-500 dark:hover:text-gray-400 dark:focus:text-gray-400"
          onClick={() => onDeleteClick(row)}
        > 
          <Delete size={16} className="text-red-600 hover:text-red-800 hover:bg-red-100 focus:bg-red-100 rounded-lg"/>
        </button>
        </Access>
        </>
    ),
  },
  ];

  return (
    <DataTable
      data={userData ?? []}
      columns={columns}
      rowKey={(row: IUser) => row.id ?? ""}
    />
  );
};

export default UserTable;
