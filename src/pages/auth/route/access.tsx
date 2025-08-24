import { useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import NotPermitted from "./not-permitted";

interface IAccessProps {
  hideChildren?: boolean;
  children: React.ReactNode;
  permission: {
    name: string;
  };
}
const Access = (props: IAccessProps) => {
  const userPermissions = useAppSelector(
    (state) => state.account.user?.role?.permissions
  );
  const allPermissions = useAppSelector(
    (state) => state.permissions.permissions
  );

  const findPermissionByName = (name: string) => {
    return allPermissions?.find((item) => item.name === name);
  };

  const [isAccess, setIsAccess] = useState<boolean>(true);

  useEffect(() => {
    if (userPermissions?.length) {
      const permissionWasFound = findPermissionByName(props.permission.name);
      const checkPermission = userPermissions.find(
        (item) => item.id === permissionWasFound?.id
      );
      if (checkPermission) {
        setIsAccess(true);
      } else {
        setIsAccess(false);
      }
    }
  }, [userPermissions, props.permission, allPermissions]);

  return (
    <>
      {isAccess === true || process.env.REACT_APP_ACL_ENABLE === "false" ? (
        <>{props.children}</>
      ) : (
        <>{props.hideChildren === false ? <NotPermitted /> : <> </>}</>
      )}
    </>
  );
};

export default Access;
