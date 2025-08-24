import CategoryShowcase from "../../components/client/categories.showcase";
import FeaturesSection from "../../components/client/features.section";
import HeroBanner from "../../components/client/hero.banner";
import NewsletterSection from "../../components/client/newsletter.section";
import ProductSection from "../../components/client/product.section";

const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <ProductSection
        title="Sản phẩm nổi bật"
        subtitle="Các sản phẩm được khách hàng yêu thích nhất"
      />
      <div className="my-10">
        <CategoryShowcase />
      </div>
      <ProductSection
        title="Sản phẩm mới nhất"
        subtitle="Các sản phẩm mới về kho"
      />
      <FeaturesSection />
      <ProductSection
        title="Sản phẩm bán chạy"
        subtitle="Các sản phẩm được khách hàng mua nhiều nhất"
      />
      <NewsletterSection />
    </>
  );
};

export default HomePage;
