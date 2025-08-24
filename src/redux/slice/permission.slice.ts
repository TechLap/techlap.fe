import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetchAllPermission } from "../../config/api";
import { storeAllPermissionsInStore } from "../../utils/permissions.db";

export const fetchAndCachePermissions = createAsyncThunk(`permission/fetchAndCachePermissions`, async() => {
    const response = await apiFetchAllPermission(`?page=1&size=100`);
    const permissions = response?.data?.data?.result ?? [];
    await storeAllPermissionsInStore(permissions);
    return permissions;
})

interface IPermissionState {
    permissions: {
        id?: string;
        name: string;
        module: string;
        route: string;
        method: string;
    }[];
    isLoading: boolean;
    error: string;
}

const initialState: IPermissionState = {
    permissions: [],
    isLoading: false,
    error: '',
}

export const permissionSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        setPermissionAction: (state, action) => {
            if (action.payload) {
                state.permissions = action.payload?.permissions ?? [];
                state.isLoading = action.payload?.isLoading ?? false;
                state.error = action.payload?.error ?? '';
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAndCachePermissions.pending, (state, action) => {
            if (action.payload) {
                state.isLoading = true;
            }
        })
        builder.addCase(fetchAndCachePermissions.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoading = false;
                state.permissions = action?.payload ?? [];
            }
        })
        builder.addCase(fetchAndCachePermissions.rejected, (state) => {
            state.isLoading = false;
            state.error = 'Failed to fetch permissions';
        })
    }
});


export const { setPermissionAction } = permissionSlice.actions;

export default permissionSlice.reducer;