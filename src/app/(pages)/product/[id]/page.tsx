import ProductFullDetails from "@/components/products/ProductFullDetails";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col items-center h-[calc(100% - 176px)]">
      <ProductFullDetails productId={Number(params.id)} />
    </div>
  );
};

export default page;
