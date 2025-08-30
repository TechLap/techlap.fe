import { Shield, Star, Truck, Users } from "../../components/common/icons";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Về <span className="text-yellow-400">TechLap</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed" style={{ wordBreak: 'keep-all', hyphens: 'none' }}>
              Với 8 năm kinh nghiệm trong lĩnh vực công nghệ, TechLap tự hào là đối tác tin cậy của hàng nghìn khách hàng trên toàn quốc, mang đến những sản phẩm laptop chất lượng cao với giá  hợp lý.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Sứ mệnh</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Cung cấp các sản phẩm laptop và phụ kiện công nghệ chất lượng cao với giá cả hợp lý, đồng thời mang đến trải nghiệm mua sắm tuyệt vời và dịch vụ hỗ trợ tận tâm cho mọi khách hàng.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Tầm nhìn</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Trở thành thương hiệu hàng đầu Việt Nam trong lĩnh vực phân phối laptop và thiết bị công nghệ, được khách hàng tin tưởng và lựa chọn số một khi có nhu cầu về công nghệ.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Giá trị cốt lõi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những nguyên tắc định hướng mọi hoạt động của chúng tôi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Chất lượng</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Cam kết cung cấp sản phẩm chính hãng, chất lượng cao từ các thương hiệu uy tín
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Giao hàng</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Hệ thống giao hàng nhanh chóng và đảm bảo chất lượng sản phẩm trong quá trình vận chuyển
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Uy tín</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Xây dựng niềm tin qua từng giao dịch với sự minh bạch và trách nhiệm
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Tận tâm</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Luôn lắng nghe và đặt lợi ích khách hàng lên hàng đầu trong mọi quyết định
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Câu chuyện của chúng tôi</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-blue-100">
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  TechLap được thành lập vào năm 2016 bởi một nhóm những người đam mê công nghệ, với mong muốn mang đến cho người Việt Nam những sản phẩm laptop chất lượng cao với giá cả phải chăng.
                </p>
                <p>
                  Từ một cửa hàng nhỏ với vài chục sản phẩm, chúng tôi đã không ngừng phát triển và mở rộng. Hiện tại, TechLap sở hữu hệ thống phân phối rộng khắp với hơn 500 mẫu laptop đa dạng.
                </p>
                <p>
                  Với đội ngũ nhân viên giàu kinh nghiệm và tận tâm, chúng tôi tự hào đã phục vụ hơn 25,000 khách hàng và trở thành một trong những thương hiệu uy tín hàng đầu trong ngành.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Thành tựu của chúng tôi</h2>
            <p className="text-blue-100 text-xl">Những con số ấn tượng trong hành trình phát triển</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">8+</div>
              <p className="text-blue-100 text-lg">Năm kinh nghiệm</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">25K+</div>
              <p className="text-blue-100 text-lg">Khách hàng tin tưởng</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">500+</div>
              <p className="text-blue-100 text-lg">Sản phẩm đa dạng</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">24/7</div>
              <p className="text-blue-100 text-lg">Hỗ trợ khách hàng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
