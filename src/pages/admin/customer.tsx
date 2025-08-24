import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import LoadingSpinner from "../../components/common/loading.spinner";
import Pagination from "../../components/common/pagination";

import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import CustomerTable from "../../components/admin/customers/customer.table";
import ModalDelete from "../../components/common/modal.delete";
import CustomToast from "../../components/common/toast.message";
import {
  apiDeleteCustomer,
  apiFetchAllCustomer,
  apiSearchCustomer,
} from "../../config/api";
import { ICustomer, ICustomerFilter } from "../../types/backend";
import Access from "../auth/route/access";
import CustomerModal from "../../components/admin/customers/customer.modal";

const CustomerPage = () => {
  const MAX_CUSTOMERS_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [totalSearchPage, setTotalSearchPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [filters, setFilters] = useState<ICustomerFilter>({
    email: "",
    name: "",
    phone: "",
    createdAt: null,
  });
  const [debouncedFilters] = useDebounce(filters, 500);

  const {
    isPending,
    data: customers,
    error,
  } = useQuery({
    queryKey: [["fetchAllCustomers"], currentPage],
    queryFn: () =>
      apiFetchAllCustomer(`page=${currentPage}&size=${MAX_CUSTOMERS_PAGE}`),
  });

  const [displayData, setDisplayData] = useState<ICustomer[] | null>(
    customers?.data.data?.result ?? null
  );

  useEffect(() => {
    if (customers) {
      window.HSStaticMethods.autoInit(["select", "dropdown"]);
    }
  }, [customers]);

  const { data: searchData, error: searchError } = useQuery({
    queryKey: ["searchCustomers", debouncedFilters, searchCurrentPage],
    queryFn: () =>
      apiSearchCustomer(
        `page=${searchCurrentPage}&size=${MAX_CUSTOMERS_PAGE}`,
        {
          email: debouncedFilters.email,
          name: debouncedFilters.name,
          phone: debouncedFilters.phone,
          createdAt: debouncedFilters.createdAt,
        }
      ),
    enabled: Object.values(debouncedFilters).some(
      (value) => value !== "" || value !== null
    ),
  });

  useEffect(() => {
    if (searchData) {
      setTotalSearchPage(searchData?.data?.data?.meta?.pages ?? 0);
      setDisplayData(searchData?.data?.data?.result ?? []);
    }
  }, [searchData]);

  useEffect(() => {
    if (!isSearching && customers) {
      setDisplayData(customers?.data.data?.result ?? []);
    }
  }, [customers, isSearching]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      ...(key === "createdAt" ? { createdAt: value } : { [key]: value }),
    }));
    setIsSearching(!!value);
  };

  const handleOpenCreateModal = () => {
    setIsOpenActionModal(true);
    setSelectedCustomer(null);
  };

  const handleOpenEditModal = (customer: ICustomer) => {
    setIsOpenActionModal(true);
    setSelectedCustomer(customer);
  };

  const handleOpenDeleteModal = (customer: ICustomer) => {
    setIsOpenDeleteModal(true);
    setSelectedCustomer(customer);
  };

  const queryClient = useQueryClient();
  const reloadTable = () => {
    queryClient.invalidateQueries({ queryKey: [["fetchAllCustomers"]] });
  };

  const handleDeleteCustomer = async () => {
    const res = await apiDeleteCustomer(selectedCustomer?.id ?? "");
    if (res?.data?.statusCode === 200) {
      reloadTable();
      toast.success(
        <CustomToast
          message="Xóa khách hàng thành công!"
          className="text-green-600"
        />
      );
    } else {
      toast.error(
        <CustomToast
          message="Xóa khách hàng thất bại!"
          className="text-red-600"
        />
      );
    }
    setSelectedCustomer(null);
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
        <h1 className="text-lg font-semibold">Quản lý khách hàng</h1>
        <Access permission={{ name: "Create a customer" }} hideChildren>
          <button
            type="button"
            className="py-2.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-800 text-white hover:bg-green-900 focus:outline-hidden focus:bg-green-900 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            onClick={handleOpenCreateModal}
          >
            <Plus className="w-4 h-4 text-white mr-2" />
            Thêm khách hàng
          </button>
        </Access>
      </div>

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6">
            <CustomerTable
              customerData={displayData}
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
                  : customers?.data.data?.meta.pages ?? 0
              }
            />
          </div>
        </>
      )}

      <CustomerModal
        isOpenActionModal={isOpenActionModal}
        dataInit={selectedCustomer}
        setDataInit={setSelectedCustomer}
        onClose={() => {
          setSelectedCustomer(null);
          setIsOpenActionModal(false);
        }}
        reloadTable={reloadTable}
      />

      <ModalDelete
        isOpenDeleteModal={isOpenDeleteModal}
        onDelete={handleDeleteCustomer}
        onClose={() => {
          setSelectedCustomer(null);
          setIsOpenDeleteModal(false);
        }}
        title={`khách hàng: ${selectedCustomer?.name}`}
        modalName={`Khách hàng`}
      />
    </div>
  );
};

export default CustomerPage;
