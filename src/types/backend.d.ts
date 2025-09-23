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
        fullName: string;
        role: {
            id: string;
            name: string;
            description: string;
            permissions: {
                id: string;
                name: string;
                apiPath: string;
                method: string;
                module: string;
            }[]
        }
    }
}

export interface ICustomerAccount {
    access_token: string;
    customer: {
        id: string;
        email: string;
        fullName: string;
        totalCart?: number;
        role: {
            id: string;
            name: string;
            description: string;
            permissions: {
                id: string;
                name: string;
                apiPath: string;
                method: string;
                module: string;
            }[]
        }
    }
}

export interface GetAccount extends Omit<IAccount, 'access_token'> { }
export interface GetCustomer extends Omit<ICustomerAccount, 'access_token'> { }

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
    apiPath: string;
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
    description?: string;
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
    createdAt?: string | null;
}


export interface IBrand {
    id?: string;
    name: string;
    products?: {
        id: string;
        name?: string;
    }[];
    createdAt?: string;
    updatedAt?: string;
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
    apiPath?: string;
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

export interface ICart {
    id: number;
    sum: number;
    customer: {
      id: number;
      fullName: string;
      email: string;
      phone: string;
      address: string;
      createdAt: string;
      updatedAt: string | null;
      createdBy: string;
      updatedBy: string | null;
      totalSpending: number | null;
      totalOrders: number | null;
      roles: string[] | null;
      orders: any[]; // có thể thay bằng kiểu OrderDTO nếu bạn định nghĩa riêng
      cart: {
        id: number;
      };
    };
    cartDetails: {
      id: number;
      quantity: number;
      price: number;
      product: {
        id: number;
        name: string;
        price: number;
        discount: number;
        stock: number;
        description: string;
        image: string;
        category: {
          id: number;
          name: string;
        };
      };
    }[];
}

export interface IOrder {
    id: number;
    orderCode: string;
    totalPrice: number;
    receiverName: string;
    receiverPhone: string;
    receiverAddress: string;
    note?: string;
    paymentMethod: string;
    paymentStatus: string;
    paymentUrl?: string;
    status: string;
    customer?: {
        id: number;
        fullName: string;
        email: string;
        phone: string;
        address: string;
    }
    orderDetails: {
        id: number;
        quantity: number;
        price: number;
        product: {
            id: number;
            name: string;
            image: string;
            price: number;
            description: string;
            discount: number;
        }
    }[];
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface IRequestCreateOrder {
    receiverName: string;
    receiverPhone: string;
    receiverAddress: string;
    note?: string;
}

export interface IResOrderDTO {
    id: number;
    receiverName: string;
    receiverPhone: string;
    receiverAddress: string;
    note?: string;
    paymentUrl?: string;
}
