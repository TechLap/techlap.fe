import { cn } from "../../../../utils/utils";
import Pagination from "../../../../components/common/pagination";

interface ProductStatsProps {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    className?: string;
    showingProducts: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductStats = ({ currentPage = 1, totalPages = 1, totalProducts = 0, className = "", showingProducts = 0, setCurrentPage }: ProductStatsProps) => {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            <p className="text-gray-500">
              Hiển thị {showingProducts} / {totalProducts} sản phẩm
            </p>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={totalPages} />
          </div>
    )
}

export default ProductStats;
