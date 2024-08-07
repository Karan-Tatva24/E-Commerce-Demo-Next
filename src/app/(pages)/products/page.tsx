import ProductsRender from "@/components/products/ProductsRender";

const page = ({ searchParams }: any) => {
  return (
    <div className="flex flex-col items-center h-[calc(100% - 176px)]">
      <ProductsRender searchParams={searchParams} />
    </div>
  );
};

export default page;
