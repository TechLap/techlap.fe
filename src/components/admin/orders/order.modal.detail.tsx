import { IOrder } from "../../../types/backend";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import Badge from "../../ui/badge";

interface IOrderModalDetailProps {
  isOpenViewModal: boolean;
  dataInit: IOrder | null;
  setDataInit: (order: IOrder | null) => void;
  onClose: () => void;
}

const OrderModalDetail = (props: IOrderModalDetailProps) => {
  const { isOpenViewModal, dataInit, onClose } = props;

  const getStatusColor = (status?: string) => {
    const key = (status || "").toLowerCase();
    const map: Record<string, "amber" | "green" | "red" | "purple" | "blue" | "gray"> = {
      pending: "amber",
      paid: "green",
      cancelled: "red",
      processing: "purple",
      shipping: "blue",
      delivered: "gray",
    };
    return map[key] ?? "gray";
  };

  return (
    <div
      id="hs-large-modal-order-view"
      className={`hs-overlay ${isOpenViewModal ? "open opened" : "hidden"} hs-overlay-open:opacity-100 hs-overlay-open:duration-500 size-full fixed top-0 start-0 z-50 opacity-0 overflow-x-hidden transition-all pointer-events-none`}
      aria-labelledby="hs-large-modal-order-label-view"
    >
      {isOpenViewModal && (
        <div className="z-[-1] transition duration fixed inset-0 bg-gray-900/50"></div>
      )}
      <div className="md:max-w-3xl md:w-full m-3 md:mx-auto">
        <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
            <h3 id="hs-large-modal-order-label-view" className="text-lg font-bold text-gray-800">
              Chi tiết đơn hàng
            </h3>
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Close"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <div className="p-4 overflow-y-auto grid gap-4 h-[80vh]">
            <div className="flex flex-col gap-3">
              <div className="text-gray-800 text-base font-semibold">Đơn hàng</div>
              <div className="text-xl font-semibold text-blue-600 break-all">#{dataInit?.orderCode}</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Tổng tiền</span>
                <span className="text-2xl font-bold text-blue-600">
                  <NumericFormat value={dataInit?.totalPrice} displayType="text" allowLeadingZeros thousandSeparator suffix="đ" />
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Ngày tạo</span>
                <span className="text-gray-800">{dataInit?.createdAt ? dayjs(dataInit.createdAt).format("DD/MM/YYYY HH:mm") : ""}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Trạng thái đơn hàng</span>
                <span>
                  <Badge variant="outline" color={getStatusColor(dataInit?.status)} content={dataInit?.status ?? ""} />
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <div className="text-gray-800 text-base font-semibold">Thông tin khách hàng</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Tên</span>
                <span className="text-gray-800">{dataInit?.customer?.fullName ?? dataInit?.receiverName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Số điện thoại</span>
                <span className="text-gray-800">{dataInit?.customer?.phone ?? dataInit?.receiverPhone}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Địa chỉ</span>
                <span className="text-gray-800 text-right max-w-[70%]">{dataInit?.customer?.address ?? dataInit?.receiverAddress}</span>
              </div>
            </div>

            <div className="rounded-lg block p-4 border border-gray-200">
              <h3 className="text-base font-semibold mb-3 text-gray-800">Sản phẩm đã đặt</h3>
              <div className="flex flex-col divide-y divide-gray-200">
                {(dataInit?.orderDetails ?? []).map((od) => (
                  <div key={`${od.product.id}-${od.id ?? Math.random()}`} className="py-3 grid grid-cols-[96px_1fr_80px_minmax(120px,auto)] gap-5 items-center">
                    <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                      {od.product.image ? (
                        <img
                          src={`${process.env.REACT_APP_URL_STORAGE_FILE}/${od.product.image}`}
                          alt={od.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-800 whitespace-normal break-words">{od.product.name}</div>
                    </div>
                    <div className="text-sm text-gray-600 whitespace-nowrap text-center">SL: {od.quantity}</div>
                    <div className="text-right text-sm text-blue-600 whitespace-nowrap">
                      <NumericFormat value={od.price} displayType="text" allowLeadingZeros thousandSeparator suffix="đ" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg block p-4 border border-gray-200">
              <h3 className="text-base font-semibold mb-2 text-gray-800">Ghi chú</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line">{dataInit?.note || ""}</p>
            </div>

            <div className="rounded-lg block p-4 border border-gray-200">
              <h3 className="text-base font-semibold mb-2 text-gray-800">Thông tin thanh toán</h3>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Phương thức</span><span className="text-gray-800">{dataInit?.paymentMethod?.toUpperCase()}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Trạng thái</span><span>
                  {(() => {
                    const key = (dataInit?.paymentStatus || "").toLowerCase();
                    const map: Record<string, "green" | "amber" | "red" | "gray"> = {
                      success: "green",
                      pending: "amber",
                      failed: "red",
                      cancelled: "red",
                    };
                    const color = map[key] ?? "gray";
                    return <Badge variant="solid" color={color as any} content={dataInit?.paymentStatus ?? ""} />;
                  })()}
                </span></div>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModalDetail;


