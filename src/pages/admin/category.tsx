import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/common/loading.spinner";
import Pagination from "../../components/common/pagination";

import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import CategoryModal from "../../components/admin/categories/category.modal";
import CategoryTable from "../../components/admin/categories/category.table";
import ModalDelete from "../../components/common/modal.delete";
import CustomToast from "../../components/common/toast.message";
import {
  apiDeleteCategory,
  apiSearchCategory
} from "../../config/api";
import { useCategories } from "../../hooks";
import { ICategory, ICategoryFilter } from "../../types/backend";
import Access from "../auth/route/access";

const CategoryPage = () => {
  const CATEGORIES_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [totalSearchPage, setTotalSearchPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<ICategoryFilter>({
    name: "",
    active: true,
    createdAt: null,
  });
  const [debouncedFilters] = useDebounce(filters, 500);

  const { categories, isPending, isError } = useCategories({
    currentPage: currentPage,
    size: CATEGORIES_PER_PAGE,
  });

  const [displayData, setDisplayData] = useState<ICategory[] | null>(
    categories?.data.data?.result ?? null
  );

  useEffect(() => {
    if (categories) {
      window.HSStaticMethods.autoInit(["select", "dropdown"]);
    }
  }, [categories]);

  // Search suppliers
  const { data: searchData, error: searchError } = useQuery({
    queryKey: ["searchCategories", debouncedFilters, searchCurrentPage],
    queryFn: () =>
      apiSearchCategory(
        `page=${searchCurrentPage}&size=${CATEGORIES_PER_PAGE}`,
        {
          name: debouncedFilters.name,
          active: debouncedFilters.active,
          createdAt: debouncedFilters.createdAt,
        }
      ),
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
    if (!isSearching && categories) {
      setDisplayData(categories?.data.data?.result ?? []);
    }
  }, [categories, isSearching]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setIsSearching(!!value);
  };

  const queryClient = useQueryClient();
  const reloadTable = () => {
    queryClient.invalidateQueries({ queryKey: [["fetchAllCategories"]] });
  };

  const handleOpenCreateModal = () => {
    setIsOpenActionModal(true);
    setSelectedCategory(null);
  };

  const handleOpenEditModal = (category: ICategory) => {
    setIsOpenActionModal(true);
    setSelectedCategory(category);
  };

  const handleOpenDeleteModal = (category: ICategory) => {
    setIsOpenDeleteModal(true);
    setSelectedCategory(category);
  };

  const handleDeleteCategory = async () => {
    const res = await apiDeleteCategory(selectedCategory?.id ?? "");
    if (res?.data?.statusCode === 200) {
      reloadTable();
      toast.success(
        <CustomToast
          message="Xóa danh mục thành công!"
          className="text-green-600"
        />
      );
    } else {
      toast.error(
        <CustomToast
          message="Xóa danh mục thất bại!"
          className="text-red-600"
        />
      );
    }
    setSelectedCategory(null);
    setIsOpenDeleteModal(false);
  };

  if (isError || searchError) {
    return (
      <div>
        <p>Lỗi khi tải danh mục</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-lg font-semibold">Quản lý danh mục</h1>
        <Access permission={{ name: "Create a category" }} hideChildren>
          <button
            type="button"
            className="py-2.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-800 text-white hover:bg-green-900 focus:outline-hidden focus:bg-green-900 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            onClick={handleOpenCreateModal}
          >
            <Plus className="w-4 h-4 text-white mr-2" />
            Thêm danh mục
          </button>
        </Access>
      </div>

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6">
            <CategoryTable
              categoryData={displayData}
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
                  : categories?.data.data?.meta.pages ?? 0
              }
            />
          </div>
        </>
      )}

      <CategoryModal
        isOpenActionModal={isOpenActionModal}
        dataInit={selectedCategory}
        setDataInit={setSelectedCategory}
        onClose={() => {
          setSelectedCategory(null);
          setIsOpenActionModal(false);
        }}
        reloadTable={reloadTable}
      />

      <ModalDelete
        isOpenDeleteModal={isOpenDeleteModal}
        onDelete={handleDeleteCategory}
        onClose={() => {
          setSelectedCategory(null);
          setIsOpenDeleteModal(false);
        }}
        title={`danh mục: ${selectedCategory?.name}`}
        modalName={`Danh mục`}
      />
    </div>
  );
};

export default CategoryPage;
