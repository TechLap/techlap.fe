import { NavLink } from "react-router-dom";
import ProductCard from "./card/product.card";
import { useQuery } from "@tanstack/react-query";
import { apiFetchBestSellerProduct, apiFetchLatestProduct } from "../../config/api";
import { useEffect, useState } from "react";
import { IProduct } from "../../types/backend";
import { set } from "date-fns";

interface ProductSectionProps {
  title: string;
  subtitle: string;
  type?: "featured" | "latest" | "bestseller";
}

const ProductSection = ({ title, subtitle, type }: ProductSectionProps) => {
  const [latestProductsShow, setLatestProductsShow] = useState<IProduct[] | undefined>(undefined);
  const [bestsellerProductsShow, setBestsellerProductsShow] = useState<IProduct[] | undefined>(undefined);
  const [featuredProductsShow, setFeaturedProductsShow] = useState<IProduct[] | undefined>(undefined);
  const { data: latestProducts } = useQuery({
    queryKey: ["fetchLatestProducts", type],
    queryFn: () =>
      apiFetchLatestProduct(),
    enabled: type === "latest",
  });

  const { data: bestsellerProducts } = useQuery({
    queryKey: ["fetchBestsellerProducts", type],
    queryFn: () =>
      apiFetchBestSellerProduct(),
    enabled: type === "bestseller",
  });

  const { data: featuredProducts } = useQuery({
    queryKey: ["fetchFeaturedProducts", type],
    queryFn: () =>
      // Fix later
      apiFetchBestSellerProduct(),
    enabled: type === "featured",
  });

  useEffect(() => {
    if (latestProducts && latestProducts.data) {
      setLatestProductsShow(latestProducts.data?.data ?? []);
    }
  }, [latestProducts]);

  useEffect(() => {
    if (bestsellerProducts && bestsellerProducts.data) {
      setBestsellerProductsShow(bestsellerProducts.data?.data ?? []);
    }
  }, [bestsellerProducts]);
  useEffect(() => {
    if (featuredProducts && featuredProducts.data) {
      setFeaturedProductsShow(featuredProducts.data?.data ?? []);
    }
  }, [featuredProducts]);
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
            className="text-red-600 hover:text-red-700 flex items-center font-medium"
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
          {latestProductsShow !== undefined &&
            latestProductsShow.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image || null}
                name={product.name}
                price={product.price}
                discount={product.discount}
                categoryName={product.category?.name || "Không có danh mục"}
                description={product.description}
              />
            ))}
          {bestsellerProductsShow !== undefined &&
            bestsellerProductsShow.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image || null}
                name={product.name}
                price={product.price}
                discount={product.discount}
                categoryName={product.category?.name || "Không có danh mục"}
                description={product.description}
              />
            ))}
          {featuredProductsShow !== undefined &&
            featuredProductsShow.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image || null}
                name={product.name}
                price={product.price}
                discount={product.discount}
                categoryName={product.category?.name || "Không có danh mục"}
                description={product.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
