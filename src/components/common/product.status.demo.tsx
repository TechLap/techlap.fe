import ProductStatusBadge from "./product.status.badge";

/**
 * Component demo để hiển thị tất cả các trạng thái sản phẩm
 * Có thể xóa file này sau khi đã test xong
 */
const ProductStatusDemo = () => {
  const statuses = [
    { status: "ACTIVE", description: "Sản phẩm đang hoạt động" },
    { status: "INACTIVE", description: "Sản phẩm tạm ngưng" },
    { status: "OUT_OF_STOCK", description: "Sản phẩm hết hàng" },
    { status: "DISCONTINUED", description: "Sản phẩm ngừng sản xuất" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Product Status Badges</h3>
      <div className="space-y-3">
        {statuses.map((item) => (
          <div key={item.status} className="flex items-center gap-4">
            <ProductStatusBadge status={item.status} />
            <span className="text-sm text-gray-600">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStatusDemo;
