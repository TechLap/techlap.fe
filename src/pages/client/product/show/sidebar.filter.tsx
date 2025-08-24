import SearchIcon from "../../../../components/common/icons/search";
import SliderItem from "../../../../components/common/slider";
import Badge from "../../../../components/ui/badge";
import { ICategory, IProductFilter } from "../../../../types/backend";
import { NumericFormat } from "react-number-format";

interface SidebarFilterProps {
  categories: ICategory[];
  isPending: boolean;
  isError: boolean;
  filters: IProductFilter;
  updateFilter: (key: keyof IProductFilter, value: string | number) => void;
  resetFilters: () => void;
  isSearching: boolean;
  priceRange: {
    min: number;
    max: number;
  };
}

const SidebarFilter = ({
  categories,
  isPending,
  isError,
  filters,
  updateFilter,
  isSearching,
  resetFilters,
  priceRange,
}: SidebarFilterProps) => {
  return (
    <div className="lg:w-80 w-full flex-shrink-0">
      <div className="bg-white rounded-lg shadow-md p-4 sticky top-20">
        {/* Search bar*/}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
              <SearchIcon size={14} color="gray" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="py-2 sm:py-2.5 ps-10 pe-4 block w-full border-gray-200 border rounded-lg sm:text-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              value={filters.name}
              onChange={(e) => {
                updateFilter("name", e.target.value);
              }}
            />
          </div>
        </div>

        {/* if isSearching, show badge filter*/}
        {isSearching && (
          <div className="mb-6">
            <div className="font-medium text-gray-700 flex items-center justify-between text-sm mb-2">
              <span>Bộ lọc đang áp dụng: </span>
              <button
                className="text-sm text-red-500 py-1 px-2 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white transition-colors"
                onClick={() => resetFilters()}
              >
                Xóa bộ lọc
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.name && filters.name !== "" && (
                <Badge content={`Tìm kiếm: ${filters.name}"`} />
              )}
              {filters.category && filters.category?.id !== "" && (
                <Badge
                  content={
                    categories.find(
                      (category) => category.id === filters.category?.id
                    )?.name || ""
                  }
                />
              )}
              {filters.priceRange?.min !== 0 && (
                <Badge
                  content={`Giá: ${filters.priceRange?.min} - ${priceRange?.max}`}
                />
              )}
            </div>
          </div>
        )}

        {/* Category filter*/}
        <div className="mb-6">
          <div className="font-medium text-gray-700 mb-2">Danh mục</div>
          <div className="space-y-2">
            <button
              className={`w-full py-2 px-4 rounded-lg text-left border border-gray-200 text-sm font-medium text-gray-700 hover:bg-green-700 hover:text-white ${
                filters.category?.id === ""
                  ? "bg-green-700 text-white"
                  : "text-gray-700"
              } transition-colors`}
              onClick={() => updateFilter("category", "")}
            >
              Tất cả
            </button>
            {categories.map(
              (category) =>
                category.active === true && (
                  <button
                    key={category.id}
                    className={`w-full py-2 px-4 rounded-lg text-left border border-gray-200 text-sm font-medium text-gray-700 hover:bg-green-700 hover:text-white ${
                      filters.category?.id === category.id
                        ? "bg-green-700 text-white"
                        : "text-gray-700"
                    } transition-colors`}
                    onClick={() => updateFilter("category", category.id || "")}
                  >
                    {category.name}
                  </button>
                )
            )}
            {isPending && (
              <div className="w-full py-2 px-4 rounded-lg text-left border border-gray-200 text-sm font-medium text-amber-700">
                Đang tải...
              </div>
            )}
            {isError && (
              <div className="w-full py-2 px-4 rounded-lg text-left border border-gray-200 text-sm font-medium text-red-700">
                Lỗi khi tải danh mục
              </div>
            )}
          </div>
        </div>
        {/* price range*/}
        <div className="mb-6">
          <div className="font-medium text-gray-700 mb-2">Khoảng giá</div>
          <div className="space-y-2">
            <SliderItem
              className="w-full"
              value={[
                filters.priceRange?.min || priceRange.min,
                priceRange.max,
              ]}
              min={priceRange.min}
              max={priceRange.max}
              step={5000}
              onValueChange={(value) => {
                updateFilter("priceRange", value[0] || 0);
                console.log(value);
              }}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                <NumericFormat
                  value={filters.priceRange?.min || priceRange.min}
                  displayType="text"
                  allowLeadingZeros
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </span>
              <span>
                <NumericFormat
                  value={filters.priceRange?.max || priceRange.max}
                  displayType="text"
                  allowLeadingZeros
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </span>
            </div>
          </div>
        </div>

        {/* product status*/}
        <div className="mb-6">
          <div className="font-medium text-gray-700 mb-2">Trạng thái</div>
          <div className="space-y-2">
            <button className="w-full py-2 px-4 rounded-lg text-left border border-gray-200 text-sm font-medium text-gray-700 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white transition-colors">
              Tất cả
            </button>
            <button className="w-full py-2 px-4 rounded-lg text-left border border-gray-200 text-sm font-medium text-gray-700 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white transition-colors">
              Sản phẩm nổi bật
            </button>
            <button className="w-full py-2 px-4 rounded-lg text-left border border-gray-200 text-sm font-medium text-gray-700 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white transition-colors">
              Sản phẩm mới nhất
            </button>
            <button className="w-full py-2 px-4 rounded-lg text-left border border-gray-200 text-sm font-medium text-gray-700 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white transition-colors">
              Sản phẩm bán chạy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
