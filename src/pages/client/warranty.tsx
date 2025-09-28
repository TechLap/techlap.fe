import { useState } from "react";
import { Shield, Phone, Mail, MapPin, Clock, CheckCircle, XCircle, Search } from "../../components/common/icons";

interface SearchResult {
  productName: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyExpiry: string;
  status: string;
  remainingDays: number;
}

const WarrantyPage = () => {
  const [activeTab, setActiveTab] = useState("policy");
  const [serialNumber, setSerialNumber] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [supportForm, setSupportForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    serialNumber: "",
    description: ""
  });

  const handleSearch = () => {
    if (serialNumber.trim()) {
      // Mock search result - in real app, this would call API
      setSearchResult({
        productName: "Laptop Gaming ASUS ROG Strix G15",
        serialNumber: serialNumber,
        purchaseDate: "15/03/2024",
        warrantyExpiry: "15/03/2027",
        status: "Còn bảo hành",
        remainingDays: 245
      });
    }
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Support request:", supportForm);
    alert("Yêu cầu hỗ trợ đã được gửi thành công!");
    setSupportForm({
      fullName: "",
      phone: "",
      email: "",
      serialNumber: "",
      description: ""
    });
  };

  const tabs = [
    { id: "policy", label: "Chính Sách" },
    { id: "process", label: "Quy Trình" },
    { id: "contact", label: "Liên Hệ" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Shield size={64} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Chính Sách Bảo Hành</h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Cam kết bảo hành chính hãng, hỗ trợ khách hàng 24/7 với dịch vụ chuyên nghiệp
            </p>
            
            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-6xl font-bold text-yellow-400 mb-2">24h</div>
                <p className="text-lg text-blue-100">Hỗ trợ nhanh</p>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-yellow-400 mb-2">100%</div>
                <p className="text-lg text-blue-100">Chính hãng</p>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-yellow-400 mb-2">36</div>
                <p className="text-lg text-blue-100">Tháng bảo hành</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-lg font-medium transition-all duration-300 rounded-xl ${
                  activeTab === tab.id
                    ? "text-gray-800 bg-white shadow-lg border border-gray-200 transform scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-md hover:scale-105"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Policy Tab */}
          {activeTab === "policy" && (
            <div className="space-y-8">
              {/* Warranty Conditions - 2 cột song song */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle size={24} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Điều Kiện Bảo Hành</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Sản phẩm còn trong thời hạn bảo hành</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Có hóa đơn mua hàng và tem bảo hành hợp lệ</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Lỗi do nhà sản xuất, không do tác động bên ngoài</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Sản phẩm chưa bị tháo dỡ, sửa chữa bởi bên thứ 3</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <XCircle size={24} className="text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Không Áp Dụng Bảo Hành</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Hư hỏng do rơi vỡ, ngâm nước, cháy nổ</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Sử dụng sai mục đích, quá tải</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Tự ý tháo dỡ, sửa chữa</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Hết thời hạn bảo hành</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Product Warranty Durations - 3 card ngang */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Thời Gian Bảo Hành Theo Sản Phẩm</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="text-4xl font-bold text-blue-600 mb-2">36 tháng</div>
                    <div className="text-lg font-semibold text-gray-800 mb-1">Laptop Gaming</div>
                    <div className="text-sm text-gray-600">Bảo hành toàn diện</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="text-4xl font-bold text-green-600 mb-2">24 tháng</div>
                    <div className="text-lg font-semibold text-gray-800 mb-1">Laptop Văn Phòng</div>
                    <div className="text-sm text-gray-600">Bảo hành chính hãng</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="text-4xl font-bold text-purple-600 mb-2">12 tháng</div>
                    <div className="text-lg font-semibold text-gray-800 mb-1">Phụ Kiện</div>
                    <div className="text-sm text-gray-600">Bảo hành cơ bản</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lookup Tab */}
          {activeTab === "lookup" && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Search Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Tra Cứu Thông Tin Bảo Hành</h3>
                <p className="text-gray-600 mb-6">Nhập số serial hoặc mã sản phẩm để kiểm tra tình trạng bảo hành</p>
                
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    placeholder="Nhập số serial sản phẩm..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Search size={20} />
                    Tra Cứu
                  </button>
                </div>
                
                <p className="text-sm text-gray-500 mt-3">
                  Số serial thường được in trên nhãn dán ở mặt dưới laptop
                </p>
              </div>

              {/* Search Results */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Kết Quả Tra Cứu</h3>
                
                {searchResult ? (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <CheckCircle size={24} className="text-green-600 mr-3" />
                        <span className="text-lg font-semibold text-green-800">Sản phẩm còn bảo hành</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Tên sản phẩm:</p>
                          <p className="font-semibold text-gray-800">{searchResult.productName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Số serial:</p>
                          <p className="font-semibold text-gray-800">{searchResult.serialNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Ngày mua:</p>
                          <p className="font-semibold text-gray-800">{searchResult.purchaseDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Hết hạn bảo hành:</p>
                          <p className="font-semibold text-gray-800">{searchResult.warrantyExpiry}</p>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-blue-800 font-semibold">
                          Còn {searchResult.remainingDays} ngày bảo hành
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shield size={64} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      Vui lòng nhập số serial để tra cứu thông tin bảo hành
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Process Tab */}
          {activeTab === "process" && (
            <div className="max-w-6xl mx-auto space-y-12">
              {/* Warranty Process */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-800 text-center mb-4">Quy Trình Bảo Hành</h3>
                <p className="text-xl text-gray-600 text-center mb-12">4 bước đơn giản để thực hiện bảo hành sản phẩm</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Liên Hệ</h4>
                    <p className="text-gray-600">Gọi hotline hoặc đến trực tiếp cửa hàng</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Kiểm Tra</h4>
                    <p className="text-gray-600">Kỹ thuật viên kiểm tra và báo giá</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Sửa Chữa</h4>
                    <p className="text-gray-600">Thực hiện sửa chữa hoặc thay thế</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Giao Hàng</h4>
                    <p className="text-gray-600">Giao sản phẩm và bảo hành mở rộng</p>
                  </div>
                </div>
              </div>

              {/* Processing Time */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-8">Thời Gian Xử Lý</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Lỗi phần mềm</span>
                    <span className="text-blue-600 font-semibold">1-2 giờ</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Thay thế linh kiện có sẵn</span>
                    <span className="text-green-600 font-semibold">1-3 ngày</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Đặt hàng linh kiện</span>
                    <span className="text-orange-600 font-semibold">5-10 ngày</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-gray-700 font-medium">Gửi hãng bảo hành</span>
                    <span className="text-red-600 font-semibold">15-30 ngày</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-8">Thông Tin Liên Hệ</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Phone size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Hotline Bảo Hành</p>
                        <p className="text-lg font-semibold text-gray-800">1900 1234</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <Mail size={24} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email Hỗ Trợ</p>
                        <p className="text-lg font-semibold text-gray-800">support@techlap.vn</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <MapPin size={24} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Địa Chỉ</p>
                        <p className="text-lg font-semibold text-gray-800">123 Nguyễn Văn Cừ, Q.1, TP.HCM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                        <Clock size={24} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Giờ Làm Việc</p>
                        <p className="text-lg font-semibold text-gray-800">8:00 - 22:00 (Thứ 2 - Chủ Nhật)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Request Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-8">Gửi Yêu Cầu Hỗ Trợ</h3>
                  
                  <form onSubmit={handleSupportSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                      <input
                        type="text"
                        value={supportForm.fullName}
                        onChange={(e) => setSupportForm({...supportForm, fullName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                      <input
                        type="tel"
                        value={supportForm.phone}
                        onChange={(e) => setSupportForm({...supportForm, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={supportForm.email}
                        onChange={(e) => setSupportForm({...supportForm, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số serial sản phẩm</label>
                      <input
                        type="text"
                        value={supportForm.serialNumber}
                        onChange={(e) => setSupportForm({...supportForm, serialNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả vấn đề</label>
                      <textarea
                        value={supportForm.description}
                        onChange={(e) => setSupportForm({...supportForm, description: e.target.value})}
                        rows={4}
                        placeholder="Mô tả vấn đề..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                    >
                      Gửi Yêu Cầu
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarrantyPage;
