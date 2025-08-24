import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import LoadingSpinner from "../../components/common/loading.spinner";
import Pagination from "../../components/common/pagination";

import { Plus } from "lucide-react";
import ProductModal from "../../components/admin/products/product.modal";
import ProductTable from "../../components/admin/products/product.table";
import { apiDeleteProduct, apiFetchAllProduct, apiSearchProduct } from "../../config/api";
import { IProduct, IProductFilter } from "../../types/backend";
import ProductModalDetail from "../../components/admin/products/product.modal.detail";
import Access from "../auth/route/access";
import ModalDelete from "../../components/common/modal.delete";
import { toast } from "react-toastify";
import CustomToast from "../../components/common/toast.message";

const ProductPage = () => {
  const MAX_PRODUCTS_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [totalSearchPage, setTotalSearchPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [filters, setFilters] = useState<IProductFilter>({
    name: "",
    quantity: 0,
    unit: "",
    price: 0,
    supplier: {
      id: "",
    },
    category: {
      id: "",
    },
  });
  const [debouncedFilters] = useDebounce(filters, 500);

  const {
    isPending,
    data: products,
    error,
  } = useQuery({
    queryKey: [["fetchAllProducts"], currentPage],
    queryFn: () =>
      apiFetchAllProduct(`page=${currentPage}&size=${MAX_PRODUCTS_PAGE}`),
  });

  const [displayData, setDisplayData] = useState<IProduct[] | null>(
    products?.data.data?.result ?? null
  );

  useEffect(() => {
    if (products) {
      window.HSStaticMethods.autoInit(["select", "dropdown"]);
    }
  }, [products]);

  // Search products
  const { data: searchData, error: searchError } = useQuery({
    queryKey: ["searchProducts", debouncedFilters, searchCurrentPage],
    queryFn: () =>
      apiSearchProduct(`page=${searchCurrentPage}&size=${MAX_PRODUCTS_PAGE}`, {
        name: debouncedFilters.name,
        quantity: debouncedFilters.quantity,
        unit: debouncedFilters.unit,
        price: debouncedFilters.price,
        ...(debouncedFilters.category?.id
          ? { category: { id: debouncedFilters.category.id } }
          : {}),
        ...(debouncedFilters.supplier?.id
          ? { supplier: { id: debouncedFilters.supplier.id } }
          : {}),
      }),
    enabled: Object.values(debouncedFilters).some(
      (value) => value !== "" || value !== null || value !== 0
    ),
  });

  // Set total search page
  useEffect(() => {
    if (searchData) {
      setTotalSearchPage(searchData?.data?.data?.meta?.pages ?? 0);
      setDisplayData(searchData?.data?.data?.result ?? []);
    }
  }, [searchData]);

  // Set display data
  useEffect(() => {
    if (!isSearching && products) {
      setDisplayData(products?.data.data?.result ?? []);
    }
  }, [products, isSearching]);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => {
      let newValue;
      if (key === "supplier") {
        newValue = { supplier: { id: value as string } };
      } else if (key === "category") {
        newValue = { category: { id: value as string } };
      } else {
        newValue = { [key]: value };
      }
      return { ...prev, ...newValue };
    });
    setIsSearching(!!value);
  };

  const queryClient = useQueryClient();
  const reloadTable = () => {
    queryClient.invalidateQueries({ queryKey: [["fetchAllProducts"]] });
  };

  const handleOpenCreateModal = () => {
    setIsOpenActionModal(true);
    setSelectedProduct(null);
  };

  const handleOpenEditModal = (product: IProduct) => {
    setIsOpenActionModal(true);
    setSelectedProduct(product);
  };

  const handleOpenDeleteModal = (product: IProduct) => {
    setIsOpenDeleteModal(true);
    setSelectedProduct(product);
  };

  const handleOpenViewModal = (product: IProduct) => {
    setIsOpenViewModal(true);
    setSelectedProduct(product);
  };

  const handleDeleteProduct = async () => {
    const res = await apiDeleteProduct(selectedProduct?.id ?? "");
    if (res?.data?.statusCode === 200) {
      reloadTable();
      toast.success(<CustomToast message="Xóa sản phẩm thành công!" className="text-green-600" />);
    } else {
      toast.error(<CustomToast message="Xóa sản phẩm thất bại!" className="text-red-600" />);
    }
    setSelectedProduct(null);
    setIsOpenDeleteModal(false);
  };

  if (error || searchError) {
    return (
      <div>
        <p>Something went wrong!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-lg font-semibold">Quản lý sản phẩm</h1>
        <Access permission={{ name: "Create a product" }} hideChildren>
          <button
            type="button"
            className="py-2.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-800 text-white hover:bg-green-900 focus:outline-hidden focus:bg-green-900 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            onClick={handleOpenCreateModal}
          >
            <Plus className="w-4 h-4 text-white mr-2" />
            Thêm sản phẩm
          </button>
        </Access>
      </div>

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6">
            <ProductTable
              onViewClick={handleOpenViewModal}
              productData={displayData}
              onEditClick={handleOpenEditModal}
              onDeleteClick={handleOpenDeleteModal}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="flex justify-center">
            <Pagination
              currentPage={isSearching ? searchCurrentPage : currentPage}
              setCurrentPage={
                isSearching ? setSearchCurrentPage : setCurrentPage
              }
              total={
                isSearching
                  ? totalSearchPage
                  : products?.data.data?.meta.pages ?? 0
              }
            />
          </div>
        </>
      )}

      <ProductModal
        isOpenActionModal={isOpenActionModal}
        dataInit={selectedProduct}
        setDataInit={setSelectedProduct}
        onClose={() => {
          setSelectedProduct(null);
          setIsOpenActionModal(false);
        }}
        reloadTable={reloadTable}
      />

      <ProductModalDetail
        isOpenViewModal={isOpenViewModal}
        dataInit={selectedProduct}
        setDataInit={setSelectedProduct}
        onClose={() => {
          setSelectedProduct(null);
          setIsOpenViewModal(false);
        }}
      />

      <ModalDelete
        isOpenDeleteModal={isOpenDeleteModal}
        onDelete={handleDeleteProduct}
        onClose={() => {
          setSelectedProduct(null);
          setIsOpenDeleteModal(false);
        }}
        title={`sản phẩm: ${selectedProduct?.name}`}
        modalName={`Sản phẩm`}
      />
    </div>
  );
};

export default ProductPage;
