import { getProductStatusBadgeClass } from "../../utils/utils";

interface ProductStatusBadgeProps {
  status: string;
  className?: string;
}

/**
 * Component Badge hiển thị trạng thái sản phẩm với màu sắc tương ứng
 * @param status - Trạng thái sản phẩm (ACTIVE, INACTIVE, OUT_OF_STOCK, DISCONTINUED)
 * @param className - Class CSS bổ sung
 */
const ProductStatusBadge = ({ status, className = "" }: ProductStatusBadgeProps) => {
  return (
    <span className={`${getProductStatusBadgeClass(status)} ${className}`}>
      {status}
    </span>
  );
};

export default ProductStatusBadge;
