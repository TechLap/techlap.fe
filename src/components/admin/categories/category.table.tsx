import "react-datepicker/dist/react-datepicker.css";
import { ICategory, ICategoryFilter } from "../../../types/backend";
import DateFilter from "../../common/date.picker";
import Access from "../../../pages/auth/route/access";
import { Delete, Edit } from "../../common/icons";
import DataTable from "../../common/data.table";
import ButtonFilter from "../../common/button.filter";
import dayjs from "dayjs";

interface IProps {
  categoryData?: ICategory[] | null;
  onEditClick: (category: ICategory) => void;
  onDeleteClick: (category: ICategory) => void;
  filters: ICategoryFilter;
  onFilterChange: (key: string, value: string) => void;
}

const CategoryTable = (props: IProps) => {
  const { categoryData, onEditClick, onDeleteClick, filters, onFilterChange } =
    props;

  const columns = [
    {
      key: "name",
      header: (
        <div className="flex flex-nowrap items-center gap-x-1">
          Tên danh mục
          <ButtonFilter
            id="name"
            filters={filters}
            onFilterChange={onFilterChange}
            placeholder="tên danh mục"
          />
        </div>
      ),
      render: (row: ICategory) => row.name,
      headerRowclassName: "font-semibold",
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
      render: (row: ICategory) =>
        row.createdAt
          ? dayjs(row.createdAt).format("DD/MM/YYYY")
          : "",
    },
    {
      key: "updatedAt",
      header: "Ngày cập nhật",
      render: (row: ICategory) =>
        row.updatedAt
          ? dayjs(row.updatedAt).format("DD/MM/YYYY")
          : "",
    },
    {
      key: "actions",
      header: "Thao tác",
      render: (row: ICategory) => (
        <>
          <Access permission={{ name: "Update a category" }} hideChildren>
            <button
              type="button"
              className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => onEditClick(row)}
            >
              <Edit
                size={16}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 focus:bg-blue-100 rounded-lg"
              />
            </button>
          </Access>

          <Access permission={{ name: "Delete a category" }} hideChildren>
            <button
              type="button"
              className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => onDeleteClick(row)}
            >
              <Delete
                size={16}
                className="text-red-600 hover:text-red-800 hover:bg-red-100 focus:bg-red-100 rounded-lg"
              />
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
      data={categoryData ?? []}
      columns={columns}
      rowKey={(row: ICategory, index: number) => row.id ?? `category-${index}`}
    />
  );
};

export default CategoryTable;
