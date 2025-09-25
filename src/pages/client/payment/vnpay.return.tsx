import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiFetchCart, apiRemoveCartDetail, apiVerifyVnpayReturn } from '../../../config/api';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../redux/hooks';
import { setCustomerRemoveFromCart } from '../../../redux/slice/customer.slide';
import { IOrder } from '../../../types/backend';

function VnpayReturnPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [order, setOrder] = React.useState<IOrder>();

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        const body: Record<string, string> = {};
        params.forEach((value, key) => { body[key] = value });

        const verify = async () => {
            try {
                const res = await apiVerifyVnpayReturn(body);
                const isSuccess = res.status === 200 && typeof res.data === 'string' && res.data.toLowerCase().includes('payment verified');
                if (isSuccess) {
                    // Clear cart on success
                    try {
                        const cartRes = await apiFetchCart();
                        const customerId = cartRes?.data?.data?.customer?.id;
                        const details = cartRes?.data?.data?.cartDetails ?? [];
                        if (customerId && details.length > 0) {
                            await Promise.all(
                                details.map((d: { id: number }) =>
                                    apiRemoveCartDetail({ cartDetailId: d.id, customerId })
                                )
                            );
                            // cập nhật redux badge giỏ hàng
                            dispatch(setCustomerRemoveFromCart({ quantity: details.length }));
                        }
                    } catch (e) {
                        // ignore cart clear errors, still navigate
                    }
                    toast.success('Thanh toán thành công');
                    navigate('/history-order');
                } else {
                    toast.error((typeof res.data === 'string' ? res.data : '') || 'Xác thực thanh toán thất bại');
                    navigate('/cart');
                }
            } catch (e) {
                toast.error('Có lỗi khi xác thực thanh toán');
                navigate('/cart');
            } finally {
                setLoading(false);
            }
        };
        verify();
    }, [location.search]);

    if (loading) return <div className="p-6">Đang xử lý thanh toán...</div>;

    // Trang này chỉ hiện trạng thái đang xác thực rồi tự điều hướng bằng toast
    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-sm border mt-6">
            <h2 className="text-xl font-semibold mb-4">Đang xác thực thanh toán...</h2>
        </div>
    );
}

export default VnpayReturnPage;