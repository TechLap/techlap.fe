import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const ContactPage = () => {
  const position = [10.797308750588888, 106.62578988118244] as [number, number];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Liên hệ với <span className="text-yellow-400">TechLap</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn tìm kiếm laptop gaming hoàn hảo. Hãy liên hệ ngay để được tư vấn miễn phí!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form & Info Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Gửi tin nhắn</h2>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      placeholder="Nhập họ và tên của bạn"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      placeholder="0123 456 789"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                      Chủ đề
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      placeholder="Tư vấn laptop gaming"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                    Nội dung *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                    placeholder="Mô tả chi tiết nhu cầu của bạn về laptop gaming..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Gửi tin nhắn
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white border border-blue-200 p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Thông tin liên hệ</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Địa chỉ</h3>
                      <p className="text-gray-600">
                        179/58/16 Lê Đình Thám, Tân Quý
                        <br />
                        Tân Phú, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Hotline</h3>
                      <p className="text-gray-600">
                        0999999999 (Miễn phí)
                        <br />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">
                        bonanhemsieunhan@gmail.com
                        <br />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Giờ làm việc</h3>
                      <p className="text-gray-600">
                        Thứ 2 - Chủ nhật: 8:00 - 17:00
                        <br />
                        Hỗ trợ online 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Cần Tư Vấn Ngay?</h3>
                <p className="text-blue-100 mb-6">
                  Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn tìm kiếm laptop gaming phù hợp nhất.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-3 rounded-lg transition-colors flex-1 flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Gọi Ngay
                  </button>
                  <button className="border border-white text-white hover:bg-white hover:text-blue-700 px-4 py-3 rounded-lg transition-colors flex-1">
                    Chat Zalo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Bản Đồ</h2>
            <p className="text-gray-600">Tìm đường đến TechLap</p>
          </div>

          <div className="bg-white border border-blue-200 p-8 rounded-2xl shadow-lg">
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <MapContainer
                style={{ width: "100%", height: "100%", zIndex: 0 }}
                center={position}
                zoom={16}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    <div className="text-sm">
                      <strong>TechLap</strong><br />
                      179/58/16 Lê Đình Thám, Tân Quý<br />
                      Tân Phú, TP. Hồ Chí Minh
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Câu Hỏi Thường Gặp</h2>
            <p className="text-gray-600">Những thắc mắc phổ biến từ khách hàng</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-blue-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-semibold text-gray-800 mb-3">Thời gian bảo hành laptop?</h3>
              <p className="text-gray-600 text-sm">
                Tất cả laptop tại TechLap đều được bảo hành chính hãng từ 12-36 tháng tùy theo từng dòng sản phẩm.
              </p>
            </div>

            <div className="bg-white border border-blue-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-semibold text-gray-800 mb-3">Có hỗ trợ trả góp không?</h3>
              <p className="text-gray-600 text-sm">
                Có, chúng tôi hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng và các công ty tài chính uy tín.
              </p>
            </div>

            <div className="bg-white border border-blue-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-semibold text-gray-800 mb-3">Có giao hàng toàn quốc?</h3>
              <p className="text-gray-600 text-sm">
                Có, chúng tôi giao hàng miễn phí toàn quốc cho đơn hàng từ 10 triệu đồng trở lên.
              </p>
            </div>

            <div className="bg-white border border-blue-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-semibold text-gray-800 mb-3">Có thể đổi trả sản phẩm?</h3>
              <p className="text-gray-600 text-sm">
                Hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất hoặc không đúng mô tả.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
