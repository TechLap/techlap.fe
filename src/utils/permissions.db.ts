import { openDB } from 'idb';
import { IPermission } from '../types/backend';

const dbName = 'permissionsDB';
const dbVersion = 1;
const storeName = 'storePermissions';

const permissionsDB = async () => {
    return await openDB(dbName, dbVersion, {
        upgrade(db) {
            db.createObjectStore(storeName, { keyPath: 'name' });
        },
    });
};

export const storeAllPermissionsInStore = async (permissions: IPermission[]) => {
    const db = await permissionsDB();
    
    const tx = db.transaction(storeName, 'readwrite');
    await Promise.all(permissions.map(permission => {
        return tx.store.put({
            id: permission.id,
            name: permission.name,
            module: permission.module,
            method: permission.method,
            route: permission.route,
        });
    }));
    await tx.done;
};

export const getPermissionFromStore = async (name: string) => {
    const db = await permissionsDB();
    const tx = db.transaction(storeName, 'readonly');
    return await tx.store.get(name);
};

