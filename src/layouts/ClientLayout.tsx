import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/client/footer";
import Header from "../components/client/header";
import MainNav from "../components/client/main.nav";
import ScrollToTop from "../components/common/scrollToTop";

const ClientLayout = () => {

  const location = useLocation();
  // Check route
  const hiddenNavRoutes = ["/about", "/contact"];

  const shouldShowNav = hiddenNavRoutes.includes(location.pathname);
  
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop/>
      <Header />
      {!shouldShowNav && <MainNav />}
      <main className="flex-grow ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
