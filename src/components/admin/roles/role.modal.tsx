import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { apiCreateRole, apiUpdateRole } from "../../../config/api";
import {
  getPermissionsByModule,
  groupPermissionsByModule,
} from "../../../config/permission";
import { usePermissions } from "../../../hooks";
import { IRole } from "../../../types/backend";
import CustomToast from "../../common/toast.message";
import RolePermissionAccordion from "./accordion.permission";

interface IProps {
  isOpenActionModal: boolean;
  dataInit?: IRole | null;
  setDataInit?: React.Dispatch<React.SetStateAction<IRole | null>>;
  onClose: () => void;
  reloadTable: () => void;
}

// https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/ (regex password)
const createRoleSchema = yup.object({
  id: yup.string().optional(),
  name: yup.string().required("Tên không được để trống"),
  description: yup.string().required("Mô tả không được để trống"),
  // permission: yup.array().of(yup.object({
  //   id: yup.string(),
  // })),
});

type FormValues = yup.InferType<typeof createRoleSchema>;

const RoleModal = (props: IProps) => {
  const { isOpenActionModal, dataInit, onClose, reloadTable } = props;

  const [checkedPermission, setCheckedPermission] = useState<{ id: string }[]>([]);


  const handleToggleSinglePermission = (permissionId: string) => {
    setCheckedPermission((prev) => {
      const isChecked = prev.some((item) => item.id === permissionId);
      if (isChecked) {
        return prev.filter((item) => item.id !== permissionId);
      }
      return [...prev, { id: permissionId }];
    });
  };

  const handleToggleAllPermissionInModule = (module: string) => {
    const permissionsInModule = getPermissionsByModule(
      permissions?.data?.data?.result ?? [],
      module
    );

    const checkedPermissionsInModule = permissionsInModule.every((permission) =>
      checkedPermission.some((item) => item.id === permission.id)
    );

    const isNotInModule = (item: { id: string }) => !permissionsInModule.some((permission) => permission.id === item.id);

    if (checkedPermissionsInModule) {
      setCheckedPermission((prev) =>
        prev.filter(isNotInModule)
      );
    } else {
      setCheckedPermission((prev) => [
        ...prev,
        ...permissionsInModule.map((permission) => ({ id: permission.id as string })),
      ]);
    }
  };

  const { permissions } = usePermissions();

  const modules = groupPermissionsByModule(
    permissions?.data?.data?.result ?? []
  );

  const [isAccordionOpen, setIsAccordionOpen] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (isOpenActionModal) {
      setIsAccordionOpen(
        Object.fromEntries(modules.map((module) => [module.module, false]))
      );
      setCheckedPermission([]);
    }
    if(dataInit && isOpenActionModal){
      setIsAccordionOpen(
        Object.fromEntries(modules.map((module) => [module.module, true]))
      );
      setCheckedPermission(dataInit?.permissions ?? []);
    }
  }, [isOpenActionModal, dataInit]);

  const handleClickAccordion = (module: string) => {
    setIsAccordionOpen((prev) => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(createRoleSchema) as any,
    defaultValues: {
      id: dataInit?.id ?? "",
      name: dataInit?.name ?? "",
      description: dataInit?.description ?? "",
      // permission: dataInit?.permission?.map((permission) => ({
      //   id: permission.id,
      // })) ?? [],
    },
  });

  // Reset form when dataInit change
  useEffect(() => {
    reset({
      name: dataInit?.name ?? "",
      description: dataInit?.description ?? "",
      // permission: dataInit?.permission?.map((permission) => ({
      //   id: permission.id,
      // })) ?? [],
    });
  }, [dataInit, reset]);

  const handleSubmitRole = handleSubmit(async (valuesForm: FormValues) => {

      const transformedUpdateValues = {
        id: dataInit?.id,
        ...valuesForm,
        permissions: checkedPermission
      };

      // Note: các permissions là trường được thêm vào nằm ngoài FormValues
      const res = dataInit ? await apiUpdateRole(transformedUpdateValues) : await apiCreateRole(transformedUpdateValues);
      if (res?.data?.data) {
        reloadTable();
        toast.success(
          <CustomToast
            message={`${dataInit ? "Cập nhật" : "Thêm"} vai trò thành công!`}
            className="text-green-600"
          />
        );
        onClose();
        reset();
      } else {
        toast.error(
          <CustomToast
            message={`${dataInit ? "Cập nhật" : "Thêm"} vai trò thất bại!`}
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
      } size-full fixed top-0 start-0 z-50 overflow-x-hidden pointer-events-none`}
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
              {dataInit ? "Cập nhật vai trò" : "Thêm mới vai trò"}
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
          <form onSubmit={handleSubmitRole}>
            <div className="p-4 overflow-y-auto max-h-[460px]">
              <div className="grid sm:grid-cols-1 gap-6">
                {/* Name */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="name"
                  >
                    Tên vai trò
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("name")}
                    placeholder="Nhập tên vai trò"
                    defaultValue={dataInit?.name}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="description"
                  >
                    Mô tả vai trò
                  </label>
                  <input
                    id="description"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("description")}
                    placeholder="Nhập mô tả vai trò"
                    defaultValue={dataInit?.description}
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>

                {/* Permission */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="permission"
                  >
                    Quyền hạn
                  </label>
                  <div className="flex flex-col gap-y-2">
                    {modules.map((module) => (
                      <RolePermissionAccordion
                        title={module.module}
                        content={getPermissionsByModule(
                          permissions?.data?.data?.result ?? [],
                          module.module
                        )}
                        key={module.module}
                        isAccordionOpen={isAccordionOpen}
                        handleClickAccordion={() =>
                          handleClickAccordion(module.module)
                        }
                        handleCheckedPermission={handleToggleSinglePermission}
                        handleToggleAllPermissionInModule={handleToggleAllPermissionInModule}
                        checkedPermission={checkedPermission}
                      />
                    ))}
                  </div>
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

export default RoleModal;
