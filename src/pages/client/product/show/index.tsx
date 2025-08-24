import ProductCard from "../../../../components/client/card/product.card";
import { useCategories } from "../../../../hooks/useCategories";
import { useProducts } from "../../../../hooks/useProducts";
import SidebarFilter from "./sidebar.filter";
import ProductStats from "./product.stats";
import { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../../../../components/common/loading.spinner";
import { useFilterProduct } from "../../../../hooks/filter/useFilterProduct";
import { IProduct } from "../../../../types/backend";

const ProductShowPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [totalSearchPage, setTotalSearchPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const PRODUCTS_PER_PAGE = 8;
  const {
    categories,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = useCategories({
    currentPage: 1,
    size: 100,
  });

  const {
    products,
    isPending: isPendingProducts,
    isError: isErrorProducts,
  } = useProducts({
    currentPage: currentPage,
    size: PRODUCTS_PER_PAGE,
  });

  const priceRange = useMemo(() => {
    return {
      min: products?.data.data?.result.reduce((min, product) => Math.min(min, product.price), Infinity) || 0,
      max: products?.data.data?.result.reduce((max, product) => Math.max(max, product.price), 0) || 0,
    };
  }, [products]);

  const [displayData, setDisplayData] = useState<IProduct[]>(
    products?.data.data?.result || []
  );

  // display data
  useEffect(() => {
    if (products) {
      setDisplayData(products.data.data?.result || []);
    }
  }, [products]);

  const { filters, resetFilters, updateFilter, searchData, searchError } =
    useFilterProduct(undefined, {
      searchCurrentPage: searchCurrentPage,
      searchPageSize: PRODUCTS_PER_PAGE,
      isSearching: isSearching,
      setIsSearching: setIsSearching,
      priceRange: priceRange,
    });

  useEffect(() => {
    if (searchData) {
      setDisplayData(searchData.data.data?.result || []);
      setTotalSearchPage(searchData.data.data?.meta.pages || 0);
    }
  }, [searchData]);

  useEffect(() => {
    if (!isSearching && products) {
      setDisplayData(products.data.data?.result || []);
    }
  }, [products, isSearching]);

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Sản phẩm</h1>
        <p className="text-gray-500">
          Khám phá bộ sưu tập thực phẩm đông lạnh chất lượng cao
        </p>
      </div>
      <div className="flex lg:flex-row flex-col gap-6">
        {/* Left content*/}
        <SidebarFilter
          categories={categories?.data.data?.result || []}
          isPending={isPendingCategories}
          isError={isErrorCategories}
          filters={filters}
          resetFilters={resetFilters}
          updateFilter={updateFilter}
          isSearching={isSearching}
          priceRange={priceRange}
        />

        {/* Right content*/}
        <div className="flex-1">
          <ProductStats
            className="mb-6"
            currentPage={isSearching ? searchCurrentPage : currentPage}
            totalPages={
              isSearching
                ? totalSearchPage
                : products?.data.data?.meta.pages || 0
            }
            totalProducts={
              isSearching
                ? searchData?.data.data?.meta.total || 0
                : products?.data.data?.meta.total || 0
            }
            showingProducts={displayData.length}
            setCurrentPage={isSearching ? setSearchCurrentPage : setCurrentPage}
          />
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {displayData.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={`${process.env.REACT_APP_URL_STORAGE_FILE}/productImgs/${product.productImage}`}
                name={product.name}
                price={product.price}
                categoryName={product.category?.name || "Không có danh mục"}
                description={product.description}
              />
            ))}
          </div>
          {isPendingProducts && <LoadingSpinner className="mt-10" />}
          {isErrorProducts && (
            <div className="text-red-500 text-center text-2xl font-bold">
              Lỗi khi tải sản phẩm
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductShowPage;
