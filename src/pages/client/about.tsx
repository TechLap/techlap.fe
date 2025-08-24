import { Shield, Star, Truck, Users } from "../../components/common/icons";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Về Tân Xuân Food</h1>
        <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed">
          Với hơn 10 năm kinh nghiệm trong ngành thực phẩm đông lạnh, Tân Xuân
          Food tự hào là đối tác tin cậy của hàng nghìn gia đình Việt Nam, mang
          đến những sản phẩm chất lượng cao với giá cả hợp lý.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="text-justify border border-gray-200 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Sứ mệnh</h2>
          <p className="text-gray-500 text-base max-w-3xl mx-auto leading-relaxed">
            Chúng tôi cam kết cung cấp thực phẩm đông lạnh chất lượng cao, an
            toàn và tiện lợi, giúp mọi gia đình có được những bữa ăn ngon và bổ
            dưỡng mỗi ngày.
          </p>
        </div>
        <div className="text-justify border border-gray-200 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Tầm nhìn</h2>
          <p className="text-gray-500 text-base max-w-3xl mx-auto leading-relaxed">
            Tân Xuân Food mong muốn trở thành một trong những thương hiệu thực
            phẩm đông lạnh hàng đầu Việt Nam, đem đến cho khách hàng những sản
            phẩm chất lượng cao và giá cả hợp lý.
          </p>
        </div>
      </div>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-10">Giá trị cốt lõi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center gap-2">
            <Shield
              size={40}
              className="rounded-full bg-green-700 text-white p-2"
            />
            <h3 className="text-lg font-medium">Chất lượng</h3>
            <p className="text-gray-500 text-sm max-w-3xl mx-auto leading-relaxed">
              Cam kết cung cấp sản phẩm đạt tiêu chuẩn chất lượng cao nhất
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Truck
              size={40}
              className="rounded-full bg-green-700 text-white p-2"
            />
            <h3 className="text-lg font-medium">Giao hàng</h3>
            <p className="text-gray-500 text-sm max-w-3xl mx-auto leading-relaxed">
              Hệ thống giao hàng nhanh chóng và đảm bảo chuỗi lạnh tuyệt đối
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Star
              size={40}
              className="rounded-full bg-green-700 text-white p-2"
            />
            <h3 className="text-lg font-medium">Uy tín</h3>
            <p className="text-gray-500 text-sm max-w-3xl mx-auto leading-relaxed">
              Xây dựng niềm tin qua nhiều năm phục vụ khách hàng
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Users
              size={40}
              className="rounded-full bg-green-700 text-white p-2"
            />
            <h3 className="text-lg font-medium">Phục vụ</h3>
            <p className="text-gray-500 text-sm max-w-3xl mx-auto leading-relaxed">
              Đặt sự hài lòng của khách hàng lên hàng đầu
            </p>
          </div>
        </div>
      </div>
      <div className="text p-4 border border-gray-200 rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-8 mt-4">
          Câu chuyện của chúng tôi
        </h2>
        <div className="max-w-none prose prose-lg prose-p:text-gray-500 prose-p:text-base prose-p:leading-relaxed prose-p:mb-4">
        <p>
          Tân Xuân Food được thành lập vào năm 2013 với mong muốn mang đến cho
          các gia đình Việt Nam những sản phẩm thực phẩm đông lạnh chất lượng
          cao, an toàn và tiện lợi.
        </p>
        <p>
          Bắt đầu từ một cửa hàng nhỏ tại TP.HCM, chúng tôi đã không ngừng
          phát triển và mở rộng mạng lưới phân phối trên toàn quốc. Hiện tại,
          Tân Xuân Food phục vụ hơn 50,000 khách hàng với hơn 1,000 sản phẩm
          đa dạng từ thịt, hải sản, rau củ...
        </p>
        <p>
          Chúng tôi tự hào về hệ thống kho lạnh hiện đại, quy trình kiểm soát
            chất lượng nghiêm ngặt và đội ngũ nhân viên chuyên nghiệp, luôn sẵn
            sàng phục vụ khách hàng 24/7.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold text-green-700">10+</span>
          <p className="text-gray-500">Năm kinh nghiệm</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold text-green-700">50K+</span>
          <p className="text-gray-500">Khách hàng tin dùng</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold text-green-700">1K+</span>
          <p className="text-gray-500">Sản phẩm đa dạng</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold text-green-700">24/7</span>
          <p className="text-gray-500">Hỗ trợ khách hàng</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
