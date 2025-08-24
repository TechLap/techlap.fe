import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/common/loading.spinner";
import Pagination from "../../components/common/pagination";

import { Plus } from "lucide-react";
import RoleTable from "../../components/admin/roles/role.table";
import { apiDeleteRole, apiFetchAllRole, apiSearchRole } from "../../config/api";
import { IRole, IRoleFilter } from "../../types/backend";
import RoleModal from "../../components/admin/roles/role.modal";
import { useDebounce } from "use-debounce";
import Access from "../auth/route/access";
import ModalDelete from "../../components/common/modal.delete";
import CustomToast from "../../components/common/toast.message";
import { toast } from "react-toastify";

const RolePage = () => {
  const MAX_ROLES_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [totalSearchPage, setTotalSearchPage] = useState(0);
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<IRoleFilter>({
    name: "",
    createdAt: null,
  });
  const [debouncedFilters] = useDebounce(filters, 500);

  const {
    isPending,
    data: roles,
    error,
  } = useQuery({
    queryKey: [["fetchAllRoles"], currentPage],
    queryFn: () =>
      apiFetchAllRole(`page=${currentPage}&size=${MAX_ROLES_PAGE}`),
  });

  const [displayData, setDisplayData] = useState<IRole[] | null>(
    roles?.data.data?.result ?? null
  );

  useEffect(() => {
    if (roles) {
      window.HSStaticMethods.autoInit(["select", "dropdown"]);
    }
  }, [roles]);

  // Search role
  const { data: searchData, error: searchError } = useQuery({
    queryKey: ["searchRoles", debouncedFilters, searchCurrentPage],
    queryFn: () =>
      apiSearchRole(`page=${searchCurrentPage}&size=${MAX_ROLES_PAGE}`, {
        name: debouncedFilters.name,
        createdAt: debouncedFilters.createdAt,
      }),
    enabled: Object.values(debouncedFilters).some(
      (value) => value !== "" || value !== null
    ),
  });

  //   // Set total search page
  useEffect(() => {
    if (searchData) {
      setTotalSearchPage(searchData?.data?.data?.meta?.pages ?? 0);
      setDisplayData(searchData?.data?.data?.result ?? []);
    }
  }, [searchData]);

  // Set display data
  useEffect(() => {
    if (!isSearching && roles) {
      setDisplayData(roles?.data.data?.result ?? []);
    }
  }, [roles, isSearching]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
    setIsSearching(!!value);
  };

  const queryClient = useQueryClient();
  const reloadTable = () => {
    queryClient.invalidateQueries({ queryKey: [["fetchAllRoles"]] });
  };

  const handleOpenCreateModal = () => {
    setIsOpenActionModal(true);
    setSelectedRole(null);
  };

  const handleOpenEditModal = (role: IRole) => {
    setIsOpenActionModal(true);
    setSelectedRole(role);
  };

  const handleOpenDeleteModal = (role: IRole) => {
    setIsOpenDeleteModal(true);
    setSelectedRole(role);
  };

  const handleDeleteRole = async () => {
    const res = await apiDeleteRole(selectedRole?.id ?? "");
    if (res?.data?.statusCode === 200) {
      reloadTable();
      toast.success(<CustomToast message="Xóa vai trò thành công!" className="text-green-600" />);
    } else {
      toast.error(<CustomToast message="Xóa vai trò thất bại!" className="text-red-600" />);
    }
    setSelectedRole(null);
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
        <h1 className="text-lg font-semibold">Quản lý vai trò</h1>
        <Access permission={{ name: "Create a role" }} hideChildren>
          <button
            type="button"
            className="py-2.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-800 text-white hover:bg-green-900 focus:outline-hidden focus:bg-green-900 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            onClick={handleOpenCreateModal}
          >
            <Plus className="w-4 h-4 text-white mr-2" />
            Thêm vai trò
          </button>
        </Access>
      </div>

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6">
            <RoleTable
              roleData={displayData}
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
                  : roles?.data.data?.meta.pages ?? 0
              }
            />
          </div>
        </>
      )}

      <RoleModal
        isOpenActionModal={isOpenActionModal}
        dataInit={selectedRole}
        setDataInit={setSelectedRole}
        onClose={() => {
          setSelectedRole(null);
          setIsOpenActionModal(false);
        }}
        reloadTable={reloadTable}
      />

      <ModalDelete
        isOpenDeleteModal={isOpenDeleteModal}
        onDelete={handleDeleteRole}
        onClose={() => {
          setSelectedRole(null);
          setIsOpenDeleteModal(false);
        }}
        title={`vai trò: ${selectedRole?.name}`}
        modalName={`Vai trò`}
      />
    </div>
  );
};

export default RolePage;
