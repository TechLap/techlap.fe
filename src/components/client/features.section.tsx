import { Truck, Shield, ArrowPath, HandThumbUp } from "../common/icons";

const FeaturesSection = () => {
    return (
            <div className="container mx-auto px-4 py-10 bg-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-10 flex justify-center">
                    Tại sao nên chọn chúng tôi?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-md shadow-md p-6 flex flex-col items-center justify-center">
                        <Truck className="mb-4 text-red-600" size={36} />
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Giao hàng an toàn
                        </h3>
                        <p className="text-gray-600 text-center">
                        Đóng gói cẩn thận, bảo đảm laptop nguyên vẹn khi đến tay bạn
                        </p>
                    </div>
                    <div className="bg-white rounded-md shadow-md p-6 flex flex-col items-center justify-center">
                        <Shield className="mb-4 text-red-600" size={32} />
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Sản phẩm chính hãng
                        </h3>
                        <p className="text-gray-600 text-center">
                        Cam kết laptop 100% chính hãng, đầy đủ bảo hành từ nhà sản xuất
                        </p>
                    </div>
                    <div className="bg-white rounded-md shadow-md p-6 flex flex-col items-center justify-center">
                        <ArrowPath className="mb-4 text-red-600" size={32} />
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Bảo hành toàn diện
                        </h3>
                        <p className="text-gray-600 text-center">
                        Hỗ trợ bảo hành nhanh chóng, đổi trả theo chính sách hãng
                        </p>
                    </div>
                    <div className="bg-white rounded-md shadow-md p-6 flex flex-col items-center justify-center">
                        <HandThumbUp className="mb-4 text-red-600" size={32} />
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Hỗ trợ kỹ thuật 24/7
                        </h3>
                        <p className="text-gray-600 text-center">
                        Tư vấn cấu hình, cài đặt phần mềm, hỗ trợ từ xa mọi lúc
                        </p>
                    </div>
                </div>
            </div>
    )
}

export default FeaturesSection;