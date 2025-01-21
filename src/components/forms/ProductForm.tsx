"use client";
import { BookPlus, Pen, Save, UploadCloudIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { TagsInput } from "react-tag-input-component";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ProductVarient from "../pages/Product/ProductVarient";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct, updateProducts } from "@/redux/features/productSlice";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import SelectImageFromModal from "../shared/SelectImageFromModal";
import { addVariant, setIsModal } from "@/redux/features/meidaSlice";
import { TMediaType } from "@/types/media.type";
import ManageCategory from "../pages/Product/ManageCategory";
import ManageBrand from "../pages/Product/ManageBrand";
import { createNewProduct, getSingleProductBySlug } from "@/actions/productApi";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { generateSlug } from "@/utils/helpers";
import EditorElement from "../elements/EditorElement";

const ProductForm = () => {
  // Redux state
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  console.log({ editId });

  // Local State
  const [date, setDate] = React.useState<Date>();
  const [file, setFile] = useState<TMediaType | null>(null);
  const [gallarys, setGallarys] = useState<TMediaType[]>([]);
  const [isOpenSlug, setIsOpenSlug] = useState<boolean>(false);
  const [slug, setSlug] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);

  // Submit product form for SAVE Product in DB
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({ product });
    if (!product?.name) return toast.error("Product title is required");
    if (!product?.price?.productPrice) return toast.error("Price is required");

    try {
      const formate = {
        ...product,
        featureImage: {
          image: file?.fileUrl || "",
        },
        imageGallary: gallarys?.map((img) => img?.fileUrl),
        slug: product?.slug ? generateSlug(product?.slug) : generateSlug(slug),
        seo_keyword: keywords,
      };
      const data = await createNewProduct(formate);

      if (data?.success) {
        dispatch(updateProducts(product));
        router.push(`/admin/product?edit=${data?.payload?.slug}`);
        toast.success("Product created");
      } else {
        toast.error("Somthing wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle delete Product by ID

  useEffect(() => {
    if (!editId) return;

    (async function () {
      try {
        const data = await getSingleProductBySlug(editId);
        console.log({ data });

        if (data?.success) {
          dispatch(setProduct(data?.payload));
        }
      } catch (error) {}
    })();
  }, [editId]);

  useEffect(() => {
    if (product?.seo_keyword) {
      setKeywords(product?.seo_keyword);
    }
  }, [product]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium text-slate-950">Add New Product</p>
        <div className="space-x-4">
          <Button type="button" variant={"outline"}>
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
                onChange={(e) => {
                  dispatch(setProduct({ ...product, name: e.target.value }));
                  const sl = generateSlug(e.target.value);
                  setSlug(sl);
                }}
              />
              <div className="flex gap-1 mt-3 items-center">
                <p>Permalink: </p>

                {!isOpenSlug ? (
                  <Link
                    href={"/"}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    www.localhost:3000/
                    {product?.slug ? product?.slug : slug}
                  </Link>
                ) : (
                  <div className="flex gap-1 items-center">
                    <span className="text-sm text-blue-600 hover:underline">
                      www.localhost:3000/
                    </span>
                    <input
                      id="slug"
                      type="text"
                      value={product?.slug || ""}
                      onChange={(e) =>
                        dispatch(
                          setProduct({
                            ...product,
                            slug: generateSlug(e.target.value),
                          })
                        )
                      }
                      className="flex h-6 w-max rounded-md border border-input bg-transparent px-1 py-1 text-base shadow-sm transition-colors  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      placeholder="Slug"
                    />
                  </div>
                )}

                {isOpenSlug ? (
                  <span
                    onClick={() => setIsOpenSlug(false)}
                    className="py-[2px] text-white text-xs items-center gap-[2px] px-[6px] cursor-pointer inline-flex rounded border border-slate-400 bg-primary"
                  >
                    OK
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      setIsOpenSlug(true);
                      dispatch(
                        setProduct({
                          ...product,
                          slug: slug,
                        })
                      );
                    }}
                    className="py-[2px] text-xs items-center gap-[2px] px-[6px] cursor-pointer inline-flex rounded border border-slate-400 bg-white"
                  >
                    <Pen size={10} /> Edit
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 bg-white rounded-md">
              <div className="flex items-center gap-2 border-b p-4 py-3">
                <p>Editor</p>
              </div>
              <EditorElement />
            </div>
            <ProductVarient />
            <div className=" bg-white rounded-md">
              <div className="flex items-center gap-2 border-b p-4 py-3">
                <p>SEO</p>
              </div>
              <div className="px-4 py-2 space-y-3">
                <div>
                  <label htmlFor="">Meta Title</label>
                  <input
                    id="regularPrice"
                    type="text"
                    className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="Regular Price"
                    value={product?.seo_title ?? ""}
                    onChange={(e) =>
                      dispatch(
                        setProduct({
                          ...product,
                          seo_title: e?.target?.value,
                        })
                      )
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Meta Description</label>
                  <textarea
                    name=""
                    id=""
                    rows={3}
                    className="flex  w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="Meta description"
                    value={product?.seo_desc ?? ""}
                    onChange={(e) =>
                      dispatch(
                        setProduct({
                          ...product,
                          seo_desc: e?.target?.value,
                        })
                      )
                    }
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="">Meta Keyword</label>
                  <TagsInput
                    value={keywords}
                    onChange={setKeywords}
                    name="keywords"
                    placeHolder="Seo Keywords"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-[300px] flex flex-col gap-4 ">
            <div className=" g-white rounded border border-l-slate-100 bg-card text-card-foreground">
              <div className="py-2 px-4 border-b border-l-slate-200">
                <p className="text-base font-semibold">Visibility</p>
              </div>
              <div className="px-4 py-4 space-y-4">
                <div>
                  <RadioGroup
                    className="flex flex-row gap-2"
                    defaultValue="Active"
                    onValueChange={(e: "Active" | "Inactive") =>
                      dispatch(
                        setProduct({
                          ...product,
                          status: e,
                        })
                      )
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Active" id="option-one" />
                      <Label htmlFor="option-one" className="cursor-pointer">
                        Published
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Inactive" id="option-two" />
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
                        onSelect={(e) => {
                          setDate(e);
                          dispatch(
                            setProduct({
                              ...product,
                              publish_date: e ? e : new Date(),
                            })
                          );
                        }}
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
      </div>
    </form>
  );
};

export default ProductForm;
