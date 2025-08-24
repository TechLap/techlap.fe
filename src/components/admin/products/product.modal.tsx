import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  apiCreateProduct,
  apiFetchAllCategory,
  apiFetchAllSupplier,
  apiUpdateProduct,
  apiUploadSingleFile,
} from "../../../config/api";
import { IProduct } from "../../../types/backend";
import SingleUploadImg from "../../common/single.upload.img";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomToast from "../../common/toast.message";

interface IProps {
  isOpenActionModal: boolean;
  dataInit?: IProduct | null;
  setDataInit?: React.Dispatch<React.SetStateAction<IProduct | null>>;
  onClose: () => void;
  reloadTable: () => void;
}

const ProductModal = (props: IProps) => {
  const { isOpenActionModal, dataInit, onClose, reloadTable } = props;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const createProductSchema = yup.object({
    name: yup.string().required("Tên sản phẩm không được để trống"),
    quantity: yup.number().required("Số lượng không được để trống"),
    unit: yup.string().required("Đơn vị không được để trống"),
    price: yup.number().required("Giá bán không được để trống"),
    category: yup.object({
      id: yup.string().required("Danh mục không được để trống"),
    }),
    supplier: yup.object({
      id: yup.string().required("Nhà cung cấp không được để trống"),
    }),
    description: yup.string().required("Mô tả không được để trống"),
    productImage: yup.string().nullable(),
  });

  type FormValues = yup.InferType<typeof createProductSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(createProductSchema) as any,
    defaultValues: {
      name: dataInit?.name ?? "",
      quantity: dataInit?.quantity ?? 0,
      unit: dataInit?.unit ?? "",
      price: dataInit?.price ?? 0,
      category: {
        id: dataInit?.category?.id ?? "",
      },
      supplier: {
        id: dataInit?.supplier?.id ?? "",
      },
      description: dataInit?.description ?? "",
      productImage: dataInit?.productImage ?? "",
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["fetchAllCategories"],
    queryFn: () => apiFetchAllCategory(`page=1&size=20`),
  });

  const { data: suppliers } = useQuery({
    queryKey: ["fetchAllSuppliers"],
    queryFn: () => apiFetchAllSupplier(`page=1&size=20`),
  });

  // Reset form when dataInit change
  useEffect(() => {
    reset({
      name: dataInit?.name ?? "",
      quantity: dataInit?.quantity ?? 0,
      unit: dataInit?.unit ?? "",
      price: dataInit?.price ?? 0,
      category: {
        id: dataInit?.category?.id ?? "",
      },
      supplier: {
        id: dataInit?.supplier?.id ?? "",
      },
      description: dataInit?.description ?? "",
      productImage: dataInit?.productImage ?? "",
    });
  }, [dataInit, reset]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const mutation = useMutation({
    mutationFn: async (valuesForm: FormValues) => {
      try {
        let productUploadedImage = "";

        if (selectedFile) {
          const res = await apiUploadSingleFile(selectedFile, "productImgs");
          if (!res?.data?.data?.fileName) {
            throw new Error("Upload ảnh thất bại");
          }
          productUploadedImage = res.data.data.fileName;
        }

        const productData = dataInit?.id
          ? {
              id: dataInit.id,
              ...valuesForm,
              productImage: productUploadedImage,
            }
          : {
              ...valuesForm,
              productImage: productUploadedImage,
            };

        return dataInit?.id
          ? await apiUpdateProduct(productData)
          : await apiCreateProduct(productData);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      reloadTable();
      toast.success(
        <CustomToast
          message={`${dataInit ? "Cập nhật" : "Thêm"} sản phẩm thành công!`}
          className="text-green-600"
        />
      );
      onClose();
      reset();
    },
    onError: () => {
      toast.error(
        <CustomToast
          message={`${dataInit ? "Cập nhật" : "Thêm"} sản phẩm thất bại!`}
          className="text-red-600"
        />
      );
    },
  });

  const handleSubmitProduct = handleSubmit(
    async (valuesForm: FormValues) => {
      mutation.mutate(valuesForm);
    }
  );

  return (
    <div
      id="hs-large-modal"
      className={`hs-overlay ${
        isOpenActionModal ? "open opened" : "hidden"
      } size-full fixed top-0 start-0 z-50 overflow-x-hidden pointer-events-none`}
      aria-labelledby="hs-large-modal-label"
    >
      {isOpenActionModal && (
        <div className="z-[-1] transition duration fixed inset-0 bg-gray-900/50"></div>
      )}
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-3xl lg:w-full m-3 md:mx-auto">
        <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3
              id="hs-large-modal-label"
              className="font-bold text-gray-800 text-lg"
            >
              {dataInit ? "Cập nhật sản phẩm" : "Thêm mới sản phẩm"}
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

          <form onSubmit={handleSubmitProduct}>
            <div className="p-4 overflow-y-auto max-h-[460px]">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div> 
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="name"
                  >
                    Tên sản phẩm
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("name")}
                    placeholder="Nhập tên sản phẩm"
                    defaultValue={dataInit?.name}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="quantity"
                  >
                    Số lượng
                  </label>
                  <input
                    id="quantity"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("quantity")}
                    placeholder="Nhập số lượng"
                    defaultValue={dataInit?.quantity}
                  />
                  {errors.quantity && (
                    <p className="text-red-500">{errors.quantity.message}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="unit"
                  >
                    Đơn vị
                  </label>
                  <input
                    id="unit"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("unit")}
                    placeholder="Nhập đơn vị bán"
                    defaultValue={dataInit?.unit}
                  />
                  {errors.unit && (
                    <p className="text-red-500">{errors.unit.message}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="price"
                  >
                    Giá bán
                  </label>
                  <input
                    id="price"
                    type="text"
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("price")}
                    // placeholder="Nhập giá bán"
                    defaultValue={dataInit?.price}
                  />
                  {errors.price && (
                    <p className="text-red-500">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="category"
                  >
                    Danh mục
                  </label>
                  <select
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    id="category"
                    {...register("category.id")}
                    defaultValue={dataInit?.category?.id}
                  >
                    <option className="text-gray-800 bg-gray-100" value="">
                      Chọn danh mục...
                    </option>
                    {categories?.data?.data?.result.map((category) => (
                      <option
                        className="bg-gray-100 text-gray-800"
                        value={category.id}
                        key={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="supplier"
                  >
                    Nhà cung cấp
                  </label>
                  <select
                    className="block border-1 w-full px-4 py-3 text-xs text-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    id="supplier"
                    {...register("supplier.id")}
                    defaultValue={dataInit?.supplier?.id}
                  >
                    <option className="text-gray-800 bg-gray-100" value="">
                      Chọn nhà cung cấp...
                    </option>
                    {suppliers?.data?.data?.result.map((supplier) => (
                      <option
                        className="bg-gray-100 text-gray-800"
                        value={supplier.id}
                        key={supplier.id}
                      >
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="description"
                  >
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    id="description"
                    className="sm:p-5 py-2 px-3 sm:py-3 sm:px-4 block w-full border-gray-200 bg-gray-100 rounded-lg sm:text-xs focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none"
                    rows={2}
                    placeholder="Nhập mô tả"
                    {...register("description")}
                    defaultValue={dataInit?.description}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn ảnh sản phẩm
                  </label>
                  <SingleUploadImg
                    onFileChange={handleFileChange}
                    isOpenActionModal={isOpenActionModal}
                    defaultImg={dataInit?.productImage ?? ""}
                  />
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

export default ProductModal;
