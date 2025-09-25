import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import LoadingSpinner from "../../components/common/loading.spinner";
import Pagination from "../../components/common/pagination";
import OrderTable from "../../components/admin/orders/order.table";
import OrderModalDetail from "../../components/admin/orders/order.modal.detail";
import OrderModal from "../../components/admin/orders/order.modal";
import { apiFetchAllOrder, apiSearchOrder } from "../../config/api";
import { IOrder, IOrderFilter } from "../../types/backend";

const OrderPage = () => {
  const MAX_ORDERS_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [totalSearchPage, setTotalSearchPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [filters, setFilters] = useState<IOrderFilter & { customerName?: string }>({
    orderCode: "",
    status: "",
    customerName: "",
    createdAt: null,
  });
  const [debouncedFilters] = useDebounce(filters, 500);

  const {
    isPending,
    data: orders,
    error,
  } = useQuery({
    queryKey: [["fetchAllOrders"], currentPage],
    queryFn: () =>
      apiFetchAllOrder(`page=${currentPage}&size=${MAX_ORDERS_PAGE}`),
  });

  const [displayData, setDisplayData] = useState<IOrder[] | null>(
    orders?.data.data?.result ?? null
  );

  useEffect(() => {
    if (orders) {
      setDisplayData(orders?.data.data?.result ?? []);
    }
  }, [orders]);

  // Search orders
  const { data: searchData, error: searchError } = useQuery({
    queryKey: ["searchOrders", debouncedFilters, searchCurrentPage],
    queryFn: () =>
      apiSearchOrder(`page=${searchCurrentPage}&size=${MAX_ORDERS_PAGE}`, {
        orderCode: debouncedFilters.orderCode,
        status: debouncedFilters.status,
        createdAt: debouncedFilters.createdAt,
        ...(debouncedFilters.customerName
          ? { customer: { fullName: debouncedFilters.customerName } }
          : {}),
      }),
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
    if (!isSearching && orders) {
      setDisplayData(orders?.data.data?.result ?? []);
    }
  }, [orders, isSearching]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      ...(key === "createdAt" ? { createdAt: value } : { [key]: value }),
    }));
    setIsSearching(!!value);
  };

  const handleOpenViewModal = (order: IOrder) => {
    setSelectedOrder(order);
    setIsOpenViewModal(true);
  };

  const handleOpenEditModal = (order: IOrder) => {
    setSelectedOrder(order);
    setIsOpenActionModal(true);
  };

  const queryClient = useQueryClient();
  const reloadTable = () => {
    queryClient.invalidateQueries({ queryKey: [["fetchAllOrders"]] });
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
        <h1 className="text-lg font-semibold">Quản lý đơn hàng</h1>
      </div>

      {isPending ?(
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6">
            <OrderTable
              orderData={displayData}
              onViewClick={handleOpenViewModal}
              onEditClick={handleOpenEditModal}
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
                  : orders?.data.data?.meta.pages ?? 0
              }
            />
          </div>
        </>
      )}
      <OrderModalDetail
        isOpenViewModal={isOpenViewModal}
        dataInit={selectedOrder}
        setDataInit={setSelectedOrder}
        onClose={() => {
          setSelectedOrder(null);
          setIsOpenViewModal(false);
        }}
      />

      <OrderModal
        isOpenActionModal={isOpenActionModal}
        dataInit={selectedOrder}
        setDataInit={setSelectedOrder}
        onClose={() => {
          setSelectedOrder(null);
          setIsOpenActionModal(false);
        }}
        reloadTable={reloadTable}
      />
    </div>
  );
};

export default OrderPage;
