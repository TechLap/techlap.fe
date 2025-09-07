import "react-datepicker/dist/react-datepicker.css";
import { IProduct, IProductFilter } from "../../../types/backend";
import { useQuery } from "@tanstack/react-query";
import { apiFetchAllBrand, apiFetchAllCategory } from "../../../config/api";
import DataTable from "../../common/data.table";
import ButtonFilter from "../../common/button.filter";
import { NumericFormat } from "react-number-format";
import DateFilter from "../../common/date.picker";
import Access from "../../../pages/auth/route/access";
import { Delete, Edit } from "../../common/icons";
import SelectFilter from "../../common/select.filter";
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

  const { data: brands } = useQuery({
    queryKey: ["fetchAllBrands"],
    queryFn: () => apiFetchAllBrand(`page=1&size=20`),
  });

    const columns = [
      {
        key: "name",
        header: (
          <div className="flex flex-nowrap items-center gap-x-1">
            Tên sản phẩm
            <ButtonFilter
              id="name"
              filters={filters}
              onFilterChange={onFilterChange}
              placeholder="tên sản phẩm"
            />
          </div>
        ),
        render: (row: IProduct) => row.name,
        headerRowclassName: "font-semibold",
      },
      {
        key: "brand",
        header: (
          <div className="flex flex-nowrap items-center gap-x-1">
            Thương hiệu
            <SelectFilter
              id="brand"
              onFilterChange={onFilterChange}
              defaultOption="thương hiệu"
              data={brands}
            />
          </div>
        ),
        render: (row: IProduct) => row.brand?.name,
      },
      {
        key: "price",
        header: (
          <div className="flex flex-nowrap items-center gap-x-1">
            Giá
            <ButtonFilter
              id="price"
              filters={filters}
              onFilterChange={onFilterChange}
              placeholder="price"
            />
          </div>
        ),
        render: (row: IProduct) => <NumericFormat
        value={row.price}
        displayType="text"
        allowLeadingZeros
        thousandSeparator={true}
        suffix={"đ"}
      />,
      },
      {
        key: "stock",
        header: (
          <div className="flex flex-nowrap items-center gap-x-1">
            Số lượng
            <ButtonFilter
              id="stock"
              filters={filters}
              onFilterChange={onFilterChange}
              placeholder="stock"
            />
          </div>
        ),
        render: (row: IProduct) => row.stock,
      },
      {
        key: "status",
        header: (
          <div className="flex flex-nowrap items-center gap-x-1">
            Trạng thái
            <ButtonFilter
              id="status"
              filters={filters}
              onFilterChange={onFilterChange}
              placeholder="status"
            />
          </div>
        ),
        render: (row: IProduct) => row.status,
      },
      {
        key: "actions",
        header: "Thao tác",
        render: (row: IProduct) => (
          <>
            <Access permission={{ name: "Update a product" }} hideChildren>
              <button
                type="button"
                className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-500 dark:hover:text-gray-400 dark:focus:text-gray-400"
                onClick={() => onEditClick(row)}
              >
                <Edit
                  size={16}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 focus:bg-blue-100 rounded-lg"
                />
              </button>
            </Access>
  
            <Access permission={{ name: "Delete a product" }} hideChildren>
              <button
                type="button"
                className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-500 dark:hover:text-gray-400 dark:focus:text-gray-400"
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
        data={productData ?? []}
        columns={columns}
        rowKey={(row: IProduct, index: number) => row.id ?? `product-${index}`}
      />
    );
};

export default ProductTable;
