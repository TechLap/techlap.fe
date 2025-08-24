import { Truck, Shield, ArrowPath, HandThumbUp } from "../common/icons";

const FeaturesSection = () => {
    return (
            <div className="container mx-auto px-4 py-10 bg-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-10 flex justify-center">
                    Tại sao nên chọn chúng tôi?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-md shadow-md p-6 flex flex-col items-center justify-center">
                        <Truck className="mb-4 text-green-700" size={36} />
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Giao hàng nhanh chóng
                        </h3>
                        <p className="text-gray-600 text-center">
                        Giao hàng trong ngày với khu vực nội thành, đảm bảo nhiệt độ tối ưu
                        </p>
                    </div>
                    <div className="bg-white rounded-md shadow-md p-6 flex flex-col items-center justify-center">
                        <Shield className="mb-4 text-green-700" size={32} />
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Chất lượng đảm bảo
                        </h3>
                        <p className="text-gray-600 text-center">
                        Thực phẩm tươi ngon, đông lạnh theo tiêu chuẩn HACCP
                        </p>
                    </div>
                    <div className="bg-white rounded-md shadow-md p-6 flex flex-col items-center justify-center">
                        <ArrowPath className="mb-4 text-green-700" size={32} />
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Đổi trả dễ dàng
                        </h3>
                        <p className="text-gray-600 text-center">
                        Hoàn tiền 100% nếu sản phẩm không đúng chất lượng cam kết
                        </p>
                    </div>
                    <div className="bg-white rounded-md shadow-md p-6 flex flex-col items-center justify-center">
                        <HandThumbUp className="mb-4 text-green-700" size={32} />
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Phục vụ tận tâm
                        </h3>
                        <p className="text-gray-600 text-center">
                        Đội ngũ tư vấn viên hỗ trợ khách hàng 24/7
                        </p>
                    </div>
                </div>
            </div>
    )
}

export default FeaturesSection;