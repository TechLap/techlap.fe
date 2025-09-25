import axiosClient from "./axios-customize"
import { GetAccount, GetCustomer, IAccount, IBackendResponse, IBrand, ICart, ICategory, ICategoryFilter, ICustomer, ICustomerAccount, ICustomerFilter, IDashboard, IModelPagination, IOrder, IOrderFilter, IPermission, IPermissionFilter, IProduct, IProductFilter, IRequestCreateOrder, IRole, IRoleFilter, IUser, IUserFilter } from "../types/backend"

/* Module Auth */
export const apiLoginForCustomer = (username: string, password: string) => {
    return axiosClient.post<IBackendResponse<ICustomerAccount>>('/login', {username, password})
}

export const apiLoginForInternalUser = (username: string, password: string) => {
    return axiosClient.post<IBackendResponse<IAccount>>('/admin/login', {username, password})
}

export const apiRegisterForCustomer = (fullName: string, email: string, password: string, address: string, phone: string ) => {
    return axiosClient.post<IBackendResponse<IUser>>('/register', {fullName, email, password, address, phone})
}

export const apiRegisterForInternalUser = (name: string, email: string, password: string, phone: string, address: string ) => {
    return axiosClient.post<IBackendResponse<IUser>>('/admin/register', {name, email, password, phone, address})
}

export const apiGetAccount = () => {
    return axiosClient.get<IBackendResponse<GetAccount>>('/auth/account')
}

export const apiGetCustomer = () => {
    return axiosClient.get<IBackendResponse<GetCustomer>>('/auth/customers/account')
}

export const apiLogout = () => {
    return axiosClient.post<IBackendResponse<string>>('/auth/logout')
}

export const apiLogoutForCustomer = () => {
    return axiosClient.post<IBackendResponse<string>>('/auth/customers/logout')
}

/* Module User */
export const apiFetchAllUser = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<IUser>>>(`/users?${query}`)
}

export const apiFetchUserById = ( id: string ) => {
    return axiosClient.get<IBackendResponse<IUser>>(`/users?${id}`)
}

export const apiCreateUser = ( user: IUser ) => {
    return axiosClient.post<IBackendResponse<IUser>>('/users', {...user})
}

export const apiUpdateUser = ( user: IUser ) => {
    return axiosClient.put<IBackendResponse<IUser>>(`/users`, {...user})
}

export const apiDeleteUser = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<IUser>>(`/users/${id}`)
}

export const apiChangePasswordForUser = (data : {oldPassword: string, newPassword: string, reNewPassword: string}) => {
    return axiosClient.post<IBackendResponse<string>>(`/users/me/change-password`, data)
}

export const apiForgotPasswordForUser = (email: string) => {
  const formData = new FormData();
  formData.append("email", email);

  return axiosClient.post<IBackendResponse<string>>(
    "/users/reset-password",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const apiResetPasswordForUser = (data: { token: string; newPassword: string; reNewPassword: string }) => {
    return axiosClient.post<IBackendResponse<string>>(`/users/change-password`, data)
}

export const apiGetDashboard = () => {
    return axiosClient.get<IBackendResponse<IDashboard>>('/users/dashboard')
}

/* Module Customer */
export const apiFetchAllCustomer = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<ICustomer>>>(`/customers?${query}`)
}

export const apiFetchCustomerById = ( id: string ) => {
    return axiosClient.get<IBackendResponse<ICustomer>>(`/customers/${id}`)
}

export const apiCreateCustomer = ( customer: ICustomer ) => {
    return axiosClient.post<IBackendResponse<ICustomer>>(`/customers`, {...customer})
}

export const apiUpdateCustomer = ( customer: ICustomer ) => {
    return axiosClient.put<IBackendResponse<ICustomer>>(`/customers`, {...customer})
}

export const apiDeleteCustomer = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<ICustomer>>(`/customers/${id}`)
}

export const apiAddToCart = (data : {productId: string, quantity: number, update: boolean}) => {
    return axiosClient.post<IBackendResponse<ICart>>(`/customers/add-to-cart`, data)
}

export const apiFetchCart = () => {
    return axiosClient.get<IBackendResponse<ICart>>(`/customers/get-cart`)
}

export const apiRemoveCartDetail = ( data : {cartDetailId: number, customerId: number }) => {
    return axiosClient.delete<IBackendResponse<ICart>>(`/customers/remove-cart-detail`, {data})
}

export const apiChangePasswordForCustomer = (data : {oldPassword: string, newPassword: string, reNewPassword: string}) => {
    return axiosClient.post<IBackendResponse<string>>(`/customers/me/change-password`, data)
}

export const apiForgotPasswordForCustomer = (email: string) => {
  const formData = new FormData();
  formData.append("email", email);

  return axiosClient.post<IBackendResponse<string>>(
    "/customers/reset-password",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const apiResetPasswordForCustomer = (data: { token: string; newPassword: string; reNewPassword: string }) => {
    return axiosClient.post<IBackendResponse<string>>(`/customers/change-password`, data)
}

export const apiFetchOrderHistory = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<IOrder>>>(`/customers/history-orders?${query}`)
}

/* Module Role */
export const apiFetchAllRole = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<IRole>>>(`/roles?${query}`)
}

export const apiUpdateRole = ( role: IRole ) => {
    return axiosClient.put<IBackendResponse<IRole>>(`/roles`, {...role})
}

export const apiCreateRole = ( role: IRole ) => {
    return axiosClient.post<IBackendResponse<IRole>>(`/roles`, {...role})
}

export const apiDeleteRole = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<IRole>>(`/roles/${id}`)
}


/* Module Product */
export const apiFetchAllProduct = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<IProduct>>>(`/products?${query}`)
}

export const apiCreateProduct = ( product: IProduct ) => {
    return axiosClient.post<IBackendResponse<IProduct>>('/products', {...product})
}

export const apiUpdateProduct = ( product: IProduct ) => {
    return axiosClient.put<IBackendResponse<IProduct>>(`/products`, {...product})
}

export const apiDeleteProduct = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<IProduct>>(`/products/${id}`)
}

export const apiFetchProductById = ( id: string ) => {
    return axiosClient.get<IBackendResponse<IProduct>>(`/products/${id}`)
}

export const apiFetchLatestProduct = () => {
    return axiosClient.get<IBackendResponse<IProduct[]>>(`/products/latest`)
}

export const apiFetchBestSellerProduct = () => {
    return axiosClient.get<IBackendResponse<IProduct[]>>(`/products/best-sellers`)
}

/* Module Brand */
export const apiFetchAllBrand = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<IBrand>>>(`/brands?${query}`)
}

export const apiCreateBrand = ( brand: IBrand ) => {
    return axiosClient.post<IBackendResponse<IBrand>>(`/brands`, {...brand})
}

export const apiUpdateBrand = ( brand: IBrand ) => {
    return axiosClient.put<IBackendResponse<IBrand>>(`/brands`, {...brand})
}

export const apiDeleteBrand = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<IBrand>>(`/brands/${id}`)
}

export const apiFetchBrandById = ( id: string ) => {
    return axiosClient.get<IBackendResponse<IBrand>>(`/brands/${id}`)
}

/* Search */
export const apiSearchUser = ( query: string, userFilter: IUserFilter ) => {
    return axiosClient.post<IBackendResponse<IModelPagination<IUser>>>(`/users/filter?${query}`, {...userFilter})
}

export const apiSearchProduct = ( query: string, productFilter: IProductFilter ) => {
    return axiosClient.post<IBackendResponse<IModelPagination<IProduct>>>(`/products/filter?${query}`, {...productFilter})
}

export const apiSearchBrand = ( query: string, brandFilter: { name?: string; createdAt?: string | null } ) => {
    return axiosClient.post<IBackendResponse<IModelPagination<IBrand>>>(`/brands/filter?${query}`, {...brandFilter})
}

export const apiSearchCategory = ( query: string, categoryFilter: ICategoryFilter ) => {
    return axiosClient.post<IBackendResponse<IModelPagination<ICategory>>>(`/categories/filter?${query}`, {...categoryFilter})
}

export const apiSearchPermission = ( query: string, permissionFilter: IPermissionFilter ) => {
    return axiosClient.post<IBackendResponse<IModelPagination<IPermission>>>(`/permissions/filter?${query}`, {...permissionFilter})
}

export const apiSearchRole = ( query: string, roleFilter: IRoleFilter ) => {
    return axiosClient.post<IBackendResponse<IModelPagination<IRole>>>(`/roles/filter?${query}`, {...roleFilter})
}

export const apiSearchCustomer = ( query: string, customerFilter: ICustomerFilter ) => {
    return axiosClient.post<IBackendResponse<IModelPagination<ICustomer>>>(`/customers/filter?${query}`, {...customerFilter})
}

export const apiSearchOrder = ( query: string, orderFilter: IOrderFilter ) => {
    return axiosClient.post<IBackendResponse<IModelPagination<IOrder>>>(`/orders/filter?${query}`, {...orderFilter})
}

/* Module Category */
export const apiFetchAllCategory = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<ICategory>>>(`/categories?${query}`)
}

export const apiUpdateCategory = ( category: ICategory ) => {
    return axiosClient.put<IBackendResponse<ICategory>>(`/categories`, {...category})
}

export const apiCreateCategory = ( category: ICategory ) => {
    return axiosClient.post<IBackendResponse<ICategory>>(`/categories`, {...category})
}

export const apiDeleteCategory = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<ICategory>>(`/categories/${id}`)
}

/* Module Supplier */
// export const apiFetchAllSupplier = ( query: string ) => {
//     return axiosClient.get<IBackendResponse<IModelPagination<ISupplier>>>(`/suppliers?${query}`)
// }

// export const apiUpdateSupplier = ( supplier: ISupplier ) => {
//     return axiosClient.put<IBackendResponse<ISupplier>>(`/suppliers`, {...supplier})
// }

// export const apiCreateSupplier = ( supplier: ISupplier ) => {
//     return axiosClient.post<IBackendResponse<ISupplier>>(`/suppliers`, {...supplier})
// }

// export const apiDeleteSupplier = ( id: string ) => {
//     return axiosClient.delete<IBackendResponse<ISupplier>>(`/suppliers/${id}`)
// }


/* Module Permission */
export const apiFetchAllPermission = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<IPermission>>>(`/permissions?${query}`)
}

export const apiUpdatePermission = ( permission: IPermission ) => {
    return axiosClient.put<IBackendResponse<IPermission>>(`/permissions`, {...permission})
}

export const apiCreatePermission = ( permission: IPermission ) => {
    return axiosClient.post<IBackendResponse<IPermission>>(`/permissions`, {...permission})
}

export const apiDeletePermission = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<IPermission>>(`/permissions/${id}`)
}

/* Module Upload */
export const apiUploadSingleFile = ( file: File, folderType: string ) => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    bodyFormData.append("folder", folderType);
    return axiosClient<{fileName: string, uploadedAt: string}>({
        url: "/files",
        method: "post",
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export const apiCreateOrder = ( order: IRequestCreateOrder ) => {
    return axiosClient.post<IBackendResponse<{paymentMethod: string, paymentUrl: string, orderCode: string}>>(`/orders`, {...order})
}

export const apiGetByCode = ( orderCode: string ) => {
    return axiosClient.get<IBackendResponse<IOrder>>(`/orders/code/${orderCode}`)
}

// VNPay - Verify return params (no IPN flow)
export const apiVerifyVnpayReturn = ( params: Record<string, string> ) => {
    // BE trả plain text và dùng HTTP status (200/400). validateStatus=true để không ném lỗi.
    return axiosClient.post<string>(
        `/payment/vnpay-verify`,
        { ...params },
        { validateStatus: () => true }
    )
}

/* Module Order */
export const apiFetchAllOrder = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<IOrder>>>(`/orders?${query}`)
}

export const apiUpdateOrderInfo = ( order: IOrder ) => {
    return axiosClient.put<IBackendResponse<IOrder>>(`/orders`, {...order})
}

