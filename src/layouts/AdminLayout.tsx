import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/admin/header";
import SideBar from "../components/admin/sidebar";
import BreadcrumbResponsive from "../components/admin/breadcrumb.responsive";
import { useAppDispatch } from "../redux/hooks";
import { fetchAndCachePermissions } from "../redux/slice/permission.slice";
import { useEffect } from "react";

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAndCachePermissions());
  }, [dispatch]);

  const location = useLocation();
  // Check route
  const hiddenNavRoutes = ["/admin/change-password"];

  const shouldShowNav = hiddenNavRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen">
      <Header />
      <BreadcrumbResponsive />
      {shouldShowNav &&
        <Outlet />
      }
      {!shouldShowNav &&
        <div className="lg:pl-40 sm:pl-0">
          <SideBar />
          <main className="p-4 pt-0">
            <Outlet />
          </main>
        </div>
      }
    </div>
  );
};

export default AdminLayout;
