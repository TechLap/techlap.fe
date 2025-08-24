import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomToast from "../components/common/toast.message";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setRefreshTokenAction } from "../redux/slice/account.slice";
import { toast } from "react-toastify";

const AppLayout = (props: any) => {
  const isRefreshToken = useAppSelector(
    (state) => state.account.isRefreshToken
  );
  const errorRefreshToken = useAppSelector(
    (state) => state.account.errorRefreshToken
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isRefreshToken === true) {
      localStorage.removeItem("access_token");
      toast.error(
        <CustomToast message={errorRefreshToken} className="text-red-600" />
      );
      dispatch(setRefreshTokenAction({ status: false, message: "" }));
      navigate("/login");
    }
  }, [isRefreshToken]);

  return <>{props.children}</>;
};

export default AppLayout;
