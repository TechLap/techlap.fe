import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetCustomer } from "../../config/api";
import { set } from "date-fns";

export const fetchCustomerInfo = createAsyncThunk('auth/fetchCustomerInfo', async () => {
    const response = await apiGetCustomer();
    return response?.data?.data;
}
)

interface ICustomerAccountState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isRefreshToken: boolean;
    errorRefreshToken: string;
    customer: {
        id: string;
        email: string;
        fullName: string;
        totalCart?: number;
        role: {
            id?: string;
            name?: string;
            description?: string;
            permissions?: {
                id: string;
                name: string;
                apiPath: string;
                method: string;
                module: string;
            }[]
        };
    }
}

const initialState: ICustomerAccountState = {
    isAuthenticated: false,
    isLoading: true,
    isRefreshToken: false,
    errorRefreshToken: '',
    customer: {
        id: '',
        email: '',
        fullName: '',
        totalCart: 0,
        role: {
            id: '',
            name: '',
            description: '',
            permissions: []
        }
    }
};

export const customerAccountSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomerLoginInfo: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.customer.id = action?.payload?.id;
            state.customer.email = action.payload.email;
            state.customer.fullName = action.payload.fullName;
            state.customer.totalCart = action.payload.totalCart;
            state.customer.role = action?.payload?.role;
            if (!action?.payload?.role) state.customer.role = {};
            state.customer.role.permissions = action?.payload?.role?.permissions ?? [];
        },
        setCustomerRefreshTokenAction: (state, action) => {
            state.isRefreshToken = action.payload?.status ?? false;
            state.errorRefreshToken = action.payload?.message ?? '';
        },

        setCustomerLogoutAction: (state) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.isLoading = false;
            state.customer = {
                id: '',
                email: '',
                fullName: '',
                role: {
                    id: '',
                    name: '',
                    description: '',
                    permissions: []
                }
            }
        },
        setCustomerAddToCart: (state, action) => {
            state.customer.totalCart = (state.customer.totalCart || 0) + action.payload?.quantity;
        },
        setCustomerRemoveFromCart: (state, action) => {
            state.customer.totalCart = (state.customer.totalCart || 0) - action.payload?.quantity;
        },
        setCheckout: (state) => {
            state.customer.totalCart = 0;
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomerInfo.pending, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = true;
            }
        })
        builder.addCase(fetchCustomerInfo.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.customer.id = action.payload?.customer?.id;
                state.customer.email = action.payload?.customer?.email;
                state.customer.fullName = action.payload?.customer?.fullName;
                state.customer.totalCart = action.payload?.customer?.totalCart;
                state.customer.role = action.payload?.customer?.role;
                if (!action.payload?.customer?.role) state.customer.role = {};
                state.customer.role.permissions = action.payload?.customer?.role?.permissions ?? [];
            }
        })
        builder.addCase(fetchCustomerInfo.rejected, (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
        });
    },
});

export const { setCustomerLoginInfo, setCustomerRefreshTokenAction, setCustomerLogoutAction, setCustomerAddToCart, setCustomerRemoveFromCart, setCheckout } = customerAccountSlice.actions;

export default customerAccountSlice.reducer;