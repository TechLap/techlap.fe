const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 h-full grid grid-cols-1 md:grid-cols-2 md:py-20 py-12 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h1 className="md:text-5xl text-3xl font-bold mb-4">
            Laptop Gaming{" "}
            <span className="text-yellow-400">Hiệu năng cao</span>
          </h1>
          <p className="text-lg ">
            Khám phá bộ sưu tập laptop gaming mới nhất với cấu hình mạnh mẽ, giá cả cạnh tranh và bảo hành chính hãng.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600">
              Xem sản phẩm
            </button>
            <button className="bg-blue-600 text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-600">
              Đặt hàng ngay
            </button>
          </div>
          <div className="flex gap-6 items-center mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">500+</div>
              <div className="text-sm opacity-80">Sản phẩm</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">24h</div>
              <div className="text-sm opacity-80">Giao hàng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">100%</div>
              <div className="text-sm opacity-80">Chính hãng</div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="w-full bg-white rounded-lg shadow-md">
            <div data-hs-carousel='{
                "loadingClasses": "opacity-0",
                "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer",
                "isAutoPlay": true
              }' className="relative">
              <div className="hs-carousel relative overflow-hidden w-full aspect-square bg-white rounded-lg">
                <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                  <div className="hs-carousel-slide">
                    <img
                      src="/images/banners/banner0.jpg"
                      alt="frozen food table arrangement"
                      className="rounded-lg shadow-lg object-contain w-full h-full"
                    />
                  </div>
                  <div className="hs-carousel-slide">
                    <img
                      src="/images/banners/banner1.jpg"
                      alt="frozen food table arrangement"
                      className="rounded-lg shadow-lg object-cover w-full"
                    />
                  </div>
                  <div className="hs-carousel-slide">
                    <img
                      src="/images/banners/banner2.jpg"
                      alt="frozen food table arrangement"
                      className="rounded-lg shadow-lg object-cover w-full"
                    />
                  </div>
                  <div className="hs-carousel-slide">
                    <img
                      src="/images/banners/banner3.jpg"
                      alt="frozen food table arrangement"
                      className="rounded-lg shadow-lg object-cover w-full"
                    />
                  </div>
                  <div className="hs-carousel-slide">
                    <img
                      src="/images/banners/banner4.jpg"
                      alt="frozen food table arrangement"
                      className="rounded-lg shadow-lg object-cover w-full"
                    />
                  </div>
                </div>
              </div>



              <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
