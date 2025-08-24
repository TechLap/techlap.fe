import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import UserModal from "../../components/admin/users/user.modal";
import UserTable from "../../components/admin/users/user.table";
import LoadingSpinner from "../../components/common/loading.spinner";
import Pagination from "../../components/common/pagination";

import { Plus } from "lucide-react";
import {
  apiDeleteUser,
  apiFetchAllRole,
  apiFetchAllUser,
  apiSearchUser,
} from "../../config/api";
import { IUser, IUserFilter } from "../../types/backend";
import CustomToast from "../../components/common/toast.message";
import Access from "../auth/route/access";
import { toast } from "react-toastify";
import ModalDelete from "../../components/common/modal.delete";

const UserPage = () => {
  const MAX_USERS_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [totalSearchPage, setTotalSearchPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [filters, setFilters] = useState<IUserFilter>({
    email: "",
    name: "",
    address: "",
    phone: "",
    role: {
      id: "",
    },
    createdAt: null,
  });
  const [debouncedFilters] = useDebounce(filters, 500);

  const {
    isPending,
    data: users,
    error,
  } = useQuery({
    queryKey: [["fetchAllUsers"], currentPage],
    queryFn: () =>
      apiFetchAllUser(`page=${currentPage}&size=${MAX_USERS_PAGE}`),
  });

  const [displayData, setDisplayData] = useState<IUser[] | null>(
    users?.data.data?.result ?? null
  );

  const { data: roles } = useQuery({
    queryKey: ["fetchAllRoles"],
    queryFn: () => apiFetchAllRole(`page=1&size=20`),
  });

  useEffect(() => {
    if (roles) {
      window.HSStaticMethods.autoInit(["select", "dropdown"]);
    }
  }, [roles]);

  const { data: searchData, error: searchError } = useQuery({
    queryKey: ["searchUsers", debouncedFilters, searchCurrentPage],
    queryFn: () =>
      apiSearchUser(`page=${searchCurrentPage}&size=${MAX_USERS_PAGE}`, {
        email: debouncedFilters.email,
        name: debouncedFilters.name,
        address: debouncedFilters.address,
        phone: debouncedFilters.phone,
        createdAt: debouncedFilters.createdAt,
        ...(debouncedFilters.role?.id
          ? { role: { id: debouncedFilters.role.id } }
          : {}),
      }),
    enabled: Object.values(debouncedFilters).some(
      (value) => value !== "" || value !== null
    ),
  });

  useEffect(() => {
    if (searchData) {
      setTotalSearchPage(searchData?.data?.data?.meta?.pages ?? 0);
      setDisplayData(searchData?.data?.data?.result ?? []);
    }
  }, [searchData]);

  useEffect(() => {
    if (!isSearching && users) {
      setDisplayData(users?.data.data?.result ?? []);
    }
  }, [users, isSearching]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      ...(key === "createdAt" ? { createdAt: value } : { [key]: value }),
      ...(key === "role" ? { role: { id: value } } : { [key]: value }),
    }));
    setIsSearching(!!value);
  };

  

  const handleOpenCreateModal = () => {
    setIsOpenActionModal(true);
    setSelectedUser(null);
  };

  const handleOpenEditModal = (user: IUser) => {
    setIsOpenActionModal(true);
    setSelectedUser(user);
  };

  const handleOpenDeleteModal = (user: IUser) => {
    setIsOpenDeleteModal(true);
    setSelectedUser(user);
  };
  
  const queryClient = useQueryClient();
  const reloadTable = () => {
    queryClient.invalidateQueries({ queryKey: [["fetchAllUsers"]] });
  };

  const handleDeleteUser = async () => {
    const res = await apiDeleteUser(selectedUser?.id ?? "");
    if (res?.data?.statusCode === 200) {
      reloadTable();
      toast.success(<CustomToast message="Xóa người dùng thành công!" className="text-green-600" />);
    } else {
      toast.error(<CustomToast message="Xóa người dùng thất bại!" className="text-red-600" />);
    }
    setSelectedUser(null);
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
        <h1 className="text-lg font-semibold">Quản lý người dùng</h1>
        <Access permission={{ name: "Create a user" }} hideChildren>
          <button
            type="button"
            className="py-2.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-800 text-white hover:bg-green-900 focus:outline-hidden focus:bg-green-900 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            onClick={handleOpenCreateModal}
          >
            <Plus className="w-4 h-4 text-white mr-2" />
            Thêm người dùng
          </button>
        </Access>
      </div>

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6">
            <UserTable
              userData={displayData}
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
                  : users?.data.data?.meta.pages ?? 0
              }
            />
          </div>
        </>
      )}

      <UserModal
        isOpenActionModal={isOpenActionModal}
        dataInit={selectedUser}
        setDataInit={setSelectedUser}
        onClose={() => {
          setSelectedUser(null);
          setIsOpenActionModal(false);
        }}
        reloadTable={reloadTable}
      />

      <ModalDelete
        isOpenDeleteModal={isOpenDeleteModal}
        onDelete={handleDeleteUser}
        onClose={() => {
          setSelectedUser(null);
          setIsOpenDeleteModal(false);
        }}
        title={`người dùng: ${selectedUser?.name}`}
        modalName={`Người dùng`}
      />
    </div>
  );
};

export default UserPage;
