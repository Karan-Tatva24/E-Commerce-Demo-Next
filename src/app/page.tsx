import HeroSection from "@/components/HeroSection";
import ProductsRender from "@/components/products/ProductsRender";

export default function Home({ searchParams }: any) {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <ProductsRender searchParams={searchParams} />
    </div>
  );
}
