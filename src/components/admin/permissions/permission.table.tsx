import "react-datepicker/dist/react-datepicker.css";
import { IPermission, IPermissionFilter } from "../../../types/backend";
import DateFilter from "../../common/date.picker";
import Access from "../../../pages/auth/route/access";
import { Delete, Edit } from "../../common/icons";
import DataTable from "../../common/data.table";
import ButtonFilter from "../../common/button.filter";
import SelectFilter from "../../common/select.filter";
import dayjs from "dayjs";

interface IProps {
  permissionData?: IPermission[] | null;
  onEditClick: (permission: IPermission) => void;
  onDeleteClick: (permission: IPermission) => void;
  filters: IPermissionFilter;
  onFilterChange: (key: string, value: string) => void;
}

const PermissionTable = (props: IProps) => {
  const { permissionData, onEditClick, onDeleteClick, filters, onFilterChange } = props;

  const getColorMethod = (method: string) => {
    switch (method) {
      case "GET":
        return "text-green-600";
      case "POST":
        return "text-amber-600";
      case "PUT":
        return "text-purple-600";
      case "DELETE":
        return "text-red-600";
    }
  };

  const columns = [
    {
      key: "name",
      header: (
        <div className="flex flex-nowrap items-center gap-x-1">
          Tên quyền hạn
          <ButtonFilter
            id="name"
            filters={filters}
            onFilterChange={onFilterChange}
            placeholder="tên quyền hạn"
          />
        </div>
      ),
      render: (row: IPermission) => row.name,
      headerRowclassName: "font-semibold",
    },
    {
      key: "module",
      header: (
        <div className="flex flex-nowrap items-center gap-x-1">
          Module
          <ButtonFilter
            id="module"
            filters={filters}
            onFilterChange={onFilterChange}
            placeholder="module"
          />
        </div>
      ),
      render: (row: IPermission) => row.module.toUpperCase(),
    },
    {
      key: "method",
      header: (
        <div className="flex flex-nowrap items-center gap-x-1">
          Phương thức
          <SelectFilter
            id="method"
            onFilterChange={onFilterChange}
            defaultOption="phương thức"
            data={[
              { id: "GET", name: "GET" },
              { id: "POST", name: "POST" },
              { id: "PUT", name: "PUT" },
              { id: "DELETE", name: "DELETE" },
            ]}
          />
        </div>
      ),
      render: (row: IPermission) => (
        <span className={`${getColorMethod(row.method)} font-medium`}>{row.method.toUpperCase()}</span>
      ),
    },
    {
      key: "apiPath",
      header: (
        <div className="flex flex-nowrap items-center gap-x-1">
          Đường dẫn
          <ButtonFilter
            id="apiPath"
            filters={filters as any}
            onFilterChange={onFilterChange}
            placeholder="đường dẫn"
          />
        </div>
      ),
      render: (row: IPermission) => (row as any).apiPath,
    },
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
      render: (row: IPermission) => row.createdAt ? dayjs(row.createdAt).format("DD/MM/YYYY") : "",
    },
    {
      key: "actions",
      header: "Thao tác",
      render: (row: IPermission) => (
        <>
          <Access permission={{ name: "Update a permission" }} hideChildren>
            <button
              type="button"
              className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => onEditClick(row)}
            >
              <Edit size={16} className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 focus:bg-blue-100 rounded-lg" />
            </button>
          </Access>

          <Access permission={{ name: "Delete a permission" }} hideChildren>
            <button
              type="button"
              className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => onDeleteClick(row)}
            >
              <Delete size={16} className="text-red-600 hover:text-red-800 hover:bg-red-100 focus:bg-red-100 rounded-lg" />
            </button>
          </Access>
        </>
      ),
      headerRowclassName: "text-end",
      rowClassName: "text-end",
    },
  ];

  return (
    <DataTable
      data={permissionData ?? []}
      columns={columns}
      rowKey={(row: IPermission, index: number) => row.id ?? `permission-${index}`}
    />
  );
};

export default PermissionTable;
