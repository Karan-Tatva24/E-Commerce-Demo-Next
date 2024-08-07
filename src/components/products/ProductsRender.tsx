"use client";

import { useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/Pagination";
import { Product } from "@/types/products";

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

  return (
    <>
      <div className="flex h-full justify-center items-center flex-wrap gap-4 pt-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            imageUrl={product.images[0]}
            description={product.category}
            price={product.price}
            stock={product.stock}
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
