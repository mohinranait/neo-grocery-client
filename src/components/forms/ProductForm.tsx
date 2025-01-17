"use client";
import { BookPlus, Pen, Plus, Save, UploadCloudIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ProductVarient from "../pages/Product/ProductVarient";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import SelectImageFromModal from "../shared/SelectImageFromModal";
import { addVariant, setIsModal } from "@/redux/features/meidaSlice";
import { TMediaType } from "@/types/media.type";
import { Checkbox } from "../ui/checkbox";
import ManageCategory from "../pages/Product/ManageCategory";
import ManageBrand from "../pages/Product/ManageBrand";

const ProductForm = () => {
  const [date, setDate] = React.useState<Date>();
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<TMediaType | null>(null);
  const [gallarys, setGallarys] = useState<TMediaType[]>([]);

  return (
    <form action={"/"}>
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium text-slate-950">Add New Product</p>
        <div className="space-x-4">
          <Button variant={"outline"}>
            <BookPlus />
            Save and Published
          </Button>
          <Button>
            <Save />
            Save
          </Button>
        </div>
      </div>
      <hr className="my-3" />
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
              <div className="flex gap-1 mt-3 items-center">
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
        <div className="w-[300px] flex flex-col gap-4 ">
          <div className=" g-white rounded border border-l-slate-100 bg-card text-card-foreground">
            <div className="py-2 px-4 border-b border-l-slate-200">
              <p className="text-base font-semibold">Visibility</p>
            </div>
            <div className="px-4 py-4 space-y-4">
              <div>
                <RadioGroup
                  className="flex flex-row gap-2"
                  defaultValue="option-one"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one" className="cursor-pointer">
                      Published
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two" className="cursor-pointer">
                      Hidden
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="calender">Publish Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full h-9 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <ManageCategory />
          <ManageBrand />
          <div className=" bg-white rounded border border-l-slate-100 bg-card text-card-foreground ">
            <div className="py-2 px-4 border-b border-l-slate-200">
              <p className="text-base font-semibold">Product Image</p>
            </div>
            <div className="px-4 py-4 space-y-4">
              <div className="grid gap-2">
                <label
                  htmlFor="thumbnail"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Thumbnail
                </label>
                <div className="flex gap-4">
                  <SelectImageFromModal singleFile={setFile}>
                    <div
                      onClick={() => {
                        dispatch(setIsModal(true));
                        dispatch(addVariant("Single"));
                      }}
                      style={{
                        backgroundImage: `url('${file?.fileUrl}')`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                      className=" h-[120px] w-full cursor-pointer hover:bg-slate-200 flex items-center justify-center border-slate-200 rounded border border-dashed "
                    >
                      <UploadCloudIcon />
                    </div>
                  </SelectImageFromModal>
                </div>
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="thumbnail"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Image Gallary
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {gallarys?.length > 0 &&
                    gallarys?.map((file, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundImage: `url('${file?.fileUrl}')`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                        className="w-[80px] h-[80px] cursor-pointer hover:bg-slate-200 flex items-center justify-center border-slate-200 rounded border border-dashed "
                      ></div>
                    ))}
                  <SelectImageFromModal multiFiles={setGallarys}>
                    <div
                      onClick={() => {
                        dispatch(setIsModal(true));
                        dispatch(addVariant("Multiple"));
                      }}
                      className="  h-[80px]  cursor-pointer hover:bg-slate-200 flex items-center justify-center border-slate-200 rounded border border-dashed "
                    >
                      <UploadCloudIcon />
                    </div>
                  </SelectImageFromModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
