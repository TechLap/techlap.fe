import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/common/loading.spinner";
import Pagination from "../../components/common/pagination";

import { Plus } from "lucide-react";
import BrandTable from "../../components/admin/brands/brand.table";
import { apiDeleteBrand, apiFetchAllBrand, apiSearchBrand } from "../../config/api";
import { IBrand } from "../../types/backend";
import { useDebounce } from "use-debounce";
import BrandModal from "../../components/admin/brands/brand.modal";
import { toast } from "react-toastify";
import Access from "../auth/route/access";
import ModalDelete from "../../components/common/modal.delete";
import CustomToast from "../../components/common/toast.message";

const BrandPage = () => {
  const MAX_BRANDS_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [totalSearchPage, setTotalSearchPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<{name: string; createdAt: string | null}>({ name: "", createdAt: null });
  const [debouncedFilters] = useDebounce(filters, 500);

  const {
    isPending,
    data: brands,
    error,
  } = useQuery({
    queryKey: [["fetchAllBrands"], currentPage],
    queryFn: () => apiFetchAllBrand(`page=${currentPage}&size=${MAX_BRANDS_PAGE}`),
  });

  const [displayData, setDisplayData] = useState<IBrand[] | null>(
    brands?.data.data?.result ?? null
  );

  useEffect(() => {
    if (brands) {
      window.HSStaticMethods.autoInit(["select", "dropdown"]);
    }
  }, [brands]);

  const { data: searchData, error: searchError } = useQuery({
    queryKey: ["searchBrands", debouncedFilters, searchCurrentPage],
    queryFn: () =>
      apiSearchBrand(
        `page=${searchCurrentPage}&size=${MAX_BRANDS_PAGE}`,
        {
          name: debouncedFilters.name,
          createdAt: debouncedFilters.createdAt,
        }
      ),
    enabled: Object.values(debouncedFilters).some(
      (value) => value !== "" && value !== null
    ),
  });

  useEffect(() => {
    if (searchData) {
      setTotalSearchPage(searchData?.data?.data?.meta?.pages ?? 0);
      setDisplayData(searchData?.data?.data?.result ?? []);
    }
  }, [searchData]);

  useEffect(() => {
    if (!isSearching && brands) {
      setDisplayData(brands?.data.data?.result ?? []);
    }
  }, [brands, isSearching]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setIsSearching(!!value);
  };

  const queryClient = useQueryClient();
  const reloadTable = () => {
    queryClient.invalidateQueries({ queryKey: [["fetchAllBrands"]] });
  };

  const handleOpenCreateModal = () => {
    setIsOpenActionModal(true);
    setSelectedBrand(null);
  };

  const handleOpenEditModal = (brand: IBrand) => {
    setIsOpenActionModal(true);
    setSelectedBrand(brand);
  };

  const handleOpenDeleteModal = (brand: IBrand) => {
    setIsOpenDeleteModal(true);
    setSelectedBrand(brand);
  };

  const handleDeleteBrand = async () => {
    const res = await apiDeleteBrand(selectedBrand?.id ?? "");
    if (res?.data?.statusCode === 200) {
      reloadTable();
      toast.success(
        <CustomToast message="Xóa thương hiệu thành công!" className="text-green-600" />
      );
    } else {
      toast.error(
        <CustomToast message="Xóa thương hiệu thất bại!" className="text-red-600" />
      );
    }
    setSelectedBrand(null);
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
        <h1 className="text-lg font-semibold">Quản lý thương hiệu</h1>
        <Access permission={{ name: "Create a brand" }} hideChildren>
          <button
            type="button"
            className="py-2.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            onClick={handleOpenCreateModal}
          >
            <Plus className="w-4 h-4 text-white mr-2" />
            Thêm thương hiệu
          </button>
        </Access>
      </div>

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6">
            <BrandTable
              brandData={displayData}
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
                  : brands?.data.data?.meta.pages ?? 0
              }
            />
          </div>
        </>
      )}

      <BrandModal
        isOpenActionModal={isOpenActionModal}
        dataInit={selectedBrand}
        setDataInit={setSelectedBrand}
        onClose={() => {
          setSelectedBrand(null);
          setIsOpenActionModal(false);
        }}
        reloadTable={reloadTable}
      />

      <ModalDelete
        isOpenDeleteModal={isOpenDeleteModal}
        onDelete={handleDeleteBrand}
        onClose={() => {
          setSelectedBrand(null);
          setIsOpenDeleteModal(false);
        }}
        title={`thương hiệu: ${selectedBrand?.name}`}
        modalName={`Thương hiệu`}
      />
    </div>
  );
};

export default BrandPage;
