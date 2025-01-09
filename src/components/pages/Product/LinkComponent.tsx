import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import React from "react";

const LinkComponent = () => {
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center">
        <div className="w-[150px]">
          <label htmlFor="upsalss" className="text-sm text-muted-foreground">
            Upsalss
          </label>
        </div>
        <div>
          <input
            id="upsalss"
            type="text"
            className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Select product"
            value={product?.weight ?? ""}
            onChange={(e) =>
              dispatch(
                setProduct({
                  ...product,
                  weight: e.target.value,
                })
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LinkComponent;
