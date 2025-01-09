import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import React from "react";

const ShippingComponent = () => {
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center">
        <div className="w-[150px]">
          <label htmlFor="weight" className="text-sm text-muted-foreground">
            Weight (g)
          </label>
        </div>
        <div>
          <input
            id="weight"
            type="text"
            className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Weight"
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
      <div className="flex items-center">
        <div className="w-[150px]">
          <label
            htmlFor="stock_label"
            className="text-sm text-muted-foreground"
          >
            Dimentions (cm)
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center space-x-2">
            <input
              id="length"
              name="length"
              type="number"
              className="flex h-8 w-[86px]  rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Length"
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
            <input
              id="width"
              type="number"
              name="width"
              className="flex h-8 w-[80px]  rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Width"
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
            <input
              id="height"
              type="number"
              name="height"
              className="flex h-8 w-[80px]  rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Height"
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

      <div className="flex items-center">
        <div className="w-[150px]">
          <label
            htmlFor="stock_quantity"
            className="text-sm text-muted-foreground"
          >
            Stock Quantity
          </label>
        </div>
        <div>
          <input
            id="stock_quantity"
            type="number"
            className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Stock quantity"
            value={product?.isStock ?? ""}
            onChange={(e) =>
              dispatch(
                setProduct({
                  ...product,
                  isStock: Number(e.target.value),
                })
              )
            }
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[150px]">
          <label
            htmlFor="min_stock"
            className="text-sm leading-3 text-muted-foreground"
          >
            Minimum Stock Quantity
          </label>
        </div>
        <div>
          <input
            id="min_stock"
            type="number"
            className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Min stock for warning"
            value={product?.minStock ?? ""}
            onChange={(e) =>
              dispatch(
                setProduct({
                  ...product,
                  minStock: Number(e.target.value),
                })
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingComponent;
