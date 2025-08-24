import { NumericFormat } from "react-number-format";
import { IProduct } from "../../../types/backend";
import dayjs from "dayjs";

interface IProductModalDetailProps {
  isOpenViewModal: boolean;
  dataInit: IProduct | null;
  setDataInit: (product: IProduct | null) => void;
  onClose: () => void;
}
dayjs.locale("vi");

const ProductModalDetail = (props: IProductModalDetailProps) => {
  const { isOpenViewModal, dataInit, setDataInit, onClose } = props;

  return (
    <div
      id="hs-large-modal-view"
      className={`hs-overlay ${
        isOpenViewModal ? "open opened" : "hidden"
      } hs-overlay-open:opacity-100 hs-overlay-open:duration-500 size-full fixed top-0 start-0 z-50 opacity-0 overflow-x-hidden transition-all pointer-events-none`}
      aria-labelledby="hs-large-modal-label-view"
    >
      {isOpenViewModal && (
        <div className="z-[-1] transition duration fixed inset-0 bg-gray-900/50"></div>
      )}
      <div className="md:max-w-xl md:w-full m-3 md:mx-auto">
        <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
            <h3
              id="hs-large-modal-label-view"
              className="text-lg font-bold text-gray-800"
            >
              Chi tiết sản phẩm
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
          <div className="p-4 overflow-y-auto grid grid-row-4 gap-4 max-h-[460px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              <div className="col-span-1">
                <img
                  src={`${process.env.REACT_APP_URL_STORAGE_FILE}/productImgs/${dataInit?.productImage}`}
                  alt="product"
                  className="w-full h-64 max-w-full max-h-52 object-cover rounded-lg"
                />
              </div>
              <div className="col-span-1 flex flex-col justify-between">
                <p className="text-base text-gray-800 font-bold mb-2">
                  {dataInit?.name}
                </p>
                <span className="inline-flex w-fit items-center gap-x-1.5 py-1.5 px-3 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                  {dataInit?.category?.name}
                </span>
                <div className="grid grid-row-3 mt-12 divide-y divide-gray-200">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium text-sm">
                      Giá:
                    </span>
                    <span className="text-green-600 font-medium text-sm">
                      <NumericFormat
                        value={dataInit?.price}
                        displayType="text"
                        allowLeadingZeros
                        thousandSeparator={true}
                        suffix={"đ"}
                      />
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium text-sm">
                      Số lượng:
                    </span>
                    <span className="text-gray-600 font-medium text-sm">
                      {dataInit?.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium text-sm">
                      Đơn vị:
                    </span>
                    <span className="text-gray-600 font-medium text-sm">
                      {dataInit?.unit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-span-2 rounded-lg block p-4 border border-gray-200">
              <h3 className="text-sm font-medium mb-2">
                Thông tin nhà cung cấp
              </h3>
              <p className="text-gray-600 text-xs">
                {dataInit?.supplier?.name}
              </p>
            </div>
            <div className="row-span-2 rounded-lg block p-4 border border-gray-200">
              <h3 className="text-sm font-medium mb-2">Mô tả</h3>
              <p className="text-gray-600 text-xs">{dataInit?.description}</p>
            </div>
            <div className="row-span-2 rounded-lg block p-4 border border-gray-200">
              <h3 className="text-sm font-medium mb-2">Thông tin bổ sung</h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium text-xs">
                    Ngày tạo:
                  </span>
                  <p className="text-gray-600 font-medium text-xs">
                    {dayjs
                      .unix(Number(dataInit?.createdAt))
                      .format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium text-xs">
                    Người tạo:
                  </span>
                  <p className="text-gray-600 font-medium text-xs">
                    {dataInit?.createdBy}
                  </p>
                </div>
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

export default ProductModalDetail;
