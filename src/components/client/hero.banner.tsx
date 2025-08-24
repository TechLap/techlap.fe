const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100">
      <div className="container mx-auto px-4 h-full grid grid-cols-1 md:grid-cols-2 md:py-20 py-12 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h1 className="md:text-5xl text-3xl font-bold text-gray-800 mb-4">
            Thực phẩm đông lạnh{" "}
            <span className="text-green-700">chất lượng cao</span>
          </h1>
          <p className="text-lg text-gray-600">
            Đa dạng sản phẩm đông lạnh, giao hàng nhanh chóng trong ngày với cam
            kết bảo quản nhiệt độ tối ưu
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-900">
              Xem sản phẩm
            </button>
            <button className="bg-white text-green-700 border border-green-700 px-4 py-2 rounded-md hover:bg-green-50">
              Đặt hàng ngay
            </button>
          </div>
          <div className="flex gap-6 items-center mt-8">
            <div>
              <span className="text-green-700 text-2xl font-bold block">
                500+
              </span>
              <span className="text-gray-600 text-lg">Sản phẩm</span>
            </div>
            <div className="w-px h-8 bg-gray-400"></div>
            <div>
              <span className="text-green-700 text-2xl font-bold block">
                24h
              </span>
              <span className="text-gray-600 text-lg">Giao hàng</span>
            </div>
            <div className="w-px h-8 bg-gray-400"></div>
            <div>
              <span className="text-green-700 text-2xl font-bold block">
                100%
              </span>
              <span className="text-gray-600 text-lg">Hài lòng</span>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <img
            src="/images/frozen-food-table-arrangement.jpg"
            alt="frozen food table arrangement"
            className="rounded-lg shadow-lg md:max-h-96 max-h-80 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
