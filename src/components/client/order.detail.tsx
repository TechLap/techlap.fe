import dayjs from 'dayjs';
import { CreditCard, Mail, MapPin, Package, Phone, Truck, User, X } from 'lucide-react';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import { IOrder } from '../../types/backend';

interface OrderDetailModalProps {
    order: IOrder | null;
    isOpen: boolean;
    onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, isOpen, onClose }) => {
    const subtotal = order?.orderDetails.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discount = order?.orderDetails.reduce((sum, item) => sum + (item.product.price * (item.product.discount as number / 100)) * item.quantity, 0)
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-xl">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Đơn hàng #{order.orderCode}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Đặt ngày: {order.createdAt ? dayjs(order.createdAt).format("DD/MM/YYYY") : ""}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className={`flex items-center px-3 py-1 rounded-lg border`}>
                                <span className="text-sm font-medium">{order.status}</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Products */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <Package className="w-5 h-5 mr-2 text-blue-600" />
                                        Sản phẩm đã đặt
                                    </h3>

                                    <div className="space-y-4">
                                        {order.orderDetails.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4 p-3 bg-white rounded-lg border">
                                                <img
                                                    src={`${process.env.REACT_APP_URL_STORAGE_FILE}/${item.product.image}`}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900 text-sm">{item.product.name}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">{item.product.description}</p>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <span className="text-sm font-bold text-blue-600">
                                                            <NumericFormat
                                                                value={item.product.price - (item.product.price * item.product.discount / 100)}
                                                                displayType="text"
                                                                thousandSeparator={true}
                                                                suffix={"đ"}
                                                            />
                                                        </span>
                                                        {item.product.price && (
                                                            <span className="text-xs text-gray-400 line-through">
                                                                <NumericFormat
                                                                    value={item.product.price}
                                                                    displayType="text"
                                                                    thousandSeparator={true}
                                                                    suffix={"đ"}
                                                                />
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <span className="text-xs text-gray-600">Số lượng</span>
                                                    <p className="font-medium">{item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-blue-600" />
                                        Thông tin khách hàng
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Họ và tên</p>
                                                <p className="text-sm font-medium">{order?.customer?.fullName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Email</p>
                                                <p className="text-sm font-medium">{order?.customer?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Số điện thoại</p>
                                                <p className="text-sm font-medium">{order?.customer?.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <CreditCard className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Thanh toán</p>
                                                <p className="text-sm font-medium">
                                                    {order?.paymentMethod}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Info */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                                        Thông tin giao hàng
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Người nhận</p>
                                                <p className="text-sm font-medium">{order?.receiverName}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Số điện thoại</p>
                                                <p className="text-sm font-medium">{order?.receiverPhone}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Địa chỉ giao hàng</p>
                                            <p className="text-sm font-medium">
                                                {order?.receiverAddress}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-gray-50 rounded-lg p-4 top-6 lg:sticky lg:top-24 lg:h-fit">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan đơn hàng</h3>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-gray-600 text-sm">
                                            <span>Tạm tính</span>
                                            <span><NumericFormat
                                                value={subtotal}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={"đ"}
                                            /></span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 text-sm">
                                            <span>Phí vận chuyển</span>
                                            <span>{0}</span>
                                        </div>
                                        {discount && (
                                            <div className="flex justify-between text-green-600 text-sm sm:text-base">
                                                <span>Giảm giá</span>
                                                <span>-<NumericFormat
                                                    value={discount}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    suffix={"đ"}
                                                /></span>
                                            </div>
                                        )}
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between text-lg font-semibold text-gray-900">
                                                <span>Tổng cộng</span>
                                                <span className="text-blue-600">
                                                    <NumericFormat
                                                        value={order?.totalPrice}
                                                        displayType="text"
                                                        thousandSeparator={true}
                                                        suffix={"đ"}
                                                    /></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2 text-xs">
                                        <div className="flex items-center text-gray-600">
                                            <Truck className="w-3 h-3 mr-2 flex-shrink-0" />
                                            <span>Giao hàng: 2-3 ngày làm việc</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Phone className="w-3 h-3 mr-2 flex-shrink-0" />
                                            <span>Hỗ trợ: 1900-xxxx</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                        <p className="text-xs text-blue-800">
                                            <strong>Chính sách bảo hành:</strong> Tất cả sản phẩm đều được bảo hành chính hãng 12-24 tháng
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailModal;