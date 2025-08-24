import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { apiCreateSupplier, apiUpdateSupplier } from "../../../config/api";
import { ISupplier } from "../../../types/backend";
import CustomToast from "../../common/toast.message";

interface IProps {
  isOpenActionModal: boolean;
  dataInit?: ISupplier | null;
  setDataInit?: React.Dispatch<React.SetStateAction<ISupplier | null>>;
  onClose: () => void;
  reloadTable: () => void;
}

// https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/ (regex password)
const createSupplierSchema = yup.object({
  id: yup.string().optional(),
  name: yup.string().required("Tên không được để trống"),
  contactInfo: yup.string().required("Thông tin liên hệ không được để trống"),
  active: yup.boolean().required("Trạng thái không được để trống"),
});

type FormValues = yup.InferType<typeof createSupplierSchema>;

const SupplierModal = (props: IProps) => {
  const { isOpenActionModal, dataInit, onClose, reloadTable } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(createSupplierSchema) as any,
    defaultValues: {
      id: dataInit?.id ?? "",
      name: dataInit?.name ?? "",
      contactInfo: dataInit?.contactInfo ?? "",
      active: dataInit?.active ?? true,
    },
  });

  // Reset form when dataInit change
  useEffect(() => {
    reset({
      name: dataInit?.name ?? "",
      contactInfo: dataInit?.contactInfo ?? "",
      active: dataInit?.active ?? true,
    });
  }, [dataInit, reset]);

  const handleSubmitSupplier = handleSubmit(async (valuesForm: FormValues) => {
    const transformedValues = {
      id: dataInit?.id,
      ...valuesForm,
    };

    const res = dataInit?.id
      ? await apiUpdateSupplier(transformedValues)
      : await apiCreateSupplier(valuesForm);
    if (res?.data?.data) {
      reloadTable();
      toast.success(
        <CustomToast
          message={`${dataInit ? "Cập nhật" : "Thêm"} nhà cung cấp thành công!`}
          className="text-green-600"
        />
      );
      onClose();
      reset();
    } else {
      toast.error(
        <CustomToast
          message={`${dataInit ? "Cập nhật" : "Thêm"} nhà cung cấp thất bại!`}
          className="text-red-600"
        />
      );
    }
  });

  return (
    <div
      id="hs-medium-modal"
      className={`hs-overlay ${
        isOpenActionModal ? "open opened" : "hidden"
      } size-full fixed top-0 start-0 z-50 overflow-x-hidden overflow-y-auto pointer-events-none`}
      tabIndex={-1}
      aria-labelledby="hs-medium-modal-label"
    >
      {isOpenActionModal && (
        <div className="z-[-1] transition duration fixed inset-0 bg-gray-900/50 dark:bg-neutral-900/80"></div>
      )}
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-lg md:w-full m-3 md:mx-auto">
        <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3
              id="hs-medium-modal-label"
              className="font-bold text-gray-800 text-lg"
            >
              {dataInit ? "Cập nhật nhà cung cấp" : "Thêm mới nhà cung cấp"}
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

          <form onSubmit={handleSubmitSupplier}>
            <div className="p-4 overflow-y-auto">
              <div className="grid sm:grid-cols-1 gap-6">
                {/* Name */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="name"
                  >
                    Tên nhà cung cấp
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("name")}
                    placeholder="Nhập tên nhà cung cấp"
                    defaultValue={dataInit?.name}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Contact Info */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="contactInfo"
                  >
                    Thông tin liên hệ
                  </label>
                  <input
                    id="contactInfo"
                    type="text"
                    className={`block border-1 w-full px-4 py-3 text-xs text-gray-800  rounded focus:outline-none focus:ring-2 focus:ring-black ${
                      dataInit
                        ? `disabled:opacity-100 bg-gray-300`
                        : `disabled:opacity-50 bg-gray-100`
                    }`}
                    placeholder="Nhập thông tin liên hệ"
                    {...register("contactInfo")}
                    defaultValue={dataInit?.contactInfo}
                  />
                  {errors.contactInfo && (
                    <p className="text-red-500">{errors.contactInfo.message}</p>
                  )}
                </div>

                {/* Active */}
                <div className="flex justify-between items-center gap-x-2">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="active"
                  >
                    Trạng thái hoạt động
                  </label>
                  <label
                    htmlFor="hs-large-switch-with-icons"
                    className="relative inline-block w-[60px] h-8 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id="hs-large-switch-with-icons"
                      className="peer sr-only"
                      {...register("active")}
                      defaultChecked={dataInit?.active ?? false}
                    />
                    <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-green-600 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                    <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-7 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
                    <span className="absolute top-1/2 start-1.5 -translate-y-1/2 flex justify-center items-center size-5 text-gray-500 peer-checked:text-white transition-colors duration-200">
                      <svg
                        className="shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </span>
                    <span className="absolute top-1/2 end-1.5 -translate-y-1/2 flex justify-center items-center size-5 text-gray-500 peer-checked:text-blue-600 transition-colors duration-200">
                      <svg
                        className="shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#hs-medium-modal"
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-green-800 text-white hover:bg-green-900 focus:outline-hidden focus:bg-green-900 disabled:opacity-50 disabled:pointer-events-none"
              >
                {dataInit ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierModal;
