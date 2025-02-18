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
import { useAppSelector } from "@/hooks/useRedux";
import { TAttributeType } from "@/types/attribute.type";
import { UploadIcon } from "lucide-react";
// import AttributeLine from "./AttributeLine";

const AttributeComponent = () => {
  // Redux state
  const { attributes } = useAppSelector((state) => state.attribute);
  const { product } = useAppSelector((state) => state.product);
  const [existsAttributes, setexistsAttributes] = useState<TAttributeType[]>(
    []
  );

  // Local state
  const [selectAttribute, setSelectAttribute] = useState<string | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<
    TAttributeType[]
  >([]);

  const handleSelectAttribute = () => {
    const find = attributes?.find((attr) => attr?._id === selectAttribute);
    if (find) {
      setSelectedAttributes((prev) => [...prev, find]);
      setSelectAttribute(null);
    }
  };

  useEffect(() => {
    const prodAttributes = [...(product?.attributes || [])];
    const existsAttributes = attributes?.filter((attr) =>
      prodAttributes?.map((pAttr) => pAttr?.attribute).includes(attr?._id)
    );
    console.log({ existsAttributes });
    setexistsAttributes(existsAttributes);
  }, [product]);

  //   useEffect(() => {
  //     const configs = [...(product?.attributes || [])];

  //     const attr = attributes?.filter((attr) =>
  //       configs?.map((d) => d?.attribute)?.includes(attr?._id)
  //     );

  //     if (attr?.length > 0) {
  //       setSelectedAttributes(attr);
  //     }
  //   }, [product]);

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
        <Button
          type="button"
          onClick={handleSelectAttribute}
          className="h-8 px-3"
        >
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
                {existsAttributes?.map((attr) => (
                  <Select
                    key={attr?._id}
                    onValueChange={(e) => setSelectAttribute(e)}
                  >
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue placeholder={attr?.name || "Select"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Colors" className="cursor-pointer">
                        Colors
                      </SelectItem>

                      <SelectItem value={`red`} className="cursor-pointer">
                        Red
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ))}
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
                      // placeholder="Regular Price"
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
        <AccordionItem
          value={`item-2`}
          className="bg-slate-100 overflow-auto px-3 border-b-0"
        >
          <AccordionTrigger className="hover:no-underline">
            title 2
          </AccordionTrigger>
          <AccordionContent className=" flex flex-col gap-5 min-h-[200px] ">
            <div className="flex flex-grow ">content 2</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AttributeComponent;
