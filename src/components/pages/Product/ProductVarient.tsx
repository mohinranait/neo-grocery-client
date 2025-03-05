"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bed, Bone, Car, Link, Tag } from "lucide-react";
import { TProductType, TProductTypeLists } from "@/types/product.type";
import GeneralComponent from "./GeneralComponent";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import InventoryComponent from "./InventoryComponent";
import ShippingComponent from "./ShippingComponent";
import LinkComponent from "./LinkComponent";
import AttributeComponent from "./AttributeComponent";
import dynamic from "next/dynamic";
const VariationsComponent = dynamic(
  () => import("@/components/pages/Product/VariationsComponent"),
  {
    ssr: false,
    loading: () => <div>Loading</div>,
  }
);

type TVariantTabType = {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

// Product variants
const variants: TProductType[] = [
  "Single Product",
  "Variable Product",
  "Group Product",
  "Affiliate",
];

const tabs: { type: TProductType; tabs: TProductTypeLists[] }[] = [
  {
    type: "Single Product",
    tabs: ["General", "Inventory", "Shipping", "Link Product", "Attributes"],
  },
  {
    type: "Variable Product",
    tabs: ["General", "Shipping", "Attributes", "Variations"],
  },
  {
    type: "Group Product",
    tabs: ["General", "Inventory", "Shipping"],
  },
  {
    type: "Affiliate",
    tabs: ["Inventory", "Shipping", "Attributes"],
  },
];

const ProductVarient = () => {
  //  Redux State
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  // Local State
  const [variantTabs, setVariantTabs] = useState<TVariantTabType[]>([]);
  const [activeTab, setActiveTab] = useState<TVariantTabType | null>(null);

  const items: TVariantTabType[] = [
    {
      id: "1",
      label: "General",
      icon: <Bone size={16} />,
      children: <GeneralComponent />,
    },
    {
      id: "2",
      label: "Inventory",
      icon: <Tag size={16} />,
      children: <InventoryComponent />,
    },
    {
      id: "3",
      label: "Shipping",
      icon: <Car size={16} />,
      children: <ShippingComponent />,
    },
    {
      id: "4",
      label: "Link Product",
      icon: <Link size={16} />,
      children: <LinkComponent />,
    },
    {
      id: "5",
      label: "Attributes",
      icon: <Bed size={16} />,
      children: <AttributeComponent />,
    },
    {
      id: "6",
      label: "Variations",
      icon: <Bed size={16} />,
      children: <VariationsComponent />,
    },
  ];

  // Tabs are filtered by product type.
  const getAllVariantTabs = (value: string) => {
    const findTab = tabs?.find((tab) => tab?.type === value);
    if (findTab) {
      const getTabs: TVariantTabType[] = items?.filter((item) =>
        findTab?.tabs.includes(item?.label as TProductTypeLists)
      );
      setActiveTab(getTabs[0]);
      setVariantTabs(getTabs);
    }
  };

  // get tabs from selected product type
  const handleSelectVariant = (value: TProductType) => {
    getAllVariantTabs(value);
    dispatch(setProduct({ ...product, variant: value }));
  };

  // Initial active tabs for single product
  useEffect(() => {
    getAllVariantTabs(variants[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update tabs when product variant is changed
    if (product?.variant) {
      getAllVariantTabs(product?.variant);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" bg-white rounded-md">
      <div className="flex items-center gap-2 border-b p-4 py-2">
        <p>Product data</p>
        <Select
          value={product?.variant}
          onValueChange={(e) => handleSelectVariant(e as TProductType)}
        >
          <SelectTrigger className="w-[160px] h-8">
            <SelectValue placeholder={variants[0]} />
          </SelectTrigger>
          <SelectContent>
            {variants?.map((variant) => (
              <SelectItem
                key={variant}
                value={variant}
                className="cursor-pointer"
              >
                {variant}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex ">
        <div>
          <ul className="bg-slate-100 w-[200px]">
            {variantTabs?.map((variant, idx) => (
              <li
                key={idx}
                onClick={() => setActiveTab(variant)}
                className={`py-2 px-2 pl-4 text-sm border-l-4 flex gap-2 hover:bg-slate-200 cursor-pointer ${
                  variant?.label === activeTab?.label
                    ? "bg-white"
                    : "bg-slate-100"
                } `}
              >
                {variant?.icon}
                {variant?.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">{activeTab?.children}</div>
      </div>
    </div>
  );
};

export default ProductVarient;
