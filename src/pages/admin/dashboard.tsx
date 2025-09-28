import { useEffect, useState } from "react";
import { IDashboard, IOrder } from "../../types/backend";
import { useQuery } from "@tanstack/react-query";
import {
  apiGetDashboard,
  apiFetchAllOrder,
  apiGetRevenueAnalytics,
  apiGetOrderStatusAnalytics,
  apiFetchBestSellerProduct,
} from "../../config/api";
import { NumericFormat } from "react-number-format";
import {
  Users,
  ShoppingBag,
  Package,
  Building2,
  TrendingUp,
  DollarSign,
  BarChart3,
  Zap,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const [dashboardInfo, setDashboardInfo] = useState<IDashboard | null>();

  const { data: info } = useQuery({
    queryKey: ["fetchDashboardInfo"],
    queryFn: () => apiGetDashboard(),
  });

  const { data: recentOrders } = useQuery({
    queryKey: ["fetchRecentOrders"],
    queryFn: () => apiFetchAllOrder("page=1&size=5"),
  });

  const { data: revenueData } = useQuery({
    queryKey: ["fetchMonthlyRevenueAnalytics"],
    queryFn: () => apiGetRevenueAnalytics(2025),
  });

  const { data: orderStatusData } = useQuery({
    queryKey: ["fetchOrderStatusAnalytics"],
    queryFn: () => apiGetOrderStatusAnalytics(),
  });

  const { data: bestSellerProducts } = useQuery({
    queryKey: ["fetchBestSellerProducts"],
    queryFn: () => apiFetchBestSellerProduct(),
  });

  useEffect(() => {
    if (info) {
      setDashboardInfo(info.data.data);
    }
  }, [info]);

  const avgOrderValue = dashboardInfo?.totalIncome
    ? Number((dashboardInfo.totalIncome / dashboardInfo.totalOrderPaid).toFixed(0))
    : 0;

  const convertOrderStatusToChartData = (orderStatusData: any) => {
    if (!orderStatusData?.data?.data) {
      return [];
    }

    const data = orderStatusData.data.data;

    const statusConfig = {
      paid: {
        color: "#10B981", // Xanh lá đậm
        vietnameseName: "Đã thanh toán",
      },
      shipping: {
        color: "#F59E0B", // Cam
        vietnameseName: "Đang giao hàng",
      },
      processing: {
        color: "#3B82F6", // Xanh dương
        vietnameseName: "Đang xử lý",
      },
      pending: {
        color: "#8B5CF6", // Tím
        vietnameseName: "Chờ xử lý",
      },
      delivered: {
        color: "#06B6D4", // Xanh cyan
        vietnameseName: "Đã giao",
      },
      cancelled: {
        color: "#EF4444", // Đỏ
        vietnameseName: "Đã hủy",
      },
    };

    return Object.entries(data)
      .filter(([key, value]) => Number(value) > 0) // Chỉ hiển thị trạng thái có đơn hàng
      .map(([key, value]) => ({
        name: key,
        value: Number(value),
        color:
          statusConfig[key as keyof typeof statusConfig]?.color || "#6B7280",
        vietnameseName:
          statusConfig[key as keyof typeof statusConfig]?.vietnameseName || key,
      }))
      .sort((a, b) => {
        // Ensure a.value and b.value are numbers for correct sorting
        const aValue =
          typeof a.value === "number" ? a.value : Number(a.value) || 0;
        const bValue =
          typeof b.value === "number" ? b.value : Number(b.value) || 0;
        return bValue - aValue;
      }); // Sắp xếp theo số lượng giảm dần
  };

  // Chuyển đổi dữ liệu trạng thái đơn hàng để hiển thị trên chart
  const orderStatusChartData = convertOrderStatusToChartData(orderStatusData);

  return (
    <div className="w-full">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
            <div className="p-4 md:p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-x-2">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs uppercase text-blue-700 font-semibold">
                    Tổng khách hàng
                  </p>
                </div>
                <div className="hs-tooltip">
                  <div className="hs-tooltip-toggle">
                    <svg
                      className="shrink-0 size-4 text-gray-500"
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
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                    <span
                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs"
                      role="tooltip"
                    >
                      The number of daily users
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-800">
                  {dashboardInfo?.totalCustomer}
                </h3>
                <div className="flex items-center text-blue-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Growing</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
            <div className="p-4 md:p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-x-2">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs uppercase text-green-700 font-semibold">
                    Tổng đơn hàng
                  </p>
                </div>
              </div>

              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-bold text-green-800">
                  {dashboardInfo?.totalOrder}
                </h3>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
            <div className="p-4 md:p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-x-2">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs uppercase text-purple-700 font-semibold">
                    Tổng sản phẩm
                  </p>
                </div>
              </div>

              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-bold text-purple-800">
                  {dashboardInfo?.totalProduct}
                </h3>
                <div className="flex items-center text-purple-600">
                  <Zap className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">In Stock</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
            <div className="p-4 md:p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-x-2">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs uppercase text-orange-700 font-semibold">
                    Tổng thương hiệu
                  </p>
                </div>
              </div>

              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-bold text-orange-800">
                  {dashboardInfo?.totalBrand}
                </h3>
                <div className="flex items-center text-orange-600">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Partners</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-4 md:p-5 min-h-102.5 flex flex-col bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500 rounded-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-sm text-emerald-700 font-semibold uppercase tracking-wide">
                    Tổng doanh thu
                  </h2>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-800">
                    <NumericFormat
                      value={dashboardInfo?.totalIncome}
                      displayType="text"
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-emerald-200 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                <span className="text-sm font-medium text-emerald-700">
                  Doanh thu
                </span>
              </div>
            </div>

            <div className="mt-4 h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData?.data?.data}
                  margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#A7F3D0" />
                  <XAxis
                    dataKey="month"
                    stroke="#065F46"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#065F46"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `${Math.round(v / 1_000_000)}m`}
                  />
                  <Tooltip
                    formatter={(v: number) =>
                      new Intl.NumberFormat("vi-VN").format(v) + "đ"
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 md:p-5 min-h-102.5 flex flex-col bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-500 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-sm text-indigo-700 font-semibold uppercase tracking-wide">
                    Giá trị đơn hàng trung bình đã thanh toán
                  </h2>
                  <p className="text-xl sm:text-2xl font-bold text-indigo-800">
                    <NumericFormat
                      value={avgOrderValue}
                      displayType="text"
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-indigo-200 px-3 py-1 rounded-full">
                <DollarSign className="w-4 h-4 text-indigo-600 mr-1" />
                <span className="text-sm font-medium text-indigo-700">
                  Mỗi đơn
                </span>
              </div>
            </div>

            <div className="mt-4 h-56 w-full flex items-center">
              {/* Labels bên trái */}
              <div className="flex-1 space-y-3 pr-4">
                {orderStatusChartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span
                      className="inline-block w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <span className="text-sm font-medium text-indigo-800">
                        {item.vietnameseName}
                      </span>
                      <div className="text-xs text-indigo-600">
                        {item.value} đơn hàng
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart bên phải */}
              <div className="flex-1 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusChartData}
                      dataKey="value"
                      nameKey="vietnameseName"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={50}
                      paddingAngle={2}
                    >
                      {orderStatusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: number, n: string) => [`${v}`, n]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-4 md:p-5 bg-white border border-gray-200 shadow-lg rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Đơn hàng gần đây
                </h3>
              </div>
              <NavLink to="/admin/orders" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Xem tất cả
              </NavLink>
            </div>

            <div className="space-y-3">
              {recentOrders?.data?.data?.result
                ?.slice(0, 5)
                .map((order: IOrder) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.orderCode}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.receiverName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        <NumericFormat
                          value={order.totalPrice}
                          displayType="text"
                          thousandSeparator={true}
                          suffix={"đ"}
                        />
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === "PAID"
                            ? "bg-green-100 text-green-800"
                            : order.status === "PROCESSING"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "PENDING"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : order.status === "SHIPPING"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "DELIVERED"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                )) || (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Không có đơn hàng gần đây</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Products Section */}
          <div className="p-4 md:p-5 bg-white border border-gray-200 shadow-lg rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Sản phẩm bán chạy
                </h3>
              </div>
              <NavLink to="/admin/products" className="text-sm text-green-600 hover:text-green-800 font-medium">
                Xem tất cả
              </NavLink>
            </div>

            <div className="space-y-3">
              {bestSellerProducts?.data?.data?.slice(0, 5).map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.sold || 0} đã bán
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      <NumericFormat
                        value={product.price}
                        displayType="text"
                        thousandSeparator={true}
                        suffix={"đ"}
                      />
                    </p>
                    {product.discount && product.discount > 0 && (
                      <p className="text-xs text-green-600 font-medium">
                        -{product.discount}%
                      </p>
                    )}
                  </div>
                </div>
              )) || (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Không có sản phẩm bán chạy</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

