import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
    apiCreatePermission,
    apiUpdatePermission
} from "../../../config/api";
import { IPermission } from "../../../types/backend";
import CustomToast from "../../common/toast.message";

interface IProps {
  isOpenActionModal: boolean;
  dataInit?: IPermission | null;
  setDataInit?: React.Dispatch<React.SetStateAction<IPermission | null>>;
  onClose: () => void;
  reloadTable: () => void;
}

// https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/ (regex password)
const createPermissionSchema = yup.object({
  id: yup.string().optional(),
  name: yup.string().required("Tên không được để trống"),
  module: yup.string().required("Module không được để trống"),
  route: yup.string().required("Đường dẫn không được để trống"),
  method: yup.string().required("Phương thức không được để trống"),
});

type FormValues = yup.InferType<typeof createPermissionSchema>;

const PermissionModal = (props: IProps) => {
  const { isOpenActionModal, dataInit, onClose, reloadTable } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(createPermissionSchema) as any,
    defaultValues: {
      id: dataInit?.id ?? "",
      name: dataInit?.name ?? "",
      module: dataInit?.module ?? "",
      route: dataInit?.route ?? "",
      method: dataInit?.method ?? "",
    },
  });

  // Reset form when dataInit change
  useEffect(() => {
    reset({
      name: dataInit?.name ?? "",
      module: dataInit?.module ?? "",
      route: dataInit?.route ?? "",
      method: dataInit?.method ?? "",
    });
  }, [dataInit, reset]);

  const handleSubmitPermission = handleSubmit(async (valuesForm: FormValues) => {
      const transformedValues = {
        id: dataInit?.id,
        ...valuesForm,
      };

      const res = dataInit?.id
        ? await apiUpdatePermission(transformedValues)
        : await apiCreatePermission(valuesForm);
      if (res?.data?.data) {
        reloadTable();
        toast.success(
          <CustomToast
            message={`${dataInit ? "Cập nhật" : "Thêm"} quyền hạn thành công!`}
            className="text-green-600"
          />
        );
        onClose();
        reset();
      } else {
        toast.error(
          <CustomToast
            message={`${dataInit ? "Cập nhật" : "Thêm"} quyền hạn thất bại!`}
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
              {dataInit ? "Cập nhật quyền hạn" : "Thêm mới quyền hạn"}
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

          <form onSubmit={handleSubmitPermission}>
            <div className="p-4 overflow-y-auto">
              <div className="grid sm:grid-cols-1 gap-6">
                {/* Name */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="name"
                  >
                    Tên quyền hạn
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("name")}
                    placeholder="Nhập tên quyền hạn"
                    defaultValue={dataInit?.name}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Module */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="module"
                  >
                    Module
                  </label>
                  <input
                    id="module"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Nhập module"
                    {...register("module")}
                    defaultValue={dataInit?.module}
                  />
                  {errors.module && (
                    <p className="text-red-500">{errors.module.message}</p>
                  )}
                </div>

                {/* Route */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="route"
                  >
                    Đường dẫn
                  </label>
                  <input
                    id="route"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Nhập đường dẫn"
                    {...register("route")}
                    defaultValue={dataInit?.route}
                  />
                  {errors.route && (
                    <p className="text-red-500">{errors.route.message}</p>
                  )}
                </div>

                {/* Method */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="method"
                  >
                    Phương thức
                  </label>
                  <select
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    id="method"
                    {...register("method")}
                    defaultValue={dataInit?.method}
                  >
                    <option className="text-gray-800 bg-gray-100" value="">
                      Chọn phương thức...
                    </option>
                    <option className="text-gray-800 bg-gray-100" value="GET">
                      GET
                    </option>
                    <option className="text-gray-800 bg-gray-100" value="POST">
                      POST
                    </option>
                    <option className="text-gray-800 bg-gray-100" value="DELETE">
                      DELETE
                    </option>
                  </select>
                  {errors.method && (
                    <p className="text-red-500">{errors.method.message}</p>
                  )}
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

export default PermissionModal;
