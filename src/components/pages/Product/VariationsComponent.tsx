import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { TAttributeType } from "@/types/attribute.type";
import { UploadIcon } from "lucide-react";
import { TAttributeConfigType } from "@/types/attributeConfig.type";
import { setProduct } from "@/redux/features/productSlice";
// import AttributeLine from "./AttributeLine";

const AttributeComponent = () => {
  // Redux state
  const dispatch = useAppDispatch();
  const { attributes } = useAppSelector((state) => state.attribute);
  const { attributeConfigs } = useAppSelector((state) => state.attributeConfig);
  const { product } = useAppSelector((state) => state.product);

  // Local state
  const [existsAttributes, setexistsAttributes] = useState<TAttributeType[]>(
    []
  );
  const [existsConfigs, setExistsConfigs] = useState<TAttributeConfigType[]>(
    []
  );
  const [selectAttribute, setSelectAttribute] = useState<string | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<
    TAttributeType[]
  >([]);

  const handleAddVariant = () => {
    const configsIds: string[] = [];
    const prodAttributes = [...(product?.attributes || [])];
    const existsAttributes = attributes?.filter((attr) =>
      prodAttributes?.map((pAttr) => pAttr?.attribute).includes(attr?._id)
    );

    prodAttributes?.forEach((item) => {
      item.attributeConfig?.forEach((d) => configsIds.push(d));
    });

    const existsAttributess = attributeConfigs?.filter(
      (attr) => attr?._id && configsIds?.includes(attr?._id)
    );

    // setexistsAttributes(existsAttributes);
    // setExistsConfigs(existsAttributess);
    // dispatch(setProduct({...product, variations:[...product?.variations, {}] }))
  };

  useEffect(() => {
    const configsIds: string[] = [];
    const prodAttributes = [...(product?.attributes || [])];
    const existsAttributes = attributes?.filter((attr) =>
      prodAttributes?.map((pAttr) => pAttr?.attribute).includes(attr?._id)
    );

    prodAttributes?.forEach((item) => {
      item.attributeConfig?.forEach((d) => configsIds.push(d));
    });

    const existsAttributess = attributeConfigs?.filter(
      (attr) => attr?._id && configsIds?.includes(attr?._id)
    );

    setexistsAttributes(existsAttributes);
    setExistsConfigs(existsAttributess);
  }, [product]);

  return (
    <div className="p-4 flex  flex-col gap-3">
      <div className="flex gap-2">
        <Select onValueChange={(e) => setSelectAttribute(e)}>
          <SelectTrigger className="w-[200px] h-8">
            <SelectValue placeholder="Add Variations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Product Attribute" className="cursor-pointer">
              Product Attribute
            </SelectItem>
            {attributes?.map((attr, index) => (
              <SelectItem
                key={index}
                value={`${attr?._id}`}
                className="cursor-pointer"
              >
                {attr?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="button" onClick={handleAddVariant} className="h-8 px-3">
          Add
        </Button>
      </div>
      <Accordion
        type="single"
        className="w-full flex flex-col gap-3"
        collapsible
      >
        <AccordionItem
          value={`item-1`}
          className="bg-slate-100 overflow-auto px-3 border-b-0"
        >
          <AccordionTrigger className="hover:no-underline ">
            <div className="flex items-center justify-between w-full pr-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold">#48</span>
                {existsAttributes?.map((attr) => {
                  const matchConfigs = existsConfigs?.filter(
                    (config) => config?.attribute === attr?._id
                  );
                  return (
                    <Select
                      key={attr?._id}
                      onValueChange={(e) => setSelectAttribute(e)}
                    >
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue placeholder={attr?.name || "Select"} />
                      </SelectTrigger>
                      <SelectContent>
                        {matchConfigs?.map((con) => (
                          <SelectItem
                            key={con?._id}
                            value={con?._id as string}
                            className="cursor-pointer"
                          >
                            {con?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                })}
              </div>
              <div>
                <span className="text-red-600 text-sm">Remove</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="  py-3 w-full gap-5 min-h-[200px] ">
            <div className="  w-full ">
              <div className="space-y-3 px-1">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-[50px] h-[50px] border border-slate-300 cursor-pointer border-dashed rounded">
                      <UploadIcon />
                    </div>
                    <div className="flex items-center justify-center w-[50px] h-[50px] border border-dashed rounded">
                      <UploadIcon />
                    </div>
                  </div>
                  <div className="w-full">
                    <label htmlFor="" className="text-sm text-gray-600">
                      SKU (unique)
                    </label>
                    <input
                      id="regularPrice"
                      type="text"
                      min={0}
                      className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      placeholder="SKU code"
                      value={"asd"}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="" className="text-sm text-gray-600">
                      Regular Price
                    </label>
                    <input
                      id="regularPrice"
                      type="text"
                      min={0}
                      className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      // placeholder="Regular Price"
                      value={"asd"}
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="text-sm text-gray-600">
                      Offer Price
                    </label>
                    <input
                      id="regularPrice"
                      type="text"
                      min={0}
                      className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      // placeholder="Regular Price"
                      value={"asd"}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="" className="text-sm text-gray-600">
                      Weight (g)
                    </label>
                    <input
                      id="regularPrice"
                      type="number"
                      min={0}
                      className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      // placeholder="Regular Price"
                      value={"asd"}
                    />
                  </div>
                  <div className="">
                    <div>
                      <label htmlFor="" className="text-sm text-gray-600">
                        Dimentions (L,W,H) (cm)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          id="regularPrice"
                          type="number"
                          min={0}
                          placeholder="Length"
                          className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          // placeholder="Regular Price"
                          value={""}
                        />
                        <input
                          id="regularPrice"
                          type="number"
                          min={0}
                          placeholder="Width"
                          className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          // placeholder="Regular Price"
                          value={""}
                        />
                        <input
                          id="regularPrice"
                          type="number"
                          min={0}
                          placeholder="Height"
                          className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          // placeholder="Regular Price"
                          value={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="3">
                  <label htmlFor="" className="text-sm text-gray-600">
                    Description
                  </label>
                  <textarea
                    name=""
                    className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    rows={2}
                    id=""
                  ></textarea>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AttributeComponent;
