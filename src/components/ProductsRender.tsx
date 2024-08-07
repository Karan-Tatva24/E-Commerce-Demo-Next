"use client";

import { useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/products";

const ProductsRender = () => {
  const limit = 30;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const dispatch = useAppDispatch();
  const params = useSearchParams();

  useEffect(() => setPage(Number(params.get("page"))), [params]);

  useEffect(() => {
    dispatch(fetchProducts({ page })).then((res) => {
      setProducts(res.payload.products);
      setTotalProducts(res.payload.total);
    });
  }, [dispatch, page]);

  return (
    <>
      <div className="flex h-full justify-center items-center flex-wrap gap-4 pt-4">
        {products.map((product, index) => (
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
