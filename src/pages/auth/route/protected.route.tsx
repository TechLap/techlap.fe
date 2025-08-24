import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../../components/common/loading.spinner";
import { useAppSelector } from "../../../redux/hooks";
import NotPermitted from "./not-permitted";
const RoleBase = (props: any) => {
  const userRole = useAppSelector((state) => state.account.user.role);
  const roleName = userRole?.name;
  return <>{roleName !== "Customer" ? props.children : <NotPermitted />}</>;
};

const ProtectedRoute = (props: any) => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const isLoading = useAppSelector((state) => state.account.isLoading);
  return (
    <>
      {isLoading === true ? (
        <LoadingSpinner />
      ) : (
        <>
          {isAuthenticated === true ? (
            <RoleBase>{props.children}</RoleBase>
          ) : (
            <Navigate to={"/login"} replace />
          )}
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
