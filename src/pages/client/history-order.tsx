import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle, Clock, Eye, Package, Truck, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetchOrderHistory } from "../../config/api";
import React, { useEffect, useState } from "react";
import { IOrder } from "../../types/backend";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
import OrderDetailModal from "../../components/client/order.detail";
import Pagination from "../../components/common/pagination";

export const HistoryOrder = () => {
    const MAX_ORDERS_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [selectedOrder, setSelectedOrder] = React.useState<IOrder | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleViewOrder = (order: IOrder) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const { data: orders } = useQuery({
        queryKey: ["fetchOrders"],
        queryFn: () =>
            apiFetchOrderHistory(`page=${currentPage}&size=${MAX_ORDERS_PAGE}`),
    });
    const [ordersData, setOrdersData] = useState<IOrder[] | null>(orders?.data.data?.result || []);

    useEffect(() => {
        if (orders) {
            setOrdersData(orders.data.data?.result || []);
        }
    }, [orders]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Steps */}
                        <div className="flex items-center space-x-8 sm:space-x-16">
                            <div className="flex items-center">
                                <div
                                    className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300
                                         bg-blue-600 border-blue-600 text-white shadow-lg
                                        `}
                                >
                                    <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <span
                                    className={`ml-2 sm:ml-3 text-sm sm:text-base font-medium transition-colors "text-blue-600" : "text-gray-400"
                                            `}
                                >
                                    Lịch sử đơn hàng
                                </span>
                            </div>
                        </div>
                        <div className="w-10 h-10"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4">

                <div className="space-y-4 sm:space-y-6">
                    {ordersData?.map((order) => {

                        return (
                            <div key={order.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                                <div className="p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                        <div className="mb-3 sm:mb-0">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                Đơn hàng #{order.orderCode}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Đặt ngày: {order.createdAt ? dayjs(order.createdAt).format("DD/MM/YYYY") : ""}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium`}>
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Tổng tiền</p>
                                            <p className="font-semibold text-blue-600">
                                                <NumericFormat
                                                    value={order.totalPrice}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={"đ"}
                                                /></p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Số sản phẩm</p>
                                            <p className="font-semibold">{order.orderDetails.length} sản phẩm</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Thanh toán</p>
                                            <p className="font-semibold">
                                                {order.paymentMethod}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t">
                                        <div className="mb-3 sm:mb-0">
                                            <p className="text-sm text-gray-600">
                                                Giao đến: <span className="font-medium">{order.receiverName}</span>
                                            </p>
                                            <p className="text-sm text-gray-500">{order.receiverAddress}</p>
                                        </div>
                                        <button
                                            onClick={() => handleViewOrder(order)}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {ordersData?.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
                        <p className="text-gray-500 mb-6">Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!</p>
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Bắt đầu mua sắm
                        </Link>
                    </div>
                )}
                <div className="flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={
                            setCurrentPage
                        }
                        total={
                            orders?.data.data?.meta.pages ?? 0
                        }
                    />
                </div>
                <OrderDetailModal
                    order={selectedOrder}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </div>
        </div>
    );
}