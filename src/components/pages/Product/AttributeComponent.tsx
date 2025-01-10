import React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import SearchAndMultiSelect from "@/components/shared/SearchAndMultiSelect";

const AttributeComponent = () => {
  return (
    <div className="p-4 flex  flex-col gap-3">
      <div className="flex gap-2">
        <Select>
          <SelectTrigger className="w-[200px] h-8">
            <SelectValue placeholder="Product Attribute" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Product Attribute" className="cursor-pointer">
              Product Attribute
            </SelectItem>
            <SelectItem value="Size" className="cursor-pointer">
              Size
            </SelectItem>
            <SelectItem value="Color" className="cursor-pointer">
              Color
            </SelectItem>
          </SelectContent>
        </Select>
        <Button className="h-8 px-3">Add</Button>
      </div>
      <Accordion
        type="single"
        className="w-full flex flex-col gap-3"
        collapsible
      >
        <AccordionItem value="item-1" className="bg-slate-100 px-3 border-b-0">
          <AccordionTrigger className="hover:no-underline">
            Color
          </AccordionTrigger>
          <AccordionContent className="flex">
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
                <SearchAndMultiSelect />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="bg-slate-100 px-3 border-b-0">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div>
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default AttributeComponent;
