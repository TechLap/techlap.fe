import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { NavLink, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/common/card";
import {
  ArrowPath,
  Heart,
  Shield,
  Star,
  Truck,
} from "../../../../components/common/icons";
import Cart from "../../../../components/common/icons/cart";
import InputNumber from "../../../../components/common/input.number";
import LoadingSpinner from "../../../../components/common/loading.spinner";
import {
  Tabs,
  TabsContent,
  TabsItem,
  TabsList,
} from "../../../../components/common/tabs";
import { apiFetchProductById } from "../../../../config/api";

const ProductDetailPage = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => apiFetchProductById(id || ""),
    enabled: !!id,
  });

  useEffect(() => {
    if (product) {
      window.HSStaticMethods.autoInit(["tabs", "input-number"]);
    }
  }, [product]);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !product?.data?.data)
    return (
      <div className="text-center mt-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Không tìm thấy sản phẩm
        </h1>
        <p className="text-gray-600 mb-6">
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <NavLink
          to="/products"
          className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
        >
          ← Quay lại trang sản phẩm
        </NavLink>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <NavLink to="/" className="text-gray-500 hover:text-gray-700">
          Trang chủ
        </NavLink>
        <span className="mx-2 text-gray-500">/</span>
        <NavLink to="/products" className="text-gray-500 hover:text-gray-700">
          Sản phẩm
        </NavLink>
        <span className="mx-2 text-gray-500">/</span>
        <span
          className="font-semibold text-gray-800 truncate"
          aria-current="page"
        >
          {product.data.data?.name}
        </span>
      </nav>

      {/* Product detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-8 lg:col-span-2">
          {/* Product image section */}
          <Card className="border-none shadow-xl hover:shadow-md transition-shadow">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={`${process.env.REACT_APP_URL_STORAGE_FILE}/${product.data.data?.image}`}
                  alt={product.data.data?.name}
                  className="w-full h-[450px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>

              <div className="absolute top-4 left-4 z-10">
                <span className="text-white px-2 py-1 rounded-md text-sm bg-amber-500 font-medium backdrop-blur-sm">
                  Bán chạy
                </span>
              </div>

              <div className="absolute top-4 right-4 z-10">
                <button className="bg-red-50 rounded-full p-2 hover:bg-red-100 transition-colors backdrop-blur-sm">
                  <Heart
                    size={20}
                    color="black"
                    className="hover:fill-red-500 hover:stroke-red-500 hover:scale-110"
                  />
                </button>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-white/50 to-white/10">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Ảnh sản phẩm chính thức
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-green-700"></div>
                  <span className="text-xs text-green-700">Chất lượng HD</span>
                  <div className="w-2 h-2 rounded-full animate-pulse bg-green-700"></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Card className="border-none shadow-xl hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <Tabs className="w-full">
                <TabsList className="grid grid-cols-4 w-full h-12 bg-gray-100 mb-8">
                  <TabsItem id="description" title="Mô tả" active />
                  <TabsItem id="parameter" title="Thông số" />
                  <TabsItem id="review" title="Đánh giá" />
                  <TabsItem id="delivery" title="Vận chuyển" />
                </TabsList>
                <TabsContent id="description">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">Mô tả chi tiết</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {product.data.data?.description}
                    </p>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      <div>
                        <span className="text-green-700 text-base font-semibold">
                          Ưu điểm nổi bật
                        </span>
                        <ul className="space-y-2 text-gray-600 text-base mt-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            Chất lượng cao cấp, đảm bảo an toàn
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            Bảo quản trong điều kiện lạnh -18°C
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            Giữ nguyên hương vị và dinh dưỡng
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            Tiện lợi, sẵn sàng chế biến
                          </li>
                        </ul>
                      </div>
                      <div>
                        <span className="text-green-700 text-base font-semibold">
                          Cách bảo quản
                        </span>
                        <ul className="space-y-2 text-gray-600 text-base mt-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            Bảo quản ở -18°C trong tủ đông
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            Không rã đông và đông lại nhiều lần
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            Sử dụng trong vòng 6-12 tháng
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            Rã đông tự nhiên trước khi chế biến
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent id="parameter" className="hidden">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">Thông số kỹ thuật</h3>
                    <div className="grid gap-4">
                      {[
                        {
                          label: "Danh mục",
                          value: product?.data.data?.category?.name,
                        },
                        // {
                        //   label: "Thương hiệu",
                        //   value: product?.data.data?.supplier?.name,
                        // },
                        { label: "Xuất xứ", value: "Việt Nam" },
                        {
                          label: "Hạn sử dụng",
                          value: "12 tháng kể từ ngày sản xuất",
                        },
                        {
                          label: "Nhiệt độ bảo quản",
                          value: "-18°C đến -20°C",
                        },
                        { label: "Đóng gói", value: "Túi PA/PE chân không" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center border-b py-3 border-b-gray-200"
                        >
                          <span className="text-gray-600 text-base font-medium w-1/3">
                            {item.label}:
                          </span>
                          <span className="text-gray-600 text-base flex-1">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent id="review" className="hidden">
                  <div>Đánh giá</div>
                </TabsContent>
                <TabsContent id="delivery" className="hidden">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">Chính sách vận chuyển</h3>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Truck size={24} className="text-green-700" />
                            Giao hàng miễn phí
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-base">
                            Miễn phí vận chuyển cho đơn hàng từ 500.000₫ trong
                            nội thành và từ 1.000.000₫ cho các tỉnh thành khác.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Shield size={24} className="text-green-700" />
                            Đảm bảo chất lượng
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-base">
                            Sản phẩm được vận chuyển trong xe lạnh chuyên dụng,
                            đảm bảo chuỗi lạnh không bị gián đoạn.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <span className="text-base font-medium">
                      Thời gian giao hàng:
                    </span>
                    <div className="grid gap-4">
                      {[
                        {
                          label: "Nội thành TP.HCM:",
                          value: "1-2 giờ",
                        },
                        {
                          label: "Các quận ngoại thành:",
                          value: "4-6 giờ",
                        },
                        {
                          label: "Các tỉnh thành lân cận (miền Tây):",
                          value: "1-2 ngày",
                        },
                        {
                          label: "Các tỉnh thành khác (từ Nghệ An đổ vào):",
                          value: "2-3 ngày",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between border-b pb-3 border-b-gray-200"
                        >
                          <span className="text-gray-600 text-base">
                            {item.label}
                          </span>
                          <span
                            className={` text-base font-medium ${
                              item.value === "1-2 giờ"
                                ? "text-green-700"
                                : "text-gray-600"
                            }`}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <Card className="border-none shadow-xl hover:shadow-md transition-shadow">
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      {product.data.data?.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="text-amber-300"
                            fill="currentColor"
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">
                        (4.5) • 125 đánh giá
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-green-700 text-2xl font-bold">
                          <NumericFormat
                            value={product.data.data?.price}
                            displayType="text"
                            allowLeadingZeros
                            thousandSeparator={true}
                            suffix={"đ"}
                          />
                        </span>
                        <span className="text-green-700 text-base">
                          {/* /({product.data.data?.unit}) */}
                        </span>
                      </div>
                      <span className="text-gray-500 text-lg line-through">
                        <NumericFormat
                          value={product.data.data?.price * 0.8}
                          displayType="text"
                          allowLeadingZeros
                          thousandSeparator={true}
                          suffix={"đ"}
                        />
                      </span>
                    </div>
                    {/* Promote sale */}
                    <div className="bg-green-50 text-green-700 p-3 rounded-lg border border-green-200">
                      <span className="font-medium">
                        🎉 Tiết kiệm{" "}
                        <NumericFormat
                          value={
                            product.data.data?.price -
                            product.data.data?.price * 0.8
                          }
                          displayType="text"
                          allowLeadingZeros
                          thousandSeparator={true}
                          suffix={"đ"}
                        />
                      </span>
                    </div>
                    <div className="flex items-center gap-2"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 text-base font-medium">
                        Số lượng:
                      </span>
                      <div className="flex items-center gap-2">
                        <InputNumber />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <button className="bg-green-700 text-white font-medium text-sm px-4 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-green-800 transition-colors">
                        <Cart size={16} className="text-white" />
                        Thêm vào giỏ hàng
                      </button>
                      <button className="bg-gray-200 font-medium text-sm px-4 py-3 rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors">
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-base font-medium mb-4">Ưu đãi & Dịch vụ</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-3">
                    <div className="bg-green-100 rounded-full p-2">
                      <Truck size={24} className="text-green-700" />
                    </div>
                    <div className="text-gray-700 text-sm flex flex-col">
                      <span className="font-medium">Miễn phí vận chuyển</span>
                      <span className="text-gray-500 text-sm">
                        Đơn từ 500.000đ
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <Shield size={24} className="text-blue-700" />
                    </div>
                    <div className="text-sm flex flex-col">
                      <span className="font-medium text-gray-700">
                        Đảm bảo chất lượng
                      </span>
                      <span className="text-gray-500">Hoàn tiền 100%</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="bg-amber-100 rounded-full p-2">
                      <ArrowPath size={24} className="text-amber-700" />
                    </div>
                    <div className="text-sm flex flex-col">
                      <span className="font-medium text-gray-700">
                        Đổi trả dễ dàng
                      </span>
                      <span className="text-gray-500">Trong vòng 30 ngày</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailPage;
