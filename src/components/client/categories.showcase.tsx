import { ChevronRight } from "../common/icons";

const categories = [
  {
    id: 1,
    name: "Thịt đông lạnh",
    image: "/images/CategoriesShowcase/frozen-beef.jpg",
  },
  {
    id: 2,
    name: "Hải sản đông lạnh",
    image: "/images/CategoriesShowcase/frozen-seafood.jpg",
  },
  {
    id: 3,
    name: "Rau củ đông lạnh",
    image: "/images/CategoriesShowcase/frozen-vegetable.jpg",
  },
];

const CategoryShowcase = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-10 flex justify-center">
        Khám phá danh mục sản phẩm
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
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
              <button className="bg-white/40 text-white font-semibold px-4 py-2 rounded-md mt-4 text-sm flex items-center gap-2 hover:bg-white/100 hover:text-green-700 transition-all duration-300">
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
