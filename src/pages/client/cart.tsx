import { ArrowLeft, CreditCard, MapPin, Minus, Package, Phone, Plus, ShoppingCart, Trash2, Truck, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../../components/client/card/product.item';
import { NumericFormat } from 'react-number-format';

interface CartItem {
    id: number;
    name: string;
    price: number;
    discount?: number;
    image: string;
    quantity: number;
    discription: string;
}

interface CustomerInfo {
    fullName: string;
    email: string;
    phone: string;
}

interface OrderInfo {
    receiverName: string;
    receiverPhone: string;
    city: string;
    address: string;
}

function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "MacBook Pro 16-inch M3 Max",
            price: 65990000,
            discount: 20,
            image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
            quantity: 1,
            discription: "M3 Max, 32GB RAM, 1TB SSD"
        },
        {
            id: 2,
            name: "Dell XPS 13 Plus",
            price: 32990000,
            discount: 40,
            image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400",
            quantity: 2,
            discription: "Intel i7-13700H, 16GB RAM, 512GB SSD"
        }
    ]);

    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        fullName: '',
        email: '',
        phone: ''
    });

    const [orderInfo, setOrderInfo] = useState<OrderInfo>({
        receiverName: '',
        receiverPhone: '',
        city: '',
        address: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const updateQuantity = (id: number, change: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + ((item.price) * item.quantity), 0);
    const shipping = 500000;
    const discount = cartItems.reduce((sum, item) => {
        if (item.price) {
            return sum + ((item.price - (item.price - (item.price * (item.discount as number / 100)))) * item.quantity);
        }
        return sum;
    }, 0);
    const total = subtotal + shipping - discount;

    const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
        setCustomerInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleOrderInfoChange = (field: keyof OrderInfo, value: string) => {
        setOrderInfo(prev => ({ ...prev, [field]: value }));
    };

    const steps = [
        { id: 1, title: 'Giỏ hàng', icon: ShoppingCart },
        { id: 2, title: 'Thanh toán', icon: CreditCard }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Progress Steps */}
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
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center">
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${currentStep >= step.id
                                            ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                                            : "border-gray-300 text-gray-400"
                                            }`}
                                    >
                                        <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <span
                                        className={`ml-2 sm:ml-3 text-sm sm:text-base font-medium transition-colors ${currentStep >= step.id ? "text-blue-600" : "text-gray-400"
                                            }`}
                                    >
                                        {step.title}
                                    </span>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`w-12 sm:w-20 h-0.5 mx-4 sm:mx-6 transition-colors ${currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="w-10 h-10" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* 1. Sản phẩm */}
                        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                                Sản phẩm trong giỏ hàng
                            </h2>

                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <ProductItem
                                        key={item.id}
                                        item={item}
                                        updateQuantity={updateQuantity}
                                        removeItem={removeItem}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 2. Thông tin khách hàng */}
                        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                                <User className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                                Thông tin khách hàng
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên người đặt</label>
                                    <input
                                        type="text"
                                        value={customerInfo.fullName}
                                        onChange={(e) => handleCustomerInfoChange('fullName', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Nhập họ và tên người đặt hàng"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={customerInfo.email}
                                        onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        value={customerInfo.phone}
                                        onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="0xxx xxx xxx"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Thông tin đơn hàng */}
                        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                                <Package className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                                Thông tin giao hàng
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên người nhận</label>
                                    <input
                                        type="text"
                                        value={orderInfo.receiverName}
                                        onChange={(e) => handleOrderInfoChange('receiverName', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Nhập tên người nhận hàng"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại người nhận</label>
                                    <input
                                        type="tel"
                                        value={orderInfo.receiverPhone}
                                        onChange={(e) => handleOrderInfoChange('receiverPhone', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="0xxx xxx xxx"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tỉnh/Thành phố</label>
                                    <select
                                        value={orderInfo.city}
                                        onChange={(e) => handleOrderInfoChange('city', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    >
                                        <option value="">Chọn tỉnh/thành</option>
                                        <option value="hanoi">Hà Nội</option>
                                        <option value="hcm">TP. Hồ Chí Minh</option>
                                        <option value="danang">Đà Nẵng</option>
                                        <option value="haiphong">Hải Phòng</option>
                                        <option value="cantho">Cần Thơ</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ cụ thể</label>
                                    <input
                                        type="text"
                                        value={orderInfo.address}
                                        onChange={(e) => handleOrderInfoChange('address', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 4. Phương thức thanh toán */}
                        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                                Phương thức thanh toán
                            </h2>

                            <div className="space-y-3 sm:space-y-4">
                                <div
                                    className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === 'credit-card' ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setPaymentMethod('credit-card')}
                                >
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            checked={paymentMethod === 'credit-card'}
                                            onChange={() => setPaymentMethod('credit-card')}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                        <span className="font-medium text-sm sm:text-base">Thẻ tín dụng/ghi nợ</span>
                                    </div>
                                </div>

                                <div
                                    className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setPaymentMethod('cod')}
                                >
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            checked={paymentMethod === 'cod'}
                                            onChange={() => setPaymentMethod('cod')}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <Truck className="w-5 h-5 text-gray-400" />
                                        <span className="font-medium text-sm sm:text-base">Thanh toán khi nhận hàng (COD)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Order Summary */}
                    <div className="lg:sticky lg:top-24 lg:h-fit">
                        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Tổng quan đơn hàng</h2>

                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                                    <span>Tạm tính</span>
                                    <span>
                                        <NumericFormat
                                            value={subtotal}
                                            displayType="text"
                                            thousandSeparator={true}
                                            suffix={"đ"}
                                        />
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                                    <span>Phí vận chuyển</span>
                                    <span>
                                        <NumericFormat
                                            value={shipping}
                                            displayType="text"
                                            thousandSeparator={true}
                                            suffix={"đ"}
                                        />
                                    </span>
                                </div>
                                {discount > 0 && (
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
                                <div className="border-t pt-3 sm:pt-4">
                                    <div className="flex justify-between text-lg sm:text-xl font-semibold text-gray-900">
                                        <span>Tổng cộng</span>
                                        <span className="text-blue-600">
                                            <NumericFormat
                                                value={total}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={"đ"}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold mt-4 sm:mt-6 hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 text-sm sm:text-base">
                                Đặt hàng ngay
                            </button>

                            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                <div className="flex items-center text-gray-600">
                                    <Truck className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span>Giao hàng: 2-3 ngày làm việc</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span>Miễn phí giao hàng cho đơn trên 50 triệu</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span>Hỗ trợ: 1900-xxxx</span>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
                                <p className="text-xs sm:text-sm text-blue-800">
                                    <strong>Chính sách bảo hành:</strong> Tất cả sản phẩm đều được bảo hành chính hãng 12-24 tháng
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;