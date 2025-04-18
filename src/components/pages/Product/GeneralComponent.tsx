"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import React, { useState } from "react";
import { format, compareAsc } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GeneralComponent = () => {
  // Redux state
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  // Local State
  const [isOfferDateShow, setIsOfferDateShow] = useState<boolean>(false);

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center">
        <div className="w-[150px]">
          <label
            htmlFor="regularPrice"
            className="text-sm text-muted-foreground"
          >
            Regular Price (৳){" "}
          </label>
        </div>
        <div className="relative">
          <span className="absolute left-4 top-2/4 -translate-y-2/4 text-muted-foreground">
            ৳{" "}
          </span>
          <input
            id="regularPrice"
            type="number"
            min={0}
            className="flex h-8 w-full rounded-md border border-input bg-transparent pr-3 pl-8 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            // placeholder="Regular Price"
            value={product?.price?.productPrice ?? ""}
            onChange={(e) =>
              dispatch(
                setProduct({
                  ...product,
                  price: {
                    ...product?.price,
                    productPrice: parseFloat(e.target.value) || 0,
                  },
                })
              )
            }
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[150px]">
          <label htmlFor="sale_price" className="text-sm text-muted-foreground">
            Sale Price (৳){" "}
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <div className="relative">
              <span className="absolute left-4 top-2/4 -translate-y-2/4 text-muted-foreground">
                ৳{" "}
              </span>
              <input
                id="sale_price"
                type="number"
                min={0}
                className="flex h-8 w-full rounded-md border border-input bg-transparent pr-3 pl-8 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                // placeholder="Sale Price"
                value={product?.price?.sellPrice ?? ""}
                onChange={(e) =>
                  dispatch(
                    setProduct({
                      ...product,
                      price: {
                        ...product?.price,
                        sellPrice: parseFloat(e.target.value) || 0,
                      },
                    })
                  )
                }
              />
            </div>
            {product?.price?.productPrice <= product?.price?.sellPrice && (
              <p className="text-red-500 text-xs">
                Sale Price must be less than Regular Price
              </p>
            )}
          </div>
          {!isOfferDateShow && (
            <span
              onClick={() => setIsOfferDateShow(!isOfferDateShow)}
              className="text-primary underline cursor-pointer text-sm"
            >
              Schedule
            </span>
          )}
        </div>
      </div>

      {isOfferDateShow && (
        <>
          <div className="flex items-center">
            <div className="w-[150px]">
              <label
                htmlFor="sale_price"
                className="text-sm text-muted-foreground"
              >
                Start Date
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full min-w-[200px] h-9 justify-start text-left font-normal",
                      !product?.offerDate?.start_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {product?.offerDate?.start_date ? (
                      format(product?.offerDate?.start_date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={product?.offerDate?.start_date}
                    onSelect={(e) => {
                      dispatch(
                        setProduct({
                          ...product,
                          offerDate: {
                            ...product?.offerDate,
                            start_date: e || undefined,
                            offerPrice: product?.offerDate?.offerPrice ?? 0,
                          },
                        })
                      );
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <span
                onClick={() => {
                  dispatch(
                    setProduct({
                      ...product,
                      offerDate: {
                        ...product?.offerDate,
                        start_date: undefined,
                        end_date: undefined,
                        offerPrice: product?.offerDate?.offerPrice ?? 0,
                      },
                    })
                  );
                  setIsOfferDateShow(false);
                }}
                className="text-primary underline cursor-pointer text-sm"
              >
                Cancel
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[150px]">
              <label
                htmlFor="sale_price"
                className="text-sm text-muted-foreground"
              >
                End Date
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full min-w-[200px] h-9 justify-start text-left font-normal",
                        !product?.offerDate?.end_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {product?.offerDate?.end_date ? (
                        format(product?.offerDate?.end_date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={product?.offerDate?.end_date}
                      onSelect={(e) => {
                        dispatch(
                          setProduct({
                            ...product,
                            offerDate: {
                              ...product?.offerDate,
                              end_date: e || undefined,
                              offerPrice: product?.offerDate?.offerPrice ?? 0,
                            },
                          })
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {product?.offerDate?.start_date &&
                  product?.offerDate?.end_date &&
                  compareAsc(
                    product?.offerDate?.start_date,
                    product?.offerDate?.end_date
                  ) === 1 && (
                    <p className="text-red-500 text-xs">
                      End Date must be greater than Start Date
                    </p>
                  )}
              </div>
              {product?.offerDate?.end_date && (
                <span
                  onClick={() =>
                    dispatch(
                      setProduct({
                        ...product,
                        offerDate: {
                          ...product?.offerDate,
                          end_date: undefined,
                          offerPrice: product?.offerDate?.offerPrice ?? 0,
                        },
                      })
                    )
                  }
                  className="text-primary underline cursor-pointer text-sm"
                >
                  Cancel
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GeneralComponent;
