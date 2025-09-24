import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IOrder } from "../../../types/backend";
import { apiUpdateOrderInfo } from "../../../config/api";
import { toast } from "react-toastify";

interface IProps {
  isOpenActionModal: boolean;
  dataInit?: IOrder | null;
  setDataInit?: React.Dispatch<React.SetStateAction<IOrder | null>>;
  onClose: () => void;
  reloadTable: () => void;
}

interface FormValues extends IOrder {
  id: number;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  note?: string;
  status: "PENDING" | "PROCESSING" | "SHIPPING" | "DELIVERED" | "PAID" | "CANCELLED" | "";
}



const OrderModal = (props: IProps) => {
  const { isOpenActionModal, dataInit, onClose, reloadTable } = props;

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      id: dataInit?.id,
      receiverName: dataInit?.receiverName ?? dataInit?.customer?.fullName ?? "",
      receiverPhone: dataInit?.receiverPhone ?? dataInit?.customer?.phone ?? "",
      receiverAddress: dataInit?.receiverAddress ?? dataInit?.customer?.address ?? "",
      note: dataInit?.note ?? "",
      status: (dataInit?.status as any) ?? "",
    },
  });

  useEffect(() => {
    reset({
      id: dataInit?.id,
      receiverName: dataInit?.receiverName ?? dataInit?.customer?.fullName ?? "",
      receiverPhone: dataInit?.receiverPhone ?? dataInit?.customer?.phone ?? "",
      receiverAddress: dataInit?.receiverAddress ?? dataInit?.customer?.address ?? "",
      note: dataInit?.note ?? "",
      status: (dataInit?.status as any) ?? "",
    });
  }, [dataInit, reset]);

  const onSubmit = handleSubmit(async (dataForm: FormValues) => {
    // Chưa xử lý API – để bạn viết sau
    const res = await apiUpdateOrderInfo(dataForm);
    if (res?.data?.data) {
      toast.success("Cập nhật đơn hàng thành công");
      reloadTable();
      onClose();
      reset();
    } else {
      toast.error("Cập nhật đơn hàng thất bại");
    }
    onClose();
  });

  return (
    <div
      id="hs-medium-modal-order"
      className={`hs-overlay ${isOpenActionModal ? "open opened" : "hidden"} size-full fixed top-0 start-0 z-50 overflow-x-hidden overflow-y-auto pointer-events-none`}
      tabIndex={-1}
      aria-labelledby="hs-medium-modal-order-label"
    >
      {isOpenActionModal && (
        <div className="z-[-1] transition duration fixed inset-0 bg-gray-900/50"></div>
      )}
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-lg md:w-full m-3 md:mx-auto">
        <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3 id="hs-medium-modal-order-label" className="font-bold text-gray-800 text-lg">
              {dataInit ? "Cập nhật đơn hàng" : "Cập nhật đơn hàng"}
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

          <form onSubmit={onSubmit}>
            <div className="p-4 overflow-y-auto">
              <div className="grid sm:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="receiverName">
                    Người nhận
                  </label>
                  <input
                    id="receiverName"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Nhập tên người nhận"
                    {...register("receiverName")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="receiverPhone">
                    Số điện thoại
                  </label>
                  <input
                    id="receiverPhone"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Nhập số điện thoại"
                    {...register("receiverPhone")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="receiverAddress">
                    Địa chỉ nhận
                  </label>
                  <input
                    id="receiverAddress"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Nhập địa chỉ nhận"
                    {...register("receiverAddress")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="status">
                    Trạng thái đơn hàng
                  </label>
                  <select
                    id="status"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("status")}
                    defaultValue={(dataInit?.status as any) ?? ""}
                  >
                    <option className="text-gray-800 bg-gray-100" value="">
                      Chọn trạng thái...
                    </option>
                    <option className="text-gray-800 bg-gray-100" value="PENDING">PENDING</option>
                    <option className="text-gray-800 bg-gray-100" value="PROCESSING">PROCESSING</option>
                    <option className="text-gray-800 bg-gray-100" value="SHIPPING">SHIPPING</option>
                    <option className="text-gray-800 bg-gray-100" value="DELIVERED">DELIVERED</option>
                    <option className="text-gray-800 bg-gray-100" value="PAID">PAID</option>
                    <option className="text-gray-800 bg-gray-100" value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="note">
                    Ghi chú
                  </label>
                  <textarea
                    id="note"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black min-h-24"
                    placeholder="Nhập ghi chú cho đơn hàng"
                    {...register("note")}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;


