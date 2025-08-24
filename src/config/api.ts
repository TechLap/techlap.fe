import axiosClient from "./axios-customize"
import { GetAccount, IAccount, IBackendResponse, ICategory, ICategoryFilter, ICustomer, ICustomerFilter, IModelPagination, IPermission, IPermissionFilter, IProduct, IProductFilter, IRole, IRoleFilter, ISupplier, ISupplierFilter, IUser, IUserFilter } from "../types/backend"

/* Module Auth */
export const apiLoginForCustomer = (username: string, password: string) => {
    return axiosClient.post<IBackendResponse<IAccount>>('/login', {username, password})
}

export const apiLoginForInternalUser = (username: string, password: string) => {
    return axiosClient.post<IBackendResponse<IAccount>>('/admin/login', {username, password})
}

export const apiRegisterForCustomer = (name: string, email: string, password: string, phone: string, address: string ) => {
    return axiosClient.post<IBackendResponse<IUser>>('/register', {name, email, password, phone, address})
}

export const apiRegisterForInternalUser = (name: string, email: string, password: string, phone: string, address: string ) => {
    return axiosClient.post<IBackendResponse<IUser>>('/admin/register', {name, email, password, phone, address})
}

export const apiGetAccount = () => {
    return axiosClient.get<IBackendResponse<GetAccount>>('/account')
}

export const apiLogout = () => {
    return axiosClient.post<IBackendResponse<string>>('/logout')
}


/* Module User */
export const apiFetchAllUser = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<IUser>>>(`/users?${query}`)
}

export const apiFetchUserById = ( id: string ) => {
    return axiosClient.get<IBackendResponse<IUser>>(`/users?${id}`)
}

export const apiCreateUser = ( user: IUser ) => {
    return axiosClient.post<IBackendResponse<IUser>>('/users/create', {...user})
}

export const apiUpdateUser = ( user: IUser ) => {
    return axiosClient.post<IBackendResponse<IUser>>(`/users/update`, {...user})
}

export const apiDeleteUser = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<IUser>>(`/users/delete/${id}`)
}

/* Module Customer */
export const apiFetchAllCustomer = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<ICustomer>>>(`/customers?${query}`)
}

export const apiFetchCustomerById = ( id: string ) => {
    return axiosClient.get<IBackendResponse<ICustomer>>(`/customers/${id}`)
}

export const apiCreateCustomer = ( customer: ICustomer ) => {
    return axiosClient.post<IBackendResponse<ICustomer>>(`/customers/create`, {...customer})
}

export const apiUpdateCustomer = ( customer: ICustomer ) => {
    return axiosClient.post<IBackendResponse<ICustomer>>(`/customers/update`, {...customer})
}

export const apiDeleteCustomer = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<ICustomer>>(`/customers/delete/${id}`)
}


/* Module Role */
export const apiFetchAllRole = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<IRole>>>(`/roles?${query}`)
}

export const apiUpdateRole = ( role: IRole ) => {
    return axiosClient.post<IBackendResponse<IRole>>(`/roles/update`, {...role})
}

export const apiCreateRole = ( role: IRole ) => {
    return axiosClient.post<IBackendResponse<IRole>>(`/roles/create`, {...role})
}

export const apiDeleteRole = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<IRole>>(`/roles/delete/${id}`)
}


/* Module Product */
export const apiFetchAllProduct = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<IProduct>>>(`/products?${query}`)
}

export const apiCreateProduct = ( product: IProduct ) => {
    return axiosClient.post<IBackendResponse<IProduct>>('/products/create', {...product})
}

export const apiUpdateProduct = ( product: IProduct ) => {
    return axiosClient.post<IBackendResponse<IProduct>>(`/products/update`, {...product})
}

export const apiDeleteProduct = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<IProduct>>(`/products/delete/${id}`)
}

export const apiFetchProductById = ( id: string ) => {
    return axiosClient.get<IBackendResponse<IProduct>>(`/products/${id}`)
}

/* Search */
export const apiSearchUser = ( query: string, userFilter: IUserFilter ) => {
    return axiosClient.post<IBackendResponse<IModelPagination<IUser>>>(`/users/filter?${query}`, {...userFilter})
}

export const apiSearchProduct = ( query: string, productFilter: IProductFilter ) => {
    return axiosClient.post<IBackendResponse<IModelPagination<IProduct>>>(`/products/filter?${query}`, {...productFilter})
}

export const apiSearchSupplier = ( query: string, supplierFilter: ISupplierFilter ) => {
    return axiosClient.post<IBackendResponse<IModelPagination<ISupplier>>>(`/suppliers/filter?${query}`, {...supplierFilter})
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

/* Module Category */
export const apiFetchAllCategory = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<ICategory>>>(`/categories?${query}`)
}

export const apiUpdateCategory = ( category: ICategory ) => {
    return axiosClient.post<IBackendResponse<ICategory>>(`/categories/update`, {...category})
}

export const apiCreateCategory = ( category: ICategory ) => {
    return axiosClient.post<IBackendResponse<ICategory>>(`/categories/create`, {...category})
}

export const apiDeleteCategory = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<ICategory>>(`/categories/delete/${id}`)
}

/* Module Supplier */
export const apiFetchAllSupplier = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<ISupplier>>>(`/suppliers?${query}`)
}

export const apiUpdateSupplier = ( supplier: ISupplier ) => {
    return axiosClient.post<IBackendResponse<ISupplier>>(`/suppliers/update`, {...supplier})
}

export const apiCreateSupplier = ( supplier: ISupplier ) => {
    return axiosClient.post<IBackendResponse<ISupplier>>(`/suppliers/create`, {...supplier})
}

export const apiDeleteSupplier = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<ISupplier>>(`/suppliers/delete/${id}`)
}


/* Module Permission */
export const apiFetchAllPermission = ( query: string ) => {
    return axiosClient.get<IBackendResponse<IModelPagination<IPermission>>>(`/permissions?${query}`)
}

export const apiUpdatePermission = ( permission: IPermission ) => {
    return axiosClient.post<IBackendResponse<IPermission>>(`/permissions/update`, {...permission})
}

export const apiCreatePermission = ( permission: IPermission ) => {
    return axiosClient.post<IBackendResponse<IPermission>>(`/permissions/create`, {...permission})
}

export const apiDeletePermission = ( id: string ) => {
    return axiosClient.delete<IBackendResponse<IPermission>>(`/permissions/delete/${id}`)
}

/* Module Upload */
export const apiUploadSingleFile = ( file: File, folderType: string ) => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    bodyFormData.append("folder", folderType);
    return axiosClient<IBackendResponse<{fileName: string}>>({
        url: "/files",
        method: "post",
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
