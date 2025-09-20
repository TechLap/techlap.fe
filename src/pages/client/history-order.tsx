import { ArrowLeft, CheckCircle, Clock, Eye, Package, Truck, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: OrderItem[];
    customerInfo: {
        fullName: string;
        email: string;
        phone: string;
    };
    shippingInfo: {
        receiverName: string;
        receiverPhone: string;
        city: string;
        address: string;
    };
    paymentMethod: string;
    trackingNumber?: string;
}

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    quantity: number;
    specs: string;
}

const mockOrders: Order[] = [
    {
        id: '1',
        orderNumber: 'TL2024001',
        date: '2024-01-15',
        status: 'delivered',
        total: 66490000,
        items: [
            {
                id: 1,
                name: "MacBook Pro 16-inch M3 Max",
                price: 65990000,
                originalPrice: 69990000,
                image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
                quantity: 1,
                specs: "M3 Max, 32GB RAM, 1TB SSD"
            }
        ],
        customerInfo: {
            fullName: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            phone: '0901234567'
        },
        shippingInfo: {
            receiverName: 'Nguyễn Văn A',
            receiverPhone: '0901234567',
            city: 'hanoi',
            address: '123 Đường ABC, Phường XYZ, Quận 1'
        },
        paymentMethod: 'credit-card',
        trackingNumber: 'TL123456789'
    },
    {
        id: '2',
        orderNumber: 'TL2024002',
        date: '2024-01-20',
        status: 'shipped',
        total: 66480000,
        items: [
            {
                id: 2,
                name: "Dell XPS 13 Plus",
                price: 32990000,
                image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400",
                quantity: 2,
                specs: "Intel i7-13700H, 16GB RAM, 512GB SSD"
            }
        ],
        customerInfo: {
            fullName: 'Trần Thị B',
            email: 'tranthib@email.com',
            phone: '0912345678'
        },
        shippingInfo: {
            receiverName: 'Trần Thị B',
            receiverPhone: '0912345678',
            city: 'hcm',
            address: '456 Đường DEF, Phường UVW, Quận 3'
        },
        paymentMethod: 'cod',
        trackingNumber: 'TL987654321'
    },
    {
        id: '3',
        orderNumber: 'TL2024003',
        date: '2024-01-25',
        status: 'processing',
        total: 45990000,
        items: [
            {
                id: 3,
                name: "ASUS ROG Strix G15",
                price: 45990000,
                image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400",
                quantity: 1,
                specs: "AMD Ryzen 7, 16GB RAM, RTX 4060, 512GB SSD"
            }
        ],
        customerInfo: {
            fullName: 'Lê Văn C',
            email: 'levanc@email.com',
            phone: '0923456789'
        },
        shippingInfo: {
            receiverName: 'Lê Văn C',
            receiverPhone: '0923456789',
            city: 'danang',
            address: '789 Đường GHI, Phường RST, Quận Hải Châu'
        },
        paymentMethod: 'credit-card'
    }
];

export const HistoryOrder = () => {
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusInfo = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return { text: 'Chờ xử lý', color: 'text-yellow-600 bg-yellow-50', icon: Clock };
            case 'processing':
                return { text: 'Đang xử lý', color: 'text-blue-600 bg-blue-50', icon: Package };
            case 'shipped':
                return { text: 'Đang giao', color: 'text-purple-600 bg-purple-50', icon: Truck };
            case 'delivered':
                return { text: 'Đã giao', color: 'text-green-600 bg-green-50', icon: CheckCircle };
            case 'cancelled':
                return { text: 'Đã hủy', color: 'text-red-600 bg-red-50', icon: XCircle };
            default:
                return { text: 'Không xác định', color: 'text-gray-600 bg-gray-50', icon: Clock };
        }
    };
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

                <div className="space-y-4 sm:space-y-6">
                    {mockOrders.map((order) => {
                        const statusInfo = getStatusInfo(order.status);
                        const StatusIcon = statusInfo.icon;

                        return (
                            <div key={order.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                                <div className="p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                        <div className="mb-3 sm:mb-0">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                Đơn hàng #{order.orderNumber}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Đặt ngày: {formatDate(order.date)}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                                                <StatusIcon className="w-4 h-4 mr-1" />
                                                {statusInfo.text}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Tổng tiền</p>
                                            <p className="font-semibold text-blue-600">{formatPrice(order.total)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Số sản phẩm</p>
                                            <p className="font-semibold">{order.items.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Thanh toán</p>
                                            <p className="font-semibold">
                                                {order.paymentMethod === 'credit-card' ? 'Thẻ tín dụng' : 'COD'}
                                            </p>
                                        </div>
                                        {order.trackingNumber && (
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Mã vận đơn</p>
                                                <p className="font-semibold text-purple-600">{order.trackingNumber}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t">
                                        <div className="mb-3 sm:mb-0">
                                            <p className="text-sm text-gray-600">
                                                Giao đến: <span className="font-medium">{order.shippingInfo.receiverName}</span>
                                            </p>
                                            <p className="text-sm text-gray-500">{order.shippingInfo.address}</p>
                                        </div>
                                        <Link
                                            to={`/order/${order.id}`}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {mockOrders.length === 0 && (
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
            </div>
        </div>
    );
}