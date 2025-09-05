import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Trang Chính", href: "/" },
  {
    name: "Laptop",
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
                {item.subcategories && <ChevronDown className="h-4 w-4 text-gray-400" />}
              </NavLink>

              {item.subcategories && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    {item.subcategories.map((sub, subIndex) => (
                      <div
                        key={subIndex}
                        className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
};

export default MainNav;
