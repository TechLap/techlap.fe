import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "./App.css";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";
import ClientLayout from "./layouts/ClientLayout";
import CategoryPage from "./pages/admin/category";
import CustomerPage from "./pages/admin/customer";
import DashboardPage from "./pages/admin/dashboard";
import OrderPage from "./pages/admin/orders";
import PermissionPage from "./pages/admin/permissions";
import ProductPage from "./pages/admin/products";
import RolePage from "./pages/admin/roles";
import BrandPage from "./pages/admin/brand";
import UserPage from "./pages/admin/users";
import LoginPage from "./pages/auth/login";
import LoginInternalUserPage from "./pages/auth/login.internal.user";
import RegisterPage from "./pages/auth/register";
import ProtectedRoute from "./pages/auth/route/protected.route";
import AboutPage from "./pages/client/about";
import CartPage from "./pages/client/cart";
import ContactPage from "./pages/client/contact";
import HomePage from "./pages/client/home";
import ProductDetailPage from "./pages/client/product/detail/product.detail";
import ProductShowPage from "./pages/client/product/show";
import ErrorPage from "./pages/error-page";
import { useAppDispatch } from "./redux/hooks";
import { fetchUserInfo } from "./redux/slice/account.slice";
import "./styles/datepicker-xs.css";
import { fetchCustomerInfo } from "./redux/slice/customer.slide";
import { HistoryOrder } from "./pages/client/history-order";
import ChangePasswordPageForCustomer from "./pages/client/password/change-password";
import ChangePasswordPageForUser from "./pages/admin/password/change-password";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export const routes = [
  {
    path: "/",
    element: (
      <AppLayout>
        <ClientLayout />
      </AppLayout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        breadcrumb: "Trang chủ",
      },
      {
        path: "about",
        element: <AboutPage />,
        breadcrumb: "Giới thiệu",
      },
      {
        path: "contact",
        element: <ContactPage />,
        breadcrumb: "Liên hệ",
      },
      {
        path: "products",
        element: <ProductShowPage />,
        breadcrumb: "Sản phẩm",
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
        breadcrumb: "Chi tiết sản phẩm",
      },
      {
        path: "cart",
        element: <CartPage />,
        breadcrumb: "Giỏ hàng",
      },
      {
        path: "history-order",
        element: <HistoryOrder />,
        breadcrumb: "Lịch sử đơn hàng",
      },
      {
        path: "change-password",
        element: <ChangePasswordPageForCustomer />,
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/admin",
    element: (
      <AppLayout>
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      </AppLayout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
        breadcrumb: "Quản trị",
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
        breadcrumb: "Trang chủ",
      },
      {
        path: "users",
        element: <UserPage />,
        breadcrumb: "Nhân viên",
      },
      {
        path: "customers",
        element: <CustomerPage />,
        breadcrumb: "Khách hàng",
      },
      {
        path: "products",
        element: <ProductPage />,
        breadcrumb: "Sản phẩm",
      },
      {
        path: "orders",
        element: <OrderPage />,
        breadcrumb: "Đơn hàng",
      },
      {
        path: "brands",
        element: <BrandPage />,
        breadcrumb: "Thương hiệu",
      },
      {
        path: "categories",
        element: <CategoryPage />,
        breadcrumb: "Danh mục",
      },
      {
        path: "permissions",
        element: <PermissionPage />,
        breadcrumb: "Quyền hạn",
      },
      {
        path: "roles",
        element: <RolePage />,
        breadcrumb: "Vai trò",
      },
      {
        path: "change-password",
        element: <ChangePasswordPageForUser />,
      }
    ],
  },
  {
    path: "admin/login",
    element: <LoginInternalUserPage />,
  },
];

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/admin/login"
    )
      return;
    dispatch(fetchUserInfo());
    dispatch(fetchCustomerInfo());
  }, []);

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        pauseOnHover={false}
        draggable={true}
        newestOnTop
        transition={Slide}
      />
    </>
  );
}

export default App;

