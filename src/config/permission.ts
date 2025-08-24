import { IPermission } from "../types/backend";

export function groupPermissionsByModule(permissions: IPermission[]) {
    const modules = Array.from(new Set(permissions?.map((permission) => permission.module)));
    return modules?.map((module) => ({
        module,
        permissions: permissions?.filter((permission) => permission.module === module),
    }));
}

export function getPermissionsByModule(permissions: IPermission[], module: string) {
    return permissions?.filter(permission => permission.module === module).map(permission => ({
        route: permission.route,
        method: permission.method,
        id: permission.id,
    }));
}

