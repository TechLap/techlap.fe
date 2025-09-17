# Setup Guide cho TechLap Frontend

## 1. Clone Repository
```bash
git clone <repository-url>
cd techlap.fe
```

## 2. Install Dependencies
```bash
npm install
```

## 3. Environment Setup

### Option A: Sử dụng script tự động (Khuyến nghị)
```bash
./setup.sh
```

### Option B: Setup thủ công
```bash
# Copy environment template
cp .env.example .env

# Edit .env file với đường dẫn backend của bạn
# REACT_APP_BACKEND_UPLOADS_PATH=/path/to/your/backend/Uploads/productImgs

# Tạo symlink đến backend uploads
ln -s /path/to/your/backend/Uploads/productImgs storage
```

## 4. Start Development Server
```bash
npm start
```

## 5. Troubleshooting

### Lỗi: Backend path not found
- Kiểm tra đường dẫn trong file `.env`
- Đảm bảo backend đã chạy và tạo thư mục uploads

### Lỗi: Permission denied
```bash
chmod +x setup.sh
```

### Lỗi: Storage symlink không hoạt động
```bash
rm -rf storage
ln -s /path/to/your/backend/Uploads/productImgs storage
```

## 6. Cấu trúc File
```
techlap.fe/
├── .env                    # Environment variables (local)
├── .env.example           # Template cho team
├── setup.sh              # Script setup tự động
├── storage/              # Symlink đến backend uploads
└── ...
```

## 7. Environment Variables
- `REACT_APP_URL_STORAGE_FILE`: URL của image server (http://localhost:3001)
- `REACT_APP_BACKEND_UPLOADS_PATH`: Đường dẫn đến thư mục uploads của backend
