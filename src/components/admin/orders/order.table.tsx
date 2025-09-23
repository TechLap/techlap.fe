import DataTable from "../../common/data.table";
import { IOrder } from "../../../types/backend";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import { Phone, View } from "../../common/icons";
import Badge from "../../ui/badge";

interface IProps {
  orderData?: IOrder[] | null;
  onViewClick?: (order: IOrder) => void;
}

const OrderTable = (props: IProps) => {
  const { orderData, onViewClick } = props;

  const columns = [
    {
      key: "orderCode",
      header: "Mã đơn hàng",
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
      header: "Khách hàng",
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
      header: "Ngày tạo",
      render: (row: IOrder) => (row.createdAt ? dayjs(row.createdAt).format("DD/MM/YYYY HH:mm") : ""),
    },
    {
      key: "status",
      header: "Trạng thái đơn hàng",
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
        <button
          type="button"
          className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => onViewClick && onViewClick(row)}
        >
          <View
            size={16}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 focus:bg-blue-100 rounded-lg"
          />
        </button>
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


