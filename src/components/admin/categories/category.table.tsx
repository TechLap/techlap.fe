import "react-datepicker/dist/react-datepicker.css";
import { ICategory, ICategoryFilter } from "../../../types/backend";
import CategoryRow from "./category.row";
import DateFilter from "../../common/date.picker";

interface IProps {
  categoryData?: ICategory[] | null;
  onEditClick: (category: ICategory) => void;
  onDeleteClick: (category: ICategory) => void;
  filters: ICategoryFilter;
  onFilterChange: (key: string, value: string) => void;
}
  
const CategoryTable = (props: IProps) => {
  const { categoryData, onEditClick, onDeleteClick, filters, onFilterChange } = props;

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-start text-xs font-medium text-gray-500 bg-green-50 uppercase"
                  >
                    <div className="flex flex-nowrap items-center gap-x-1">
                      Tên danh mục
                      <div className="hs-dropdown [--placement:top] [--auto-close:inside] relative inline-flex">
                        <button
                          id="hs-dropdown-filter-name"
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
                            <path d="M14 2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2.172a2 2 0 0 0 .586 1.414l2.828 2.828A2 2 0 0 1 6 9.828v4.363a.5.5 0 0 0 .724.447l2.17-1.085A2 2 0 0 0 10 11.763V9.829a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 0 14 4.172V2Z" />
                          </svg>
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
                            value={filters.name}
                            onChange={(e) =>
                              onFilterChange("name", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-start text-xs font-medium text-gray-500 bg-green-50 uppercase"
                  >
                    <div className="flex flex-nowrap items-center gap-x-1">
                      Trạng thái
                      <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-left] [--strategy:fixed] relative inline-flex">
                        <button
                          id="hs-dropdown-filter-status"
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
                            <path d="M14 2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2.172a2 2 0 0 0 .586 1.414l2.828 2.828A2 2 0 0 1 6 9.828v4.363a.5.5 0 0 0 .724.447l2.17-1.085A2 2 0 0 0 10 11.763V9.829a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 0 14 4.172V2Z" />
                          </svg>
                        </button>

                        <div
                          className="hs-dropdown-menu z-10 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-40 bg-white shadow-md rounded-lg p-2"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="hs-dropdown-filter-status"
                        >
                          <div className="relative">
                            <select
                              data-hs-select='{
                              "placeholder": "Lọc theo trạng thái...",
                              "optionAllowEmptyOption": true,
      "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-green-500 rounded-lg text-start text-xs focus:outline-hidden",
      "dropdownClasses": "mt-2 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
      "optionClasses": "py-2 px-4 w-full text-xs text-gray-800 cursor-pointer hover:bg-green-50 rounded-lg focus:outline-hidden focus:bg-green-50",
      "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"></span></div>"
    }'
                              onChange={(e) => {
                                onFilterChange("active", e.target.value);
                              }}
                            >
                              <option value="">Tất cả trạng thái</option>
                              <option value="true">Hoạt động</option>
                              <option value="false">Tạm ngưng</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-start text-xs font-medium text-gray-500 bg-green-50 uppercase"
                  >
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
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-start text-xs font-medium text-gray-500 bg-green-50 uppercase"
                  >
                    <div className="flex flex-nowrap items-center gap-x-1">
                      Ngày cập nhật
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-end text-xs font-medium text-gray-500 bg-green-50 uppercase"
                  >
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categoryData?.map((category) => (
                  <CategoryRow
                    key={category.id}
                    categoryData={category}
                    onEditClick={() => onEditClick(category)}
                    onDeleteClick={() => onDeleteClick(category)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
