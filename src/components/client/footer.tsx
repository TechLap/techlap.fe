import { NavLink } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "../common/icons";

type FooterAboutItem = {
  id: number;
  label: string;
  path: string;
};
const footerAboutItems: FooterAboutItem[] = [
  { id: 1, label: "Giới thiệu", path: "/about" },
  { id: 2, label: "Liên hệ", path: "/contact" },
  { id: 3, label: "Chính sách bảo mật", path: "/privacy-policy" },
  { id: 4, label: "Điều khoản và điều kiện", path: "/terms-and-conditions" },
  { id: 5, label: "Câu hỏi thường gặp", path: "/faq" },
];

const categories = [
  { id: 1, name: 'Laptop Gaming' },
  { id: 2, name: 'Laptop Văn Phòng' },
  { id: 3, name: 'Laptop Đồ Họa' },
  { id: 4, name: 'Laptop Mỏng Nhẹ' },
  { id: 5, name: 'Phụ Kiện Laptop' }
]

const Footer = () => {
  return (
    <footer className="pt-12 pb-8 border-t border-gray-200 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-600 text-white p-2 rounded-lg font-bold text-xl">LT</div>
              <div>
                <h3 className="text-xl font-bold">LapTech</h3>
                <p className="text-sm opacity-80">Thế giới LapTop dành cho bạn</p>
              </div>
            </div>
            <p className="mb-4">
              Chuyên cung cấp laptop gaming, văn phòng và phụ kiện chính hãng với giá tốt nhất thị trường.
            </p>
            <div className="flex gap-4">
              <NavLink
                to="https://www.facebook.com/anh.quoc.617407?locale=vi_VN"
                target="_blank"
                className="h-5 w-5 opacity-80 hover:opacity-100 cursor-pointer"
              >
                <Facebook size={20} color="currentColor" />
              </NavLink>
              <NavLink
                to="https://www.instagram.com/aquoc.2110/"
                target="_blank"
                className="h-5 w-5 opacity-80 hover:opacity-100 cursor-pointer"
              >
                <Instagram size={20} color="currentColor" />
              </NavLink>
              <NavLink
                to="https://www.youtube.com/@quocbuianh8103"
                target="_blank"
                className="h-5 w-5 opacity-80 hover:opacity-100 cursor-pointer"
              >
                <Youtube size={20} color="currentColor" />
              </NavLink>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">
              Danh mục sản phẩm
            </h3>
            <ul className="space-y-2">
              {categories.map(
                (category) =>
                  category && (
                    <li key={category.id}>
                      <NavLink
                        to={`/products?category=${category.id}`}
                        className="hover:text-blue-400 hover:underline"
                      >
                        {category.name}
                      </NavLink>
                    </li>
                  )
              )}
            </ul>
          </div>
          {/* {isPending && (
            <div className="text-center text-gray-600">Đang tải...</div>
          )}
          {isError && (
            <div className="text-center text-red-600">
              Lỗi khi tải danh mục
            </div>
          )} */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              Về chúng tôi
            </h3>
            <ul className="space-y-2">
              {footerAboutItems.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    className="hover:text-blue-400 hover:underline"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold  mb-4">Liên hệ</h3>
            <ul className="space-y-2 ">
              <li>
                <span className="font-semibold">
                  Địa chỉ:
                </span> 179/58/16 Lê Đình Thám, phường Tân Quý, quận Tân Phú, TP. HCM
              </li>
              <li>
                <span className="font-semibold">
                  Email:{' '}
                </span>bonanhemsieunhan@gmail.com
              </li>
              <li>
                <span className="font-semibold">
                  Hotline:{' '}
                </span>0999999999
              </li>
              <li>
                <span className="font-semibold">
                  Giờ làm việc:{' '}
                </span>08h00 - 17h00, T2 - CN
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-10 border-gray-300 pt-4">
          <p className="text-white-600 text-sm text-center sm:text-left">
            © Copyright 2025 LapTopShop. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
