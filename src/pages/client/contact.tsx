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
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Liên hệ với chúng tôi</h1>
        <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn với mọi thắc mắc về sản phẩm và
          dịch vụ
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="border border-gray-200 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Gửi tin nhắn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
              <label htmlFor="name" className="text-sm font-medium">
                Tên
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-200 p-2 rounded-lg text-sm"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-200 p-2 rounded-lg text-sm"
                placeholder="your@email.com"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                className="border border-gray-200 p-2 rounded-lg text-sm"
                placeholder="0123 456 789"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Chủ đề
              </label>
              <input
                type="text"
                id="subject"
                className="border border-gray-200 p-2 rounded-lg text-sm"
                placeholder="Chủ đề liên hệ"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <label htmlFor="message" className="text-sm font-medium">
                Nội dung
              </label>
              <textarea
                id="message"
                className="border border-gray-200 p-2 rounded-lg text-sm"
                placeholder="Mô tả chi tiết nội dung bạn muốn liên hệ..."
              />
            </div>
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium col-span-2 hover:bg-green-800 transition-colors">
              Gửi tin nhắn
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Thông tin liên hệ</h2>
            <div className="flex flex-row gap-4 text-base items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-9 shrink-0 text-green-700 rounded-md bg-green-100 p-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <div className="flex flex-col">
                <div className="text-base font-medium">Địa chỉ</div>
                <div className="text-sm text-gray-500">
                  179/58/16 Lê Đình Thám, Tân Quý, Tân Phú, TP. HCM
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 text-base items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-9 shrink-0 text-green-700 rounded-md bg-green-100 p-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              <div className="flex flex-col">
                <div className="text-base font-medium">Hotline</div>
                <div className="text-sm text-gray-500">0394494821394494821</div>
              </div>
            </div>
            <div className="flex flex-row gap-4 text-base items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-9 shrink-0 text-green-700 rounded-md bg-green-100 p-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <div className="flex flex-col">
                <div className="text-base font-medium">Email</div>
                <div className="text-sm text-gray-500">
                  quocbui2110@gmail.com
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 text-base items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-9 shrink-0 text-green-700 rounded-md bg-green-100 p-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <div className="flex flex-col">
                <div className="text-base font-medium">Giờ làm việc</div>
                <div className="text-sm text-gray-500">
                  Thứ Hai - Chủ nhật: 8:00 - 17:00
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 p-8 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Bản đồ</h3>
            <div className="w-full h-[300px]">
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
                    <div className="text-sm text-gray-500">
                      179/58/16 Lê Đình Thám, Tân Quý, Tân Phú, TP. HCM
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
