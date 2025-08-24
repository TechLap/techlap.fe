import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetAccount } from "../../config/api";

export const fetchUserInfo = createAsyncThunk('auth/fetchUserInfo', async () => {
    const response = await apiGetAccount();
    return response?.data?.data;
}
)

interface IAccountState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isRefreshToken: boolean;
    errorRefreshToken: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: {
            id?: string;
            name?: string;
            description?: string;
            permissions?: {
                id: string;
                name: string;
                route: string;
                method: string;
                module: string;
            }[]
        };
    }
}

const initialState: IAccountState = {
    isAuthenticated: false,
    isLoading: true,
    isRefreshToken: false,
    errorRefreshToken: '',
    user: {
        id: '',
        email: '',
        name: '',
        role: {
            id: '',
            name: '',
            description: '',
            permissions: []
        }
    }
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUserLoginInfo: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user.id = action?.payload?.id;
            state.user.email = action.payload.email;
            state.user.name = action.payload.name;
            state.user.role = action?.payload?.role;
            if (!action?.payload?.role) state.user.role = {};
            state.user.role.permissions = action?.payload?.role?.permissions ?? [];
        },
        setRefreshTokenAction: (state, action) => {
            state.isRefreshToken = action.payload?.status ?? false;
            state.errorRefreshToken = action.payload?.message ?? '';
        },

        setLogoutAction: (state) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = {
                id: '',
                email: '',
                name: '',
                role: {
                    id: '',
                    name: '',
                    description: '',
                    permissions: []
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.pending, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = true;
            }
        })
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user.id = action.payload?.user?.id;
                state.user.email = action.payload?.user?.email;
                state.user.name = action.payload?.user?.name;
                state.user.role = action.payload?.user?.role;
                if (!action.payload?.user?.role) state.user.role = {};
                state.user.role.permissions = action.payload?.user?.role?.permissions ?? [];
            }
        })
        builder.addCase(fetchUserInfo.rejected, (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
        });
    },
});

export const { setUserLoginInfo, setRefreshTokenAction, setLogoutAction } = accountSlice.actions;

export default accountSlice.reducer;