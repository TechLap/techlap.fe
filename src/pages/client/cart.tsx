import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft, CreditCard, MapPin, Package, Phone, ShoppingCart, Truck, User } from 'lucide-react';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import ProductItem from '../../components/client/card/product.item';
import { apiAddToCart, apiCreateOrder, apiFetchCart, apiRemoveCartDetail } from '../../config/api';
import { useAppDispatch } from '../../redux/hooks';
import { setCheckout, setCustomerRemoveFromCart } from '../../redux/slice/customer.slide';
import { ICart, IResOrderDTO } from '../../types/backend';
import { toast } from 'react-toastify';

interface CartItem {
    id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        price: number;
        discount: number;
        stock: number;
        description: string;
        image: string;
        status: string;
        category: {
            id: number;
            name: string;
        };
    };
}

const orderInfoSchema = yup
    .object({
        receiverName: yup.string().required("Tên không được để trống"),
        receiverPhone: yup
            .string()
            .required("Số địện thoai không được để trống")
            .matches(/(0[3|5|7|8|9])+(\d{8})\b/g, "Số địện thoai không hợp lệ"),
        address: yup.string().required("Địa chỉ không được để trống"),
        note: yup.string().notRequired(),
        paymentMethod: yup.string().oneOf(['vnpay', 'cod']).required("Phương thức thanh toán là bắt buộc"),
    })
    .required();

type CartFormValues = yup.InferType<typeof orderInfoSchema>;

function CartPage() {
    // Sản phẩm trong giỏ hàng
    const [cartItems, setCartItems] = useState<CartItem[]>([
    ]);
    // Tổng tiền (sau khi phí ship, giảm giá)
    const [totalPrice, setTotalPrice] = useState(0);
    // Thông tin giỏ hàng (khách hàng, chi tiết giỏ hàng)
    const [cartInfo, setCartInfo] = useState<ICart>();
    // Redux
    const dispath = useAppDispatch();
    // React Hook Form
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CartFormValues>({
        resolver: yupResolver(orderInfoSchema) as any,
        defaultValues: {
            receiverName: "",
            receiverPhone: "",
            address: cartInfo?.customer?.address ?? "",
            note: "",
            paymentMethod: "cod"
        },
    });
    // Submit form

    // Lấy thông tin giỏ hàng từ API
    const getCart = async () => {
        try {
            const response = await apiFetchCart();
            setCartInfo(response.data.data);
            if (response.data.data?.cartDetails) {
                setCartItems(response.data.data?.cartDetails);
            }
        } catch (error) {

        }
    };

    const navigate = useNavigate();
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const updateQuantity = async (id: number, change: number) => {
        const oldItems = [...cartItems];
        const updatedItem = cartItems.find((item) => item.id === id);
        if (!updatedItem) return;

        const maxStock = updatedItem.product.stock;
        let newQuantity = updatedItem.quantity + change;

        // ✅ Không cho nhỏ hơn 1
        if (newQuantity < 1) newQuantity = 1;

        // ✅ Không cho vượt quá stock
        if (newQuantity > maxStock) {
            toast.warning(`Sản phẩm chỉ còn ${maxStock} trong kho`);
            newQuantity = maxStock;
        }
        console.log(newQuantity)
        // Cập nhật UI ngay
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );

        try {
            await apiAddToCart({
                productId: updatedItem.product.id.toString(),
                quantity: newQuantity,
                update: true,
            });
        } catch (error) {
            // rollback nếu BE lỗi
            setCartItems(oldItems);
        }
    };

    const removeItem = async (customerId: number, cartDetailId: number) => {
        try {
            // gọi API BE
            const res = await apiRemoveCartDetail({ cartDetailId, customerId });
            if (res.data.statusCode === 200) {
                dispath(setCustomerRemoveFromCart({ quantity: 1 }));
            }

            // cập nhật lại state FE
            setCartItems(items => items.filter(item => item.id !== cartDetailId));

            console.log("Xóa sản phẩm thành công");
        } catch (error) {
            console.error("Xóa sản phẩm thất bại:", error);
        }
    };

    // check toàn bộ giỏ hàng
    const hasInvalidProduct = cartItems.some(
        (ci) => ci.product.status !== "ACTIVE" || ci.product.stock <= 0
    );

    // Tính toán các khoản tiền
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discount = cartItems.reduce((sum, item) => sum + (item.product.price * (item.product.discount as number / 100)) * item.quantity, 0);
    const shipping = (subtotal - discount) >= 20000000 ? 0 : 100000;

    React.useEffect(() => {
        getCart();
    }, []);

    React.useEffect(() => {
        setTotalPrice(subtotal - discount + shipping)
    }, [subtotal, discount, shipping]);

    // Logic submit order
    const handleSubmitForm = handleSubmit(async (valuesForm: CartFormValues) => {
        const payload = {
            receiverName: valuesForm.receiverName,
            receiverPhone: valuesForm.receiverPhone,
            receiverAddress: valuesForm.address,
            note: valuesForm.note ?? "",
            paymentMethod: valuesForm.paymentMethod as "vnpay" | "cod",
        }
        const response = await apiCreateOrder(payload);
        const { paymentMethod, paymentUrl, orderCode } = response.data.data as { paymentMethod: string, paymentUrl: string, orderCode: string };
        if (paymentMethod === "vnpay") {
            console.log("paymentUrl", paymentUrl);
            window.location.href = paymentUrl;
            dispath(setCheckout())
            return;
        } else {
            toast.success("Đặt hàng thành công!");
            dispath(setCheckout())
            navigate(`/history-order`);
        }
    });


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
                            <div className="flex items-center">
                                <div
                                    className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 bg-blue-600 border-blue-600 text-white shadow-lg`}
                                >
                                    <ShoppingCart />
                                </div>
                                <span
                                    className={`ml-2 sm:ml-3 text-sm sm:text-base font-medium transition-colors text-blue-600`}
                                >
                                    Giỏ hàng
                                </span>

                            </div>
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
                            {cartItems.length === 0 && (
                                <p className="text-gray-600">Chưa có sản phẩm trong giỏ hàng</p>
                            )}
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <ProductItem
                                        key={item.id}
                                        item={{ ...item.product, id: item.id, quantity: item.quantity }}
                                        customerId={cartInfo?.customer.id}
                                        updateQuantity={updateQuantity}
                                        removeItem={removeItem}
                                    />
                                ))}
                            </div>
                        </div>
                        {cartItems.length > 0 && (
                            <form id='checkoutForm' onSubmit={handleSubmitForm} className="space-y-6 sm:space-y-8">
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
                                                defaultValue={cartInfo?.customer.fullName}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                defaultValue={cartInfo?.customer.email}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                                            <input
                                                type="tel"
                                                defaultValue={cartInfo?.customer.phone}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                disabled
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
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Tên người nhận</label>
                                                <input
                                                    type="text"
                                                    {...register("receiverName")}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                    placeholder="Nhập tên người nhận hàng"
                                                />
                                                {errors.receiverName && (
                                                    <p className="text-red-500">{errors.receiverName.message}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại người nhận</label>
                                                <input
                                                    type="tel"
                                                    {...register("receiverPhone")}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                    placeholder="0xxx xxx xxx"
                                                />
                                                {errors.receiverPhone && (
                                                    <p className="text-red-500">{errors.receiverPhone.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ cụ thể</label>
                                                <input
                                                    type="text"
                                                    defaultValue={cartInfo?.customer.address}
                                                    {...register("address")}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
                                                />
                                                {errors.address && (
                                                    <p className="text-red-500">{errors.address.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                                                <input
                                                    type="text"
                                                    {...register("note")}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                    placeholder="Ghi chú cho đơn hàng (nếu có)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 4. Phương thức thanh toán */}
                                <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                                        <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                                        Phương thức thanh toán
                                    </h2>

                                    <Controller
                                        name="paymentMethod"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="space-y-3 sm:space-y-4">
                                                <div
                                                    className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${field.value === "cod"
                                                        ? "border-blue-600 bg-blue-50 shadow-sm"
                                                        : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                    onClick={() => field.onChange("cod")}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <input
                                                            type="radio"
                                                            value="cod"
                                                            checked={field.value === "cod"}
                                                            onChange={() => field.onChange("cod")}
                                                            className="text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <Truck className="w-5 h-5 text-gray-400" />
                                                        <span className="font-medium text-sm sm:text-base">
                                                            Thanh toán khi nhận hàng (COD)
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${field.value === "vnpay"
                                                        ? "border-blue-600 bg-blue-50 shadow-sm"
                                                        : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                    onClick={() => field.onChange("vnpay")}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <input
                                                            type="radio"
                                                            value="vnpay"
                                                            checked={field.value === "vnpay"}
                                                            onChange={() => field.onChange("vnpay")}
                                                            className="text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                                        <span className="font-medium text-sm sm:text-base">
                                                            Thanh toán bằng VNPay
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    />

                                </div>
                            </form>
                        )}
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
                                                value={totalPrice}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={"đ"}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkoutForm"
                                disabled={hasInvalidProduct || cartItems.length === 0}
                                className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold mt-4 sm:mt-6 text-sm sm:text-base transition-colors focus:ring-4 focus:ring-blue-200
    ${hasInvalidProduct || cartItems.length === 0
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-blue-700"}`}
                            >
                                Đặt hàng ngay
                            </button>

                            {/* Thông báo trạng thái */}
                            {hasInvalidProduct && (
                                <p className="text-xs text-red-500 mt-1">
                                    Có sản phẩm trong giỏ hàng đã hết hàng hoặc ngừng kinh doanh
                                </p>
                            )}

                            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                <div className="flex items-center text-gray-600">
                                    <Truck className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span>Giao hàng: 2-3 ngày làm việc</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span>Miễn phí giao hàng cho đơn trên 20 triệu</span>
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

        </div >
    );
}

export default CartPage;