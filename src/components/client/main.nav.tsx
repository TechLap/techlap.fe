import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Trang Chính", href: "/" },
  {
    name: "Sản Phẩm",
    href: "/products",
    subcategories: ["Laptop Gaming", "Laptop Văn Phòng", "Laptop Đồ Họa", "Laptop Mỏng Nhẹ"],
  },
  { name: "Bảo hành", href: "/warranty" },
  { name: "Liên Hệ", href: "/contact" },
  { name: "Giới Thiệu", href: "/about" },
]

const MainNav = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="w-full mx-auto px-4">
        <div className="flex items-center space-x-8 py-3">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-lg whitespace-nowrap 
                  ${isActive ? "text-blue-500 bg-gray-100" : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"}`
                }
              >
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>

            </div>
          ))}
        </div>
      </div>
    </nav>
  )
};

export default MainNav;
