"use client";

import { useAppDispatch } from "@/store/hooks";
import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/Pagination";
import { Product } from "@/types/products";
import { addProduct } from "@/store/slices/productCartSlice";
import { useToast } from "../ui/use-toast";
import axios from "axios";

interface SearchParams {
  page?: string;
  search?: string;
}

const ProductsRender = ({ searchParams }: { searchParams: SearchParams }) => {
  const limit = 30;
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const search = searchParams.search || "";
  const page = Number(searchParams.page) || 1;

  const fetchProductData = useCallback(async () => {
    const skip = (limit || 30) * (page - 1);
    const res = await axios.get(
      `https://dummyjson.com/products/search?limit=${
        limit || 30
      }&skip=${skip}&q=${search}`
    );

    if (res.data) {
      setProducts(res.data.products);
      setTotalProducts(res.data.total);
    }
  }, [page, search]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const handleAddToCart = (id: number) => {
    dispatch(addProduct({ id })).then((response) => {
      console.log({ response });
      if (response.payload) {
        toast({
          title: "Success",
          description: "Product successfully add to cart",
        });
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
            brand={product.brand}
            tags={product.tags}
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
