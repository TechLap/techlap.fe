import { useNavigate } from "react-router-dom";
import { ChevronRight } from "../common/icons";
import { useQuery } from "@tanstack/react-query";
import { apiFetchAllCategory } from "../../config/api";
import { useEffect } from "react";



const imageMap: Record<number, string> = {
  1: "/images/CategoriesShowcase/laptop-mong-nhe.jpg",
  2: "/images/CategoriesShowcase/laptop-gaming.jpg",
  3: "/images/CategoriesShowcase/laptop-do-hoa.jpg",
  4: "/images/CategoriesShowcase/laptop-van-phong.jpg",
};

const CategoryShowcase = () => {
  const { data: categories } = useQuery({
    queryKey: ["fetchAllCategories"],
    queryFn: () => apiFetchAllCategory(`page=1&size=20`),
  });

  const categoriesWithImage = categories?.data.data?.result.map((c: any) => ({
    ...c,
    image: imageMap[c.id] || "/images/default.jpg", // fallback nếu không có
  }));

  const navigate = useNavigate()
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-10 flex justify-center">
        Khám phá danh mục sản phẩm
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoriesWithImage?.map((category: any) => (
          <div
            key={category.id}
            className="bg-white rounded-md shadow-md relative overflow-hidden group transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-72 object-cover rounded-md"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-white text-xl font-bold">{category.name}</h3>
              <button
                className="bg-white/40 text-white font-semibold px-4 py-2 rounded-md mt-4 text-sm flex items-center gap-2 hover:bg-white/100 hover:text-red-600 transition-all duration-300"
                onClick={() => { navigate(`products?categoryId=${category.id}`) }}
              >
                Khám phá ngay
                <ChevronRight size={14} className="font-bold" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryShowcase;
