"use client";
import { Pen } from "lucide-react";
import Link from "next/link";
import React from "react";

import ProductVarient from "../pages/Product/ProductVarient";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";

const ProductForm = () => {
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  return (
    <form action={"/"}>
      <div>
        <p className="text-xl font-medium text-slate-950">Add New Product</p>
      </div>
      <div className="flex gap-4 mt-2">
        <div className="flex-grow  ">
          <div className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                className="py-2 text-lg  px-3 rounded-md focus-visible:outline-primary w-full"
                placeholder="Add title"
                value={product.name}
                onChange={(e) =>
                  dispatch(setProduct({ ...product, name: e.target.value }))
                }
              />
              <div className="flex gap-1 items-center">
                <p>Permalink: </p>
                <Link
                  href={"/"}
                  className="text-sm text-blue-600 hover:underline"
                >
                  www.localhost:3000/new-product
                </Link>
                <span className="py-[2px] text-xs items-center gap-[2px] px-[6px] cursor-pointer inline-flex rounded border border-slate-400 bg-white">
                  <Pen size={10} /> Edit
                </span>
              </div>
            </div>

            <div className="p-5 bg-white rounded-md">Markdown Editor</div>
            <ProductVarient />
          </div>
        </div>
        <div className="w-[300px] bg-white rounded-xl border bg-card text-card-foreground shadow">
          d
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
