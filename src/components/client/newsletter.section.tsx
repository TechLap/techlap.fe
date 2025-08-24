const NewsletterSection = () => {
  return (
    <div className="bg-green-50 py-10">
    <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Đăng ký nhận tin
            </h2>
            <p className="text-gray-600 mb-4 text-center">
                Nhận thông tin và khuyến mãi mới nhất từ chúng tôi
            </p>
            <div className="flex justify-center gap-4 mb-4 flex-col sm:flex-row">
                <input type="email" placeholder="Nhập email của bạn" className="w-full max-w-md p-2 rounded-md border border-gray-300" />
                <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-900">
                    Đăng ký
                </button>
            </div>
            <p className="text-gray-600 text-sm text-center">
                Chúng tôi cam kết bảo mật thông tin của bạn và không gửi spam
            </p>
        </div>
    </div>
  )
};

export default NewsletterSection;