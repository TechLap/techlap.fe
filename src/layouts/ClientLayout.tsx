import { Outlet } from "react-router-dom";
import Footer from "../components/client/footer";
import Header from "../components/client/header";
import MainNav from "../components/client/main.nav";

const ClientLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MainNav />
      <main className="flex-grow ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
