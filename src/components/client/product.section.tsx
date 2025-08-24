import { NavLink } from "react-router-dom";
import ProductCard from "./card/product.card";

interface ProductSectionProps {
  title: string;
  subtitle: string;
}

const ProductSection = ({ title, subtitle }: ProductSectionProps) => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <NavLink
            to="/products"
            className="text-green-700 hover:text-green-900 flex items-center font-medium"
          >
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </NavLink>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 items-stretch">
          <ProductCard
            image="/images/sample-product-section.jpg"
            name="Sample Product"
            price={100000}
            description="Sample description"
            isNew={true}
            categoryName="Sample category"
          />
          <ProductCard
            image="/images/sample-product-section.jpg"
            name="Sample Product"
            price={100000}
            description="Sample description"
            isNew={true}
            categoryName="Sample category"
          />
          <ProductCard
            image="/images/sample-product-section.jpg"
            name="Sample Product"
            price={100000}
            description="Sample description"
            isBestSeller={true}
            categoryName="Sample category"
          />
          <ProductCard
            image="/images/sample-product-section.jpg"
            name="Sample Product"
            price={100000}
            description="Sample description"
            isSale={true}
            categoryName="Sample category"
          />
          <ProductCard
            image="/images/sample-product-section.jpg"
            name="Sample Product"
            price={100000}
            description="Sample description"
            isBestSeller={true}
            categoryName="Sample category"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
