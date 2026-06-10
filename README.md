# 🖥️ TechLap — Frontend

> Ứng dụng web bán laptop & phụ kiện công nghệ, được xây dựng bằng **React 19** + **TypeScript** + **TailwindCSS 3**.

---

## ✨ Tính năng chính

### 🛒 Khách hàng (Client)
- Trang chủ với banner, sản phẩm mới nhất & bán chạy
- Duyệt sản phẩm theo danh mục, thương hiệu, khoảng giá
- Xem chi tiết sản phẩm
- Giỏ hàng & đặt hàng
- Thanh toán VNPay
- Lịch sử đơn hàng
- Đăng ký / Đăng nhập / Quên mật khẩu / Đổi mật khẩu
- Tra cứu bảo hành
- Trang giới thiệu & liên hệ (tích hợp Leaflet Map)

### 🔧 Quản trị (Admin)
- Dashboard thống kê (doanh thu, đơn hàng, khách hàng…) với biểu đồ **Recharts**
- CRUD: Sản phẩm, Danh mục, Thương hiệu, Đơn hàng
- Quản lý Nhân viên, Khách hàng
- Phân quyền động (Role → Permissions) với ACL
- Upload ảnh sản phẩm

---

## 🛠️ Tech Stack

| Layer | Công nghệ |
|---|---|
| Framework | React 19 (Create React App) |
| Language | TypeScript 4.9 |
| Styling | TailwindCSS 3 + Preline UI |
| State Management | Redux Toolkit + Redux Persist |
| Data Fetching | TanStack React Query v5 |
| HTTP Client | Axios (custom interceptor, auto-refresh token) |
| Routing | React Router DOM v6 |
| Form | React Hook Form + Yup validation |
| Charts | Recharts |
| Map | React Leaflet |
| Icons | Lucide React |
| Notifications | React Toastify |
| Utilities | date-fns, dayjs, lodash, clsx, tailwind-merge |

---

## 📋 Yêu cầu hệ thống

| Yêu cầu | Phiên bản |
|---|---|
| Node.js | >= 16.x |
| npm | >= 8.x |
| Git | >= 2.x |
| Backend | [techlap.be](../techlap.be) đang chạy tại `localhost:8080` |

---

## 🚀 Hướng dẫn cài đặt

### 1. Clone Repository

```bash
git clone <repository-url>
cd techlap.fe
```

### 2. Cài đặt Dependencies

```bash
npm install
```

### 3. Cấu hình Environment

#### Option A: Sử dụng script tự động (Linux / macOS / Git Bash)

```bash
chmod +x setup.sh
./setup.sh
```

Script sẽ tạo file `.env` (nếu chưa có) và tạo symlink `storage/` trỏ đến thư mục ảnh backend.

> ⚠️ Sau khi chạy script, mở file `.env` và cập nhật các đường dẫn cho đúng với máy của bạn.

#### Option B: Setup thủ công

Tạo file `.env` tại thư mục gốc dự án:

```env
REACT_APP_TECHLAP_BACKEND_URL=http://localhost:8080/api/v1
REACT_APP_URL_STORAGE_FILE=http://localhost:8080/storage
REACT_APP_BACKEND_UPLOADS_PATH=/đường/dẫn/tuyệt/đối/tới/techlap.be/uploads/productImgs
REACT_APP_ACL_ENABLE=true
```

| Biến | Mô tả |
|---|---|
| `REACT_APP_TECHLAP_BACKEND_URL` | URL gốc API backend (Axios base URL) |
| `REACT_APP_URL_STORAGE_FILE` | URL công khai để truy cập ảnh sản phẩm |
| `REACT_APP_BACKEND_UPLOADS_PATH` | Đường dẫn tuyệt đối trên ổ đĩa đến thư mục uploads backend — dùng bởi `setup.sh` để tạo symlink |
| `REACT_APP_ACL_ENABLE` | `true` = bật phân quyền động (ACL), `false` = tắt |

#### Tạo symlink Storage (nếu cần)

Symlink cho phép image server phục vụ ảnh sản phẩm từ backend.

**Linux / macOS / Git Bash:**
```bash
ln -s /đường/dẫn/tới/techlap.be/uploads/productImgs storage
```

**Windows (CMD — quyền Admin):**
```cmd
mklink /D storage "D:\đường\dẫn\tới\techlap.be\uploads\productImgs"
```

**Windows (PowerShell — quyền Admin):**
```powershell
New-Item -ItemType SymbolicLink -Path "storage" -Target "D:\đường\dẫn\tới\techlap.be\uploads\productImgs"
```

### 4. Khởi chạy ứng dụng

```bash
npm start
```

Lệnh này sử dụng `concurrently` để chạy đồng thời:
- **React Dev Server** — `http://localhost:3000`
- **Image Server** — `http://localhost:3001` (phục vụ ảnh từ `storage/`)

| Vai trò | URL đăng nhập |
|---|---|
| Khách hàng | `http://localhost:3000/login` |
| Nhân viên / Admin | `http://localhost:3000/admin/login` |

> Kiểm tra dữ liệu seed của backend để biết tài khoản mặc định.

---

## 📜 Các lệnh NPM

| Lệnh | Mô tả |
|---|---|
| `npm start` | Chạy React app + image server đồng thời |
| `npm run start-react` | Chỉ chạy React dev server |
| `npm run start-img-server` | Chỉ chạy image server (port 3001) |
| `npm run build` | Build production (output: `build/`) |
| `npm test` | Chạy test |

---

## 📁 Cấu trúc thư mục

```
techlap.fe/
├── public/                     # Static assets (favicon, images, index.html)
├── src/
│   ├── components/
│   │   ├── admin/              # Admin: sidebar, header, CRUD modals (brands, categories, customers, orders, permissions, products, roles, users)
│   │   ├── client/             # Client: header, footer, hero banner, product card, product section, categories showcase, order detail…
│   │   ├── common/             # Shared: pagination, data table, modal delete, upload image, loading spinner, toast, tabs…
│   │   └── ui/                 # Base UI primitives (badge…)
│   ├── config/
│   │   ├── api.ts              # Tất cả API endpoints (auth, user, customer, product, brand, category, role, permission, order, upload, payment)
│   │   ├── axios-customize.ts  # Axios instance + interceptor + auto refresh token
│   │   └── permission.ts       # Permission config
│   ├── hooks/                  # Custom hooks: useProducts, useCategories, useBrands, usePermissions…
│   ├── layouts/                # AppLayout, ClientLayout, AdminLayout
│   ├── pages/
│   │   ├── admin/              # Dashboard, Products, Categories, Brands, Orders, Users, Customers, Roles, Permissions, Change Password
│   │   ├── auth/               # Login (Customer), Login (Internal User), Register, Protected Route
│   │   └── client/             # Home, About, Contact, Warranty, Cart, Product (list + detail), History Order, Payment (VNPay), Password
│   ├── redux/
│   │   ├── store.ts            # Redux store config với persist
│   │   ├── hooks.ts            # Typed useAppDispatch & useAppSelector
│   │   └── slice/              # account.slice, customer.slice, permission.slice
│   ├── styles/                 # Custom CSS (datepicker-xs…)
│   ├── types/
│   │   └── backend.d.ts        # TypeScript interfaces cho toàn bộ API response
│   └── utils/                  # Token helpers, permission DB (IndexedDB), utility functions
├── storage/                    # Symlink → backend uploads (gitignored)
├── .env                        # Environment variables (gitignored)
├── setup.sh                    # Script setup tự động
├── tailwind.config.js          # TailwindCSS + Preline plugin config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies & npm scripts
```

---

## ❓ Troubleshooting

### Backend không kết nối được
- Đảm bảo backend đã chạy tại `http://localhost:8080`
- Kiểm tra `REACT_APP_TECHLAP_BACKEND_URL` trong `.env` (phải có `/api/v1`)
- Sau khi sửa `.env`, **khởi động lại** dev server (`Ctrl+C` → `npm start`)

### Ảnh sản phẩm không hiển thị
- Kiểm tra symlink `storage/` trỏ đúng thư mục
- Đảm bảo image server đang chạy (port 3001)
- Kiểm tra `REACT_APP_URL_STORAGE_FILE` trong `.env`

### Permission denied khi chạy `setup.sh`
```bash
chmod +x setup.sh
```

### Symlink không hoạt động trên Windows
- Chạy CMD/PowerShell với **quyền Administrator**
- Hoặc bật **Developer Mode** trong Windows Settings → For Developers

### Port 3000 hoặc 3001 đã bị chiếm
```bash
# Tìm process (Windows)
netstat -ano | findstr :3000
# Kill
taskkill /PID <PID> /F
```

### Module not found sau khi pull code mới
```bash
rm -rf node_modules
npm install
```

---

## 🔗 Liên kết

- **Backend**: [techlap.be](../techlap.be) (Spring Boot / Java)
- **Mặc định**: Frontend chạy tại `http://localhost:3000`, Backend tại `http://localhost:8080`
