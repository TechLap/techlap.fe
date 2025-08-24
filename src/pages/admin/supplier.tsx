import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/common/loading.spinner";
import Pagination from "../../components/common/pagination";

import { Plus } from "lucide-react";
import SupplierTable from "../../components/admin/suppliers/supplier.table";
import { apiDeleteSupplier, apiFetchAllSupplier, apiSearchSupplier } from "../../config/api";
import { ISupplier, ISupplierFilter } from "../../types/backend";
import { useDebounce } from "use-debounce";
import SupplierModal from "../../components/admin/suppliers/supplier.modal";
import Access from "../auth/route/access";
import ModalDelete from "../../components/common/modal.delete";
import CustomToast from "../../components/common/toast.message";
import { toast } from "react-toastify";

const SupplierPage = () => {
  const MAX_SUPPLIERS_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [totalSearchPage, setTotalSearchPage] = useState(1);
  const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(
    null
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<ISupplierFilter>({
    name: "",
    contactInfo: "",
    active: true,
    createdAt: null,
  });
  const [debouncedFilters] = useDebounce(filters, 500);

  const {
    isPending,
    data: suppliers,
    error,
  } = useQuery({
    queryKey: [["fetchAllSuppliers"], currentPage],
    queryFn: () =>
      apiFetchAllSupplier(`page=${currentPage}&size=${MAX_SUPPLIERS_PAGE}`),
  });

  const [displayData, setDisplayData] = useState<ISupplier[] | null>(
    suppliers?.data.data?.result ?? null
  );

  useEffect(() => {
    if (suppliers) {
      window.HSStaticMethods.autoInit(["select", "dropdown"]);
    }
  }, [suppliers]);

  // Search suppliers
  const { data: searchData, error: searchError } = useQuery({
    queryKey: ["searchSuppliers", debouncedFilters, searchCurrentPage],
    queryFn: () =>
      apiSearchSupplier(
        `page=${searchCurrentPage}&size=${MAX_SUPPLIERS_PAGE}`,
        {
          name: debouncedFilters.name,
          contactInfo: debouncedFilters.contactInfo,
          active: debouncedFilters.active,
          createdAt: debouncedFilters.createdAt,
        }
      ),
    enabled: Object.values(debouncedFilters).some(
      (value) => value !== "" || value !== null
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
    if (!isSearching && suppliers) {
      setDisplayData(suppliers?.data.data?.result ?? []);
    }
  }, [suppliers, isSearching]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setIsSearching(!!value);
  };

  const queryClient = useQueryClient();
  const reloadTable = () => {
    queryClient.invalidateQueries({ queryKey: [["fetchAllSuppliers"]] });
  };

  const handleOpenCreateModal = () => {
    setIsOpenActionModal(true);
    setSelectedSupplier(null);
  };

  const handleOpenEditModal = (supplier: ISupplier) => {
    setIsOpenActionModal(true);
    setSelectedSupplier(supplier);
  };

  const handleOpenDeleteModal = (supplier: ISupplier) => {
    setIsOpenDeleteModal(true);
    setSelectedSupplier(supplier);
  };

  const handleDeleteSupplier = async () => {
    const res = await apiDeleteSupplier(selectedSupplier?.id ?? "");
    if (res?.data?.statusCode === 200) {
      reloadTable();
      toast.success(<CustomToast message="Xóa nhà cung cấp thành công!" className="text-green-600" />);
    } else {
      toast.error(<CustomToast message="Xóa nhà cung cấp thất bại!" className="text-red-600" />);
    }
    setSelectedSupplier(null);
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
        <h1 className="text-lg font-semibold">Quản lý nhà cung cấp</h1>
        <Access permission={{ name: "Create a supplier" }} hideChildren>
          <button
            type="button"
            className="py-2.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-800 text-white hover:bg-green-900 focus:outline-hidden focus:bg-green-900 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            onClick={handleOpenCreateModal}
          >
            <Plus className="w-4 h-4 text-white mr-2" />
            Thêm nhà cung cấp
          </button>
        </Access>
      </div>

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6">
            <SupplierTable
              supplierData={displayData}
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
                  : suppliers?.data.data?.meta.pages ?? 0
              }
            />
          </div>
        </>
      )}

      <SupplierModal
        isOpenActionModal={isOpenActionModal}
        dataInit={selectedSupplier}
        setDataInit={setSelectedSupplier}
        onClose={() => {
          setSelectedSupplier(null);
          setIsOpenActionModal(false);
        }}
        reloadTable={reloadTable}
      />

      <ModalDelete
        isOpenDeleteModal={isOpenDeleteModal}
        onDelete={handleDeleteSupplier}
        onClose={() => {
          setSelectedSupplier(null);
          setIsOpenDeleteModal(false);
        }}
        title={`nhà cung cấp: ${selectedSupplier?.name}`}
        modalName={`Nhà cung cấp`}
      />
    </div>
  );
};

export default SupplierPage;
