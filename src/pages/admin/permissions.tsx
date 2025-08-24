import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/common/loading.spinner";
import Pagination from "../../components/common/pagination";

import { Plus } from "lucide-react";
import { useDebounce } from "use-debounce";
import PermissionModal from "../../components/admin/permissions/permission.modal";
import PermissionTable from "../../components/admin/permissions/permission.table";
import { apiDeletePermission, apiFetchAllPermission, apiSearchPermission } from "../../config/api";
import { IPermission, IPermissionFilter } from "../../types/backend";
import Access from "../auth/route/access";
import CustomToast from "../../components/common/toast.message";
import { toast } from "react-toastify";
import ModalDelete from "../../components/common/modal.delete";

const PermissionPage = () => {
  const MAX_PERMISSIONS_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [totalSearchPage, setTotalSearchPage] = useState(0);
  const [selectedPermission, setSelectedPermission] =
    useState<IPermission | null>(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<IPermissionFilter>({
    name: "",
    module: "",
    method: "",
    route: "",
    createdAt: null,
  });
  const [debouncedFilters] = useDebounce(filters, 500);

  const {
    isPending,
    data: permissions,
    error,
  } = useQuery({
    queryKey: [["fetchAllPermissions"], currentPage],
    queryFn: () =>
      apiFetchAllPermission(`page=${currentPage}&size=${MAX_PERMISSIONS_PAGE}`),
  });

  const [displayData, setDisplayData] = useState<IPermission[] | null>(
    permissions?.data.data?.result ?? null
  );

  useEffect(() => {
    if (permissions) {
      window.HSStaticMethods.autoInit(["select", "dropdown"]);
    }
  }, [permissions]);

  // Search permission
  const { data: searchData, error: searchError } = useQuery({
    queryKey: ["searchPermissions", debouncedFilters, searchCurrentPage],
    queryFn: () =>
      apiSearchPermission(
        `page=${searchCurrentPage}&size=${MAX_PERMISSIONS_PAGE}`,
        {
          name: debouncedFilters.name,
          module: debouncedFilters.module,
          method: debouncedFilters.method,
          route: debouncedFilters.route,
          createdAt: debouncedFilters.createdAt,
        }
      ),
    enabled: Object.values(debouncedFilters).some(
      (value) => value !== "" || value !== null
    ),
  });

  // Set total search page
  useEffect(() => {
    if (searchData) {
      setTotalSearchPage(searchData?.data?.data?.meta?.pages ?? 0);
      setDisplayData(searchData?.data?.data?.result ?? []);
    }
  }, [searchData]);

  // Set display data
  useEffect(() => {
    if (!isSearching && permissions) {
      setDisplayData(permissions?.data.data?.result ?? []);
    }
  }, [permissions, isSearching]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      return { ...prev, [key]: value };
    });
    setIsSearching(!!value);
  };

  const queryClient = useQueryClient();
  const reloadTable = () => {
    queryClient.invalidateQueries({ queryKey: [["fetchAllPermissions"]] });
  };

  const handleOpenCreateModal = () => {
    setIsOpenActionModal(true);
    setSelectedPermission(null);
  };

  const handleOpenEditModal = (permission: IPermission) => {
    setIsOpenActionModal(true);
    setSelectedPermission(permission);
  };

  const handleOpenDeleteModal = (permission: IPermission) => {
    setIsOpenDeleteModal(true);
    setSelectedPermission(permission);
  };

  const handleDeletePermission = async () => {
    const res = await apiDeletePermission(selectedPermission?.id ?? "");
    if (res?.data?.statusCode === 200) {
      reloadTable();
      toast.success(<CustomToast message="Xóa quyền hạn thành công!" className="text-green-600" />);
    } else {
      toast.error(<CustomToast message="Xóa quyền hạn thất bại!" className="text-red-600" />);
    }
    setSelectedPermission(null);
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
        <h1 className="text-lg font-semibold">Quản lý quyền hạn</h1>
        <Access permission={{ name: "Create a permission" }} hideChildren>
          <button
            type="button"
            className="py-2.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-800 text-white hover:bg-green-900 focus:outline-hidden focus:bg-green-900 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            onClick={handleOpenCreateModal}
          >
            <Plus className="w-4 h-4 text-white mr-2" />
            Thêm quyền hạn
          </button>
        </Access>
      </div>

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6">
            <PermissionTable
              permissionData={displayData}
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
                  : permissions?.data.data?.meta.pages ?? 0
              }
            />
          </div>
        </>
      )}

      <PermissionModal
        isOpenActionModal={isOpenActionModal}
        dataInit={selectedPermission}
        setDataInit={setSelectedPermission}
        onClose={() => {
          setSelectedPermission(null);
          setIsOpenActionModal(false);
        }}
        reloadTable={reloadTable}
      />

      <ModalDelete
        isOpenDeleteModal={isOpenDeleteModal}
        onDelete={handleDeletePermission}
        onClose={() => {
          setSelectedPermission(null);
          setIsOpenDeleteModal(false);
        }}
        title={`quyền hạn: ${selectedPermission?.name}`}
        modalName={`Quyền hạn`}
      />
    </div>
  );
};

export default PermissionPage;
