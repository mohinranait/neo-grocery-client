import { TProduct } from "@/types/product.type";
import React, { FC, useEffect, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { defaultImage } from "@/utils/exportImages";
import { Switch } from "../ui/switch";
import { updateProduct } from "@/actions/productApi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProducts, setSelectedProduct } from "@/redux/features/productSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type Props = {
  product: TProduct;
  products: TProduct[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ProductRow: FC<Props> = ({ product, products, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const { name, slug, skuCode, _id, price, isStock, isFeature, status } =
    product || {};

  // handle update product
  const handleUpdateProduct = async (id: string, data: TProduct) => {
    const arr = [...products];
    const index = products?.findIndex((d) => d._id === id);
    arr[index] = {
      ...arr[index],
      ...data,
    };
    dispatch(setProducts(arr));
    await updateProduct(id as string, data);
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-2">
          <Image
            src={product?.featureImage?.image || defaultImage}
            className="w-[50] h-[50px] rounded"
            width={50}
            height={50}
            alt="cat image"
          />

          <div>
            <p>{name}</p>
            <div className="flex mt-[2px] gap-1 items-center">
              <Link
                href={`/admin/product?edit=${slug}`}
                className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary"
              >
                Edit
              </Link>
              <span className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary">
                View
              </span>
              <span
                onClick={() => {
                  setIsOpen(true);
                  dispatch(setSelectedProduct(product));
                }}
                className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary"
              >
                Delete
              </span>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p>{skuCode || "--"} </p>
      </TableCell>
      <TableCell>
        <p>
          $
          {price.sellPrice
            ? price?.productPrice - price.sellPrice
            : price.productPrice}{" "}
        </p>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Switch
                checked={isFeature === "Active" ? true : false}
                onCheckedChange={(e) =>
                  handleUpdateProduct(_id as string, {
                    ...product,
                    isFeature: e ? "Active" : "Inactive",
                  })
                }
                id="feature"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFeature}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>

      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Switch
                checked={status === "Active" ? true : false}
                onCheckedChange={(e) =>
                  handleUpdateProduct(_id as string, {
                    ...product,
                    status: e ? "Active" : "Inactive",
                  })
                }
                id="status"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{status}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>{isStock}</TableCell>
    </TableRow>
  );
};

export default ProductRow;
