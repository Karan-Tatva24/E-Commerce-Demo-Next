"use client";

import { useAppDispatch } from "@/store/hooks";
import React, { useCallback } from "react";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/Pagination";
import { addProduct } from "@/store/slices/productCartSlice";
import { useToast } from "../ui/use-toast";
import { PRODUCT_LIMIT_PER_PAGE } from "@/data/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/lib/api";

interface SearchParams {
  page?: string;
  search?: string;
}

const ProductsRender = ({ searchParams }: { searchParams: SearchParams }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const search = searchParams.search || "";
  const page = Number(searchParams.page) || 1;

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await fetchAllProducts({ page, search }),
    queryKey: ["Products", page, search],
  });

  const handleAddToCart = useCallback(
    (id: number) => {
      dispatch(addProduct({ id })).then((response) => {
        if (response.payload) {
          toast({
            title: "Success",
            description: "Product successfully added to cart",
          });
        }
      });
    },
    [dispatch, toast]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching products. Please try again later.</div>;
  }

  return (
    <>
      <div className="flex h-full justify-center items-center flex-wrap gap-4 pt-4">
        {data.products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.images[0]}
            description={product.description}
            price={product.price}
            rating={product.rating}
            brand={product.brand}
            tags={product.tags}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="pt-4">
        <Pagination
          totalPages={Math.ceil(data.total / PRODUCT_LIMIT_PER_PAGE)}
        />
      </div>
    </>
  );
};

export default ProductsRender;
