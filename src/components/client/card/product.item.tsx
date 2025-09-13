import { Minus, Plus, Trash2 } from "lucide-react";
import { NumericFormat } from "react-number-format";

export interface ProductItemProps {
    item: {
        id: number;
        name: string;
        price: number;
        discount?: number;
        image: string;
        quantity: number;
        discription: string;
    };
    updateQuantity: (id: number, delta: number) => void;
    removeItem: (id: number) => void;
}

export default function ProductItem({ item, updateQuantity, removeItem }: ProductItemProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition-colors">
            {/* Ảnh sản phẩm */}
            <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-20 h-48 sm:h-20 object-cover rounded-lg"
            />

            {/* Thông tin */}
            <div className="flex-1 w-full">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{item.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.discription}</p>

                {/* Giá */}
                <div className="flex items-center space-x-2 mt-2">
                    <span className="text-base sm:text-lg font-bold text-blue-600">
                        <NumericFormat
                            value={item.price - (item.discount as number / 100 )}
                            displayType="text"
                            thousandSeparator={true}
                            suffix={"đ"}
                        />
                    </span>
                    {item.price && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                            <NumericFormat
                                value={item.price}
                                displayType="text"
                                thousandSeparator={true}
                                suffix={"đ"}
                            />
                        </span>
                    )}
                </div>
            </div>

            {/* Nút tăng giảm + xóa */}
            <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:space-y-2">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
