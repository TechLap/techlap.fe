import { NumericFormat } from "react-number-format";
import { CartIcon } from "../../common/icons";
import { NavLink } from "react-router-dom";

interface ProductCardProps {
  id?: string;
  image: string | null;
  name: string;
  price: number;
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
  categoryName,
  description,
  isBestSeller,
  isNew,
  isSale,
}: ProductCardProps) => {
  const status = (() => {
    if (isNew) return "Mới";
    if (isBestSeller) return "Bán chạy";
    if (isSale) return "Giảm giá";
    return null;
  })();
  const statusColor = (() => {
    if (isNew) return "bg-blue-500";
    if (isBestSeller) return "bg-amber-500";
    if (isSale) return "bg-red-500";
    return null;
  })();

  return (
    <div className="bg-white pb-4 rounded-xl hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">
      <NavLink to={`/products/${id}`} className="block flex-1">
        <div className="relative">
          <img
            src={image || ""}
            alt={name}
            className="w-full h-44 object-cover rounded-t-xl hover:opacity-90 transition-opacity"
          />
          {status && (
            <div className="absolute top-2 right-2 left-2">
              <span
                className={`text-white px-2 py-1 rounded-md text-xs ${statusColor} font-medium`}
              >
                {status}
              </span>
            </div>
          )}
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
          <div className="flex items-center justify-between mt-4">
            <span className="text-green-700 font-medium">
              <NumericFormat
                value={price}
                displayType="text"
                allowLeadingZeros
                thousandSeparator={true}
                suffix={"đ"}
              />
            </span>
          </div>
        </div>
      </NavLink>
      <div className="px-4 pb-2 mt-auto">
        <button
          className="w-full bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-900 flex justify-center items-center gap-2 whitespace-nowrap font-medium text-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: Add to cart logic here
          }}
        >
          <CartIcon size={16} color="white" className="size-4" />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
