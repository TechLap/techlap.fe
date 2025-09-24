import DataTable from "../../common/data.table";
import { IOrder, IOrderFilter } from "../../../types/backend";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import { Phone, View, Edit } from "../../common/icons";
import Badge from "../../ui/badge";
import ButtonFilter from "../../common/button.filter";
import SelectFilter from "../../common/select.filter";
import DateFilter from "../../common/date.picker";
import { useEffect } from "react";

interface IProps {
  orderData?: IOrder[] | null;
  onViewClick?: (order: IOrder) => void;
  onEditClick?: (order: IOrder) => void;
  filters: IOrderFilter;
  onFilterChange: (key: string, value: string) => void;
}

const OrderTable = (props: IProps) => {
  const { orderData, onViewClick, onEditClick, filters, onFilterChange } = props;

  useEffect(() => {
    if (orderData) {
      (window as any).HSStaticMethods.autoInit(["select", "dropdown"]);
    }
  }, [orderData]);

  const statusOptions = [
      { label: "PENDING", value: "PENDING" },
      { label: "PROCESSING", value: "PROCESSING" },
      { label: "SHIPPING", value: "SHIPPING" },
      { label: "DELIVERED", value: "DELIVERED" },
      { label: "PAID", value: "PAID" },
      { label: "CANCELLED", value: "CANCELLED" },
    ];

  const columns = [
    {
      key: "orderCode",
      header: (
        <div className="flex flex-nowrap items-center gap-x-1">
          Mã đơn hàng
          <ButtonFilter
            id="orderCode"
            filters={filters}
            onFilterChange={onFilterChange}
            placeholder="mã đơn hàng"
          />
        </div>
      ),
      render: (row: IOrder) => row.orderCode,
      headerRowclassName: "font-semibold",
    },
    {
      key: "totalPrice",
      header: "Tổng tiền",
      render: (row: IOrder) => (
        <NumericFormat
          value={row.totalPrice}
          displayType="text"
          allowLeadingZeros
          thousandSeparator={true}
          suffix={"đ"}
        />
      ),
    },
    {
      key: "customer",
      header: (
        <div className="flex flex-nowrap items-center gap-x-1">
          Khách hàng
          <ButtonFilter
            id="customerName"
            filters={filters}
            onFilterChange={onFilterChange}
            placeholder="tên khách hàng"
          />
        </div>
      ),
      render: (row: IOrder) => (
        <div className="flex flex-col leading-tight gap-0.5">
          <span className="text-gray-800">{row.customer?.fullName ?? row.receiverName}</span>
          <span className="text-gray-500 text-[11px] inline-flex items-center gap-1">
            <Phone size={12} className="text-gray-400" />
            {row.customer?.phone ?? row.receiverPhone}
          </span>
        </div>
      ),
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
      render: (row: IOrder) => (row.createdAt ? dayjs(row.createdAt).format("DD/MM/YYYY HH:mm") : ""),
    },
    {
      key: "status",
      header: (
        <div className="flex flex-nowrap items-center gap-x-1">
          Trạng thái đơn hàng
          <SelectFilter
            id="status"
            onFilterChange={onFilterChange}
            defaultOption="trạng thái"
            enumOptions={statusOptions}
          />
        </div>
      ),
      render: (row: IOrder) => {
        const status = (row.status || "").toLowerCase();
        const map: Record<string, { color: "amber" | "green" | "red" | "purple" | "blue" | "gray" }>= {
          pending: { color: "amber" },
          paid: { color: "green" },
          cancelled: { color: "red" },
          processing: { color: "purple" },
          shipping: { color: "blue" },
          delivered: { color: "gray" },
        };
        const color = map[status]?.color ?? "gray";
        return <Badge variant="outline" color={color} content={row.status} />;
      },
    },
    {
      key: "actions",
      header: "Thao tác",
      render: (row: IOrder) => (
        <div className="flex justify-end gap-1">
          <button
            type="button"
            className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => onViewClick && onViewClick(row)}
          >
            <View
              size={16}
              className="text-green-600 hover:text-green-800 hover:bg-green-100 focus:bg-green-100 rounded-lg"
            />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => onEditClick && onEditClick(row)}
          >
            <Edit
              size={16}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 focus:bg-blue-100 rounded-lg"
            />
          </button>
        </div>
      ),
      headerRowclassName: "text-end",
      rowClassName: "text-end",
    },
  ];

  return (
    <DataTable
      data={orderData ?? []}
      columns={columns}
      rowKey={(row: IOrder, index: number) => `${row.id ?? index}`}
    />
  );
};

export default OrderTable;


