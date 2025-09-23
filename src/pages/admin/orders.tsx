import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/common/loading.spinner";
import Pagination from "../../components/common/pagination";
import OrderTable from "../../components/admin/orders/order.table";
import OrderModalDetail from "../../components/admin/orders/order.modal.detail";
import { apiFetchAllOrder } from "../../config/api";
import { IOrder } from "../../types/backend";

const OrderPage = () => {
  const MAX_ORDERS_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data: orders, error } = useQuery({
    queryKey: [["fetchAllOrders"], currentPage],
    queryFn: () => apiFetchAllOrder(`page=${currentPage}&size=${MAX_ORDERS_PAGE}`),
  });

  const [displayData, setDisplayData] = useState<IOrder[] | null>(
    orders?.data.data?.result ?? null
  );

  useEffect(() => {
    if (orders) {
      setDisplayData(orders?.data.data?.result ?? []);
    }
  }, [orders]);

  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const handleOpenViewModal = (order: IOrder) => {
    setSelectedOrder(order);
    setIsOpenViewModal(true);
  };

  if (error) {
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

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6">
            <OrderTable orderData={displayData} onViewClick={handleOpenViewModal} />
          </div>

          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={orders?.data.data?.meta.pages ?? 0}
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
    </div>
  );
};

export default OrderPage;
