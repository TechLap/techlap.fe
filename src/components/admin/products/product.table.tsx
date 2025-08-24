import "react-datepicker/dist/react-datepicker.css";
import { IProduct, IProductFilter } from "../../../types/backend";
import ProductRow from "./product.row";
import { useQuery } from "@tanstack/react-query";
import { apiFetchAllCategory, apiFetchAllSupplier } from "../../../config/api";
interface IProps {
  productData?: IProduct[] | null;
  onEditClick: (product: IProduct) => void;
  onDeleteClick: (product: IProduct) => void;
  onViewClick: (product: IProduct) => void;
  filters: IProductFilter;
  onFilterChange: (key: string, value: string) => void;
}

const ProductTable = (props: IProps) => {
  const {
    productData,
    onEditClick,
    onDeleteClick,
    onViewClick,
    filters,
    onFilterChange,
  } = props;

  const { data: categories } = useQuery({
    queryKey: ["fetchAllCategories"],
    queryFn: () => apiFetchAllCategory(`page=1&size=20`),
  });

  const { data: suppliers } = useQuery({
    queryKey: ["fetchAllSuppliers"],
    queryFn: () => apiFetchAllSupplier(`page=1&size=20`),
  });

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
                      Tên sản phẩm
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
                      Danh mục
                      <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-left] [--strategy:fixed] relative inline-flex">
                        <button
                          id="hs-dropdown-filter-category"
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
                          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-40 bg-white shadow-md rounded-lg p-2"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="hs-dropdown-filter-category"
                        >
                          <div className="relative">
                            <select
                              id="hs-select-category"
                              data-hs-select='{
                              "placeholder": "Lọc theo danh mục...",
                              "optionAllowEmptyOption": true,
      "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-green-500 rounded-lg text-start text-xs focus:outline-hidden",
      "dropdownClasses": "mt-2 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
      "optionClasses": "py-2 px-4 w-full text-xs text-gray-800 cursor-pointer hover:bg-green-50 rounded-lg focus:outline-hidden focus:bg-green-50",
      "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"></span></div>"
    }'
                              onChange={(e) => {
                                onFilterChange("category", e.target.value);
                              }}
                            >
                              <option value="">Tất cả danh mục</option>
                              {categories?.data?.data?.result?.map(
                                (category) => (
                                  <option value={category.id} key={category.id}>
                                    {category.name}
                                  </option>
                                )
                              )}
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
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-start text-xs font-medium text-gray-500 bg-green-50 uppercase"
                  >
                    <div className="flex flex-nowrap items-center gap-x-1">
                      Nhà cung cấp
                      <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-left] [--strategy:fixed] relative inline-flex">
                        <button
                          id="hs-dropdown-filter-supplier"
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
                          className="hs-dropdown-menu z-10 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-60 bg-white shadow-md rounded-lg p-2 "
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="hs-dropdown-filter-supplier"
                        >
                          <div className="relative">
                            <select
                              id="hs-select-supplier"
                              data-hs-select='{
                              "placeholder": "Lọc theo nhà cung cấp...",
                              "optionAllowEmptyOption": true,
      "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-green-500 rounded-lg text-start text-xs focus:outline-hidden",
      "dropdownClasses": "mt-2 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
      "optionClasses": "py-2 px-4 w-full text-xs text-gray-800 cursor-pointer hover:bg-green-50 rounded-lg focus:outline-hidden focus:bg-green-50",
      "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"></span></div>"
    }'
                              onChange={(e) => {
                                onFilterChange("supplier", e.target.value);
                              }}
                            >
                              <option value="">Tất cả nhà cung cấp</option>
                              {suppliers?.data?.data?.result.map((supplier) => (
                                <option value={supplier.id} key={supplier.id}>
                                  {supplier.name}
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
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-start text-xs font-medium text-gray-500 bg-green-50 uppercase flex flex-nowrap items-center gap-x-1"
                  >
                    <div className="flex flex-nowrap items-center gap-x-1">
                      Số lượng
                      <div className="hs-dropdown [--placement:top] [--auto-close:inside] relative inline-flex">
                        <button
                          id="hs-dropdown-filter-quantity"
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
                          aria-labelledby="hs-dropdown-filter-quantity"
                        >
                          <input
                            className="peer py-2.5 sm:py-1 pe-0 ps-2 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-xs focus:border-t-transparent focus:border-x-transparent focus:border-b-green-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Lọc theo số lượng"
                            onChange={(e) => {
                              onFilterChange("quantity", e.target.value);
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
                      Đơn vị
                      <div className="hs-dropdown [--placement:top] [--auto-close:inside] relative inline-flex">
                        <button
                          id="hs-dropdown-filter-unit"
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
                          aria-labelledby="hs-dropdown-filter-unit"
                        >
                          <input
                            className="peer py-2.5 sm:py-1 pe-0 ps-2 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-xs focus:border-t-transparent focus:border-x-transparent focus:border-b-green-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Lọc theo đơn vị"
                            onChange={(e) => {
                              onFilterChange("unit", e.target.value);
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
                      Giá
                      <div className="hs-dropdown [--placement:top] [--auto-close:inside] relative inline-flex">
                        <button
                          id="hs-dropdown-filter-price"
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
                          aria-labelledby="hs-dropdown-filter-price"
                        >
                          <input
                            className="peer py-2.5 sm:py-1 pe-0 ps-2 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 sm:text-xs focus:border-t-transparent focus:border-x-transparent focus:border-b-green-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Lọc theo giá (VND)"
                            onChange={(e) => {
                              onFilterChange("price", e.target.value);
                            }}
                          />
                        </div>
                      </div>
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
                {productData?.map((product) => (
                  <ProductRow
                    key={product.id}
                    productData={product}
                    onEditClick={() => onEditClick(product)}
                    onDeleteClick={() => onDeleteClick(product)}
                    onViewClick={() => onViewClick(product)}
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

export default ProductTable;
