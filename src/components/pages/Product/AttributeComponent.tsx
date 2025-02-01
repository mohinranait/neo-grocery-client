import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactSelect from "react-select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppSelector } from "@/hooks/useRedux";
import { TAttributeType } from "@/types/attribute.type";

const AttributeComponent = () => {
  // Redux state
  const { attributes } = useAppSelector((state) => state.attribute);

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
  return (
    <div className="p-4 flex  flex-col gap-3">
      <div className="flex gap-2">
        <Select onValueChange={(e) => setSelectAttribute(e)}>
          <SelectTrigger className="w-[200px] h-8">
            <SelectValue placeholder="Product Attribute" />
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
        {selectedAttributes?.map((attribute, index) => (
          <AccordionItem
            key={index}
            value={`item-${attribute?._id} `}
            className="bg-slate-100 overflow-auto px-3 border-b-0"
          >
            <AccordionTrigger className="hover:no-underline">
              {attribute?.name}
            </AccordionTrigger>
            <AccordionContent className="flex min-h-[200px] ">
              <div className="w-[250px]">
                <p className="text-slate-600">
                  Name: <span className="text-slate-900">Color</span>{" "}
                </p>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={false}
                    onCheckedChange={(e) => {}}
                    id="color"
                  />
                  <label
                    htmlFor="color"
                    className="text-sm font-medium text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Visiable on the product page
                  </label>
                </div>
              </div>
              <div className="flex-grow">
                <div>
                  <ReactSelect
                    isMulti
                    options={[
                      { value: "chocolate", label: "Chocolate" },
                      { value: "strawberry", label: "Strawberry" },
                      { value: "vanilla", label: "Vanilla" },
                    ]}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div>
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default AttributeComponent;
