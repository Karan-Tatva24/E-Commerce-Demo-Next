import HeroSection from "@/components/HeroSection";
import ProductsRender from "@/components/products/ProductsRender";

export default function Home({ searchParams }: any) {
  return (
    <main className="flex flex-col items-center h-[calc(100% - 176px)]">
      <HeroSection />
      <ProductsRender searchParams={searchParams} />
    </main>
  );
}
