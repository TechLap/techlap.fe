import { NumericFormat } from "react-number-format";
import { CartIcon } from "../../common/icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { apiAddToCart } from "../../../config/api";
import { setCustomerAddToCart } from "../../../redux/slice/customer.slide";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toast } from "react-toastify";
import CustomToast from "../../common/toast.message";

interface ProductCardProps {
  id?: string;
  image: string | null;
  name: string;
  price: number;
  status: string;
  discount?: number;
  categoryName?: string;
  description?: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard = ({
  id,
  image,
  name,
  price,
  discount,
  status,
  categoryName,
  description,
  isBestSeller,
  isNew,
  isSale,
}: ProductCardProps) => {

  const newPrice = price - (price * (discount as number / 100));
  const [loading, setLoading] = useState(false);
  // Redux
  const dispatch = useAppDispatch();
  const totalCart = useAppSelector((state) => state.customer.customer.totalCart);
  const addToCart = async () => {
    try {
      setLoading(true);
      const res = await apiAddToCart({ productId: id as string, quantity: 1, update: false });
      const tolalCartAfter = res?.data?.data?.sum;
      if (res.data.statusCode === 201) {
        toast.success(<CustomToast message='Thêm vào giỏ hàng thành công' className='text-green-600' />)
        if (tolalCartAfter !== undefined && tolalCartAfter > totalCart!) {
          dispatch(setCustomerAddToCart({ quantity: 1 }));
        }
      }
    } catch (err) {
      toast.error(<CustomToast message='Thêm vào giỏ hàng không thành công' className='text-red-600' />)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pb-4 rounded-xl hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">
      <NavLink to={`/products/${id}`} className="block flex-1">
        <div className="relative">
          <img
            src={`${process.env.REACT_APP_URL_STORAGE_FILE}/${image}`}
            alt={name}
            className="w-full h-44 object-cover rounded-t-xl hover:opacity-90 transition-opacity"
          />

        </div>
        <div className="flex flex-col gap-2 px-4 py-2 flex-1">
          <div className="text-xs text-gray-500 mb-1 line-clamp-1">
            {categoryName}
          </div>
          <h3 className="font-medium text-gray-800 line-clamp-1">{name}</h3>
          <div className="min-h-[2.5rem] flex items-start">
            <p className="text-gray-600 text-sm line-clamp-2 leading-tight">
              {description || "Không có mô tả"}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            {/* Giá sau giảm (màu đỏ) */}
            <span className="text-red-600 font-medium text-lg">
              <NumericFormat
                value={newPrice}
                displayType="text"
                thousandSeparator={true}
                suffix={"đ"}
              />
            </span>

            {/* Giá gốc (màu xám, gạch ngang) */}
            {price && price > newPrice && (
              <span className="text-gray-400 text-sm line-through">
                <NumericFormat
                  value={price}
                  displayType="text"
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </span>
            )}
          </div>
        </div>
      </NavLink>
      <div className="px-4 pb-2 mt-auto">
        {status === "ACTIVE" ? (
          // Nút đỏ cho sản phẩm còn bán
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex justify-center items-center gap-2 whitespace-nowrap font-medium text-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart();
            }}
            disabled={loading}
          >
            <CartIcon size={16} color="white" className="size-4" />
            {loading ? "Đang thêm..." : "Thêm vào giỏ"}
          </button>
        ) : status === "DISCONTINUED" ? (
          // Nút xám cho sản phẩm ngừng sản xuất
          <button
            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed flex justify-center items-center gap-2 whitespace-nowrap font-medium text-sm"
            disabled
          >
            <CartIcon size={16} color="white" className="size-4" />
            Ngừng sản xuất
          </button>
        ) : (
          // Nút xám mặc định cho các trạng thái khác (ví dụ hết hàng)
          <button
            className="w-full bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed flex justify-center items-center gap-2 whitespace-nowrap font-medium text-sm"
            disabled
          >
            <CartIcon size={16} color="white" className="size-4" />
            Hết hàng
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
