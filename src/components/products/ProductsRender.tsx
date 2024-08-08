"use client";

import { useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/Pagination";
import { Product } from "@/types/products";
import { addProduct } from "@/store/slices/productCartSlice";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface SearchParams {
  page?: string;
  search?: string;
}

const ProductsRender = ({ searchParams }: { searchParams: SearchParams }) => {
  const limit = 30;
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const page = Number(searchParams?.page) || 1;
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();

  const fetchProductData = useCallback(async () => {
    const res = await dispatch(
      fetchProducts({ page, search: searchParams.search || "" })
    );
    if (res.payload) {
      setProducts(res.payload.products);
      setTotalProducts(res.payload.total);
    }
  }, [dispatch, page, searchParams.search]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const handleAddToCart = (id: number) => {
    dispatch(addProduct({ id })).then((response) => {
      if (response.payload) {
        toast({
          title: "Success",
          description: "Product successfully add to cart",
        });
        router.push("/cart");
      }
    });
  };

  return (
    <>
      <div className="flex h-full justify-center items-center flex-wrap gap-4 pt-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.images[0]}
            description={product.description}
            price={product.price}
            rating={product.rating}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="pt-4">
        <Pagination totalPages={Math.ceil(totalProducts / limit)} />
      </div>
    </>
  );
};

export default ProductsRender;
