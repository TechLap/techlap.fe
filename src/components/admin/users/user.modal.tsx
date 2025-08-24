import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  apiCreateUser,
  apiFetchAllRole,
  apiUpdateUser,
} from "../../../config/api";
import { IUser } from "../../../types/backend";
import CustomToast from "../../common/toast.message";
import { useEffect } from "react";

interface IProps {
  isOpenActionModal: boolean;
  dataInit?: IUser | null;
  setDataInit?: React.Dispatch<React.SetStateAction<IUser | null>>;
  onClose: () => void;
  reloadTable: () => void;
}

// https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/ (regex password)
const createUserSchema = yup
  .object({
    id: yup.string().optional(),
    name: yup.string().required("Tên không được để trống"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),

    password: yup.string().when("$isEdit", {
      is: true,
      then: (schema) => schema.optional(),
      otherwise: (schema) =>
        schema
          .required("Mật khẩu không được để trống")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{12,})/,
            "Mật khẩu phải chứa 12 kí tự: bao gồm kí tự viết hoa, thường, đặc biệt và số"
          ),
    }),

    phone: yup
      .string()
      .required("Số địện thoai không được để trống")
      .matches(/(0[3|5|7|8|9])+(\d{8})\b/g, "Số địện thoai không hợp lệ"),
    address: yup.string().required("Địa chỉ không được để trống"),
    role: yup.object({
      id: yup.string().required("Vai trò không được để trống"),
    }),
  })
  .required();

type FormValues = yup.InferType<typeof createUserSchema>;

const UserModal = (props: IProps) => {
  const { data: roles } = useQuery({
    queryKey: ["fetchAllRoles"],
    queryFn: () => apiFetchAllRole(`page=1&size=20`),
  });

  const { isOpenActionModal, dataInit, onClose, reloadTable } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(createUserSchema) as any,
    context: { isEdit: !!dataInit },
    defaultValues: {
      id: dataInit?.id ?? "",
      name: dataInit?.name ?? "",
      email: dataInit?.email ?? "",
      role: {
        id: dataInit?.role?.id ?? "",
      },
      phone: dataInit?.phone ?? "",
      address: dataInit?.address ?? "",
    },
  });

  // Reset form when dataInit change
  useEffect(() => {
    reset({
      name: dataInit?.name ?? "",
      email: dataInit?.email ?? "",
      role: {
        id: dataInit?.role?.id ?? "",
      },
      phone: dataInit?.phone ?? "",
      address: dataInit?.address ?? "",
    });
  }, [dataInit, reset]);

  const handleSubmitUser = handleSubmit(async (valuesForm: FormValues) => {
      const transformedValues = {
        id: dataInit?.id,
        ...valuesForm,
      };

      // Nếu đang edit và không có password mới, xóa password khỏi request
      if (!valuesForm.password) {
        delete valuesForm.password;
      }

      const res = dataInit?.id
        ? await apiUpdateUser(transformedValues)
        : await apiCreateUser(valuesForm);

      if (res?.data?.data) {
        reloadTable();
        toast.success(
          <CustomToast
            message={`${dataInit ? "Cập nhật" : "Thêm"} người dùng thành công!`}
            className="text-green-600"
          />
        );
        onClose();
        reset();
      } else {
        toast.error(
          <CustomToast
            message={`${dataInit ? "Cập nhật" : "Thêm"} người dùng thất bại!`}
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
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-3xl lg:w-full m-3 md:mx-auto">
        <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3
              id="hs-medium-modal-label"
              className="font-bold text-gray-800 text-lg"
            >
              {dataInit ? "Cập nhật người dùng" : "Thêm mới người dùng"}
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

          <form onSubmit={handleSubmitUser}>
            <div className="p-4 overflow-y-auto">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="name"
                  >
                    Tên người dùng
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("name")}
                    placeholder="Nhập tên người dùng"
                    defaultValue={dataInit?.name}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`block border-1 w-full px-4 py-3 text-xs text-gray-800  rounded focus:outline-none focus:ring-2 focus:ring-black ${
                      dataInit
                        ? `disabled:opacity-100 bg-gray-300`
                        : `disabled:opacity-50 bg-gray-100`
                    }`}
                    placeholder="Nhập email"
                    {...register("email")}
                    defaultValue={dataInit?.email}
                    disabled={!!dataInit}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                {!dataInit && (
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="password"
                    >
                      Mật khẩu
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Nhập mật khẩu"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                )}

                {/* Role */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="role"
                  >
                    Vai trò
                  </label>
                  <select
                    className={`block border-1 w-full px-4 py-3 text-xs text-gray-800  rounded focus:outline-none focus:ring-2 focus:ring-black ${
                      dataInit
                        ? `disabled:opacity-100 bg-gray-300`
                        : `disabled:opacity-50 bg-gray-100`
                    }`}
                    id="role"
                    {...register("role.id")}
                    defaultValue={dataInit?.role?.id}
                    disabled={!!dataInit}
                  >
                    <option className="text-gray-800 bg-gray-100" value="">
                      Chọn vai trò
                    </option>
                    {roles?.data?.data?.result.map((role) => (
                      <option
                        className="bg-gray-100 text-gray-800"
                        key={role.id}
                        value={role.id}
                      >
                        {role.name}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="text-red-500">{errors.role.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="phone"
                  >
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Nhập số điện thoại"
                    {...register("phone")}
                    defaultValue={dataInit?.phone}
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                {/* Address */}
                <div className={`${dataInit ? "sm:col-span-2" : ""}`}>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="address"
                  >
                    Địa chỉ
                  </label>
                  <input
                    id="address"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Nhập địa chỉ"
                    {...register("address")}
                    defaultValue={dataInit?.address}
                  />
                  {errors.address && (
                    <p className="text-red-500">{errors.address.message}</p>
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

export default UserModal;
