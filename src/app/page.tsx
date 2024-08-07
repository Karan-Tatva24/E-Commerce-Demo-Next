import ProductCard from "@/components/ProductCard";
import ProductsRender from "@/components/ProductsRender";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-[calc(100% - 176px)]">
      <ProductsRender />
    </main>
  );
}
