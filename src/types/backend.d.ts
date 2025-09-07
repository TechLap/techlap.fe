export interface IBackendResponse<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IAccount {
    access_token: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: {
            id: string;
            name: string;
            description: string;
            permissions: {
                id: string;
                name: string;
                route: string;
                method: string;
                module: string;
            }[]
        }
    }
}

export interface GetAccount extends Omit<IAccount, 'access_token'> { }

export interface IModelPagination<T> {
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: T[]
}

export interface IUser {
    id?: string;
    email: string;
    password?: string;
    fullName: string;
    address: string;
    phone?: string;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
    role?: {
        id: string;
        name?: string;
        description?: string;
    }
}

export interface IUserFilter {
    email?: string;
    fullName?: string;
    address?: string;
    phone?: string;
    createdAt?: string | null;
    role?: {
        id: string;
    }
}

export interface IPermission {
    id?: string;
    name: string;
    module: string;
    method: string;
    route: string;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
    updatedBy?: string;
}


export interface IRole {
    id?: string;
    name: string;
    description: string;
    permissions?: {
        id: string;
    }[];
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
}

export interface IProduct {
    id?: string;
    name: string;
    quantity: number;
    description: string;
    status: string;
    stock: number;
    discount?: number;
    image?: string | null;
    price: number;
    brand?: {
        id: string;
        name?: string;
    };
    category?: {
        id: string;
        name?: string;
    };
    createdAt?: string;
    createdBy?: string;
}

export interface ICategory {
    id?: string;
    name: string;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface IProductFilter {
    name?: string;
    quantity?: number;
    status?: string;
    price?: number;
    category?: {
        id: string;
    };
    brand?: {
        id: string;
    };
    priceRange?: {
        min: number;
        max: number;
    }
}


export interface ICategoryFilter {
    name?: string;
    active?: boolean;
    createdAt?: string | null;
}


export interface IBrand {
    id?: string;
    name: string;
    products?: {
        id: string;
        name?: string;
    }[];
}
export interface ISupplier {
    id?: string;
    name: string;
    active: boolean;
    contactInfo: string;
    totalProducts?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ISupplierFilter {
    name?: string;
    contactInfo?: string;
    active?: boolean;
    createdAt?: string | null;
}

export interface IPermissionFilter {
    name?: string;
    module?: string;
    method?: string;
    route?: string;
    createdAt?: string | null;
}

export interface IRoleFilter {
    name?: string;
    createdAt?: string | null;
}

export interface ICustomer {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    password?: string;
    role?: {
        id: string;
        name?: string;
        description?: string;
    }
    latitude?: number;
    longitude?: number;
    provinceId?: string;
    districtId?: string;
    wardId?: string;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
}

export interface ICustomerFilter {
    fullName?: string;
    email?: string;
    phone?: string;
    createdAt?: string | null;
}

