import { NavLink } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "../common/icons";

type NavItem = {
  id: number;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { id: 1, label: "Trang chủ", path: "/" },
  { id: 2, label: "Sản phẩm", path: "/products" },
  { id: 3, label: "Giới thiệu", path: "/about" },
  { id: 4, label: "Liên hệ", path: "/contact" },
];

const MainNav = () => {
  return (
    <nav className="px-4 sm:px-6 flex w-full py-4 bg-gradient-to-r from-emerald-50 to-green-50 overflow-x-auto shadow-sm border-y border-gray-200">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              className={({ isActive }) =>
                "px-6 py-3 font-medium rounded-md transition-colors duration-200 focus:outline-none focus:bg-green-100" +
                (isActive
                  ? " text-green-800 bg-green-100 border-b-2 border-green-800 font-semibold"
                  : " text-gray-700 hover:bg-green-100 hover:border-b-2 hover:border-green-800 hover:font-semibold hover:text-green-800")
              }
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <NavLink
            to="https://www.facebook.com/anh.quoc.617407?locale=vi_VN"
            target="_blank"
            className="rounded-full bg-white p-1 hover:bg-white transition-all duration-100 border border-gray-300 flex items-center justify-center group"
          >
            <Facebook
              size={16}
              color="currentColor"
              className="group-hover:text-green-700 transition-all duration-100"
            />
          </NavLink>
          <NavLink
            to="https://www.instagram.com/aquoc.2110/"
            target="_blank"
            className="rounded-full bg-white p-1 hover:bg-white transition-all duration-100 border border-gray-300 flex items-center justify-center group"
          >
            <Instagram
              size={16}
              color="currentColor"
              className=" group-hover:text-green-700 transition-all duration-100"
            />
          </NavLink>
          <NavLink
            to="https://www.youtube.com/@quocbuianh8103"
            target="_blank"
            className="rounded-full bg-white p-1 hover:bg-white transition-all duration-100 border border-gray-300 flex items-center justify-center group"
          >
            <Youtube
              size={16}
              color="currentColor"
              className=" group-hover:text-green-700 transition-all duration-100"
            />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
