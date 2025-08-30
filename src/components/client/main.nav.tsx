
type NavItem = {
  id: number;
  name: string;
};

const categories: NavItem[] = [
  { id: 1, name: "Laptop Gaming" },
  { id: 2, name: "Laptop Văn Phòng" },
  { id: 3, name: "Laptop Đồ Họa" },
  { id: 4, name: "Laptop Mỏng Nhẹ" },
  { id: 5, name: "Phụ Kiện Laptop" },
]

const MainNav = () => {
  return (
    <nav className="px-4 sm:px-6 flex w-full py-4 bg-gradient-to-r bg-white overflow-x-auto shadow-sm border-y border-gray-200">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          {categories.map((category, index) => (
            <div key={index} className="relative group">
              <div className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
