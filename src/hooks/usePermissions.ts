import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { apiFetchAllPermission } from "../config/api";
import { useAppDispatch } from "../redux/hooks";
import { setPermissionAction } from "../redux/slice/permission.slice";

export const usePermissions = () => {
    const dispatch = useAppDispatch();
    const { data: permissions, isLoading } = useQuery({
        queryKey: ["fetchAllPermissions"],
        queryFn: () => apiFetchAllPermission(`page=1&size=100`),
    });

    useEffect(() => {
        if (permissions) {
            dispatch(setPermissionAction({
                permissions: permissions?.data?.data?.result,
                isLoading: false,
                error: "",
            }));
        }
    }, [permissions, dispatch]);

    return { permissions, isLoading };
}
