import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import React from "react";

const InventoryComponent = () => {
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center">
        <div className="w-[150px]">
          <label htmlFor="sku" className="text-sm text-muted-foreground">
            SKU
          </label>
        </div>
        <div>
          <input
            id="sku"
            type="text"
            className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Unique code"
            value={product?.skuCode ?? ""}
            onChange={(e) =>
              dispatch(
                setProduct({
                  ...product,
                  skuCode: e.target.value,
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
            Manage Stock ?
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={product?.manageStock ? true : false}
              onCheckedChange={(e) => {
                dispatch(
                  setProduct({ ...product, manageStock: e ? true : false })
                );
              }}
              id="stock_label"
            />
            <label
              htmlFor="stock_label"
              className="text-sm font-medium text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Enable product management and stock label
            </label>
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

export default InventoryComponent;
