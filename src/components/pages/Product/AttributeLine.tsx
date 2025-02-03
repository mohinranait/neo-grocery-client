import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/redux/features/productSlice";
import { TAttributeType } from "@/types/attribute.type";
import React, { useEffect, useState } from "react";
import ReactSelect, { MultiValue } from "react-select";
type Props = {
  attribute: TAttributeType;
};
const AttributeLine = ({ attribute }: Props) => {
  const { product } = useAppSelector((state) => state.product);
  const { attributeConfigs } = useAppSelector((state) => state.attributeConfig);
  const dispatch = useAppDispatch();

  const [configs, setConfigs] = useState<
    { label: string; value: string | undefined }[]
  >([]);
  // handle set attribute configs
  const handleChangeAttributeCofig = (
    newValue: MultiValue<{ value: string | undefined; label: string }>
  ) => {
    const values = [...newValue];
    setConfigs(values);
  };

  const handleSaveAttribute = () => {
    console.log({
      attribute: attribute?._id,
      attributeConfig: configs?.map((d) => d?.value),
    });

    const attr = [...(product?.attributes || [])];

    const index = attr?.findIndex((i) => i?.attribute === attribute?._id);
    if (index === -1) {
      attr.push({
        attribute: attribute?._id,
        attributeConfig: configs?.map((d) => d?.value) as string[],
      });
    } else {
      attr[index] = {
        attribute: attribute?._id,
        attributeConfig: configs?.map((item) => item?.value as string),
      };
    }

    dispatch(
      setProduct({
        ...product,
        attributes: [...attr],
      })
    );
  };

  useEffect(() => {
    if (!attribute) return;
    const configs = [...(product?.attributes || [])];
    const findConfig = configs?.find((d) => d?.attribute === attribute?._id);
    const configsIds = findConfig?.attributeConfig;

    const getConfigs = attributeConfigs?.filter((con) =>
      configsIds?.includes(con?._id as string)
    );

    const selectedConfigs = getConfigs?.map((d) => ({
      label: d?.name,
      value: d?._id || undefined,
    }));
    setConfigs(selectedConfigs);
  }, [attribute]);

  return (
    <AccordionItem
      value={`item-${attribute?._id} `}
      className="bg-slate-100 overflow-auto px-3 border-b-0"
    >
      <AccordionTrigger className="hover:no-underline">
        {attribute?.name}
      </AccordionTrigger>
      <AccordionContent className=" space-y-5 min-h-[200px] ">
        <div className="flex ">
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
                onChange={handleChangeAttributeCofig}
                isMulti
                defaultValue={configs}
                options={attributeConfigs
                  ?.filter((config) => config?.attribute === attribute?._id)
                  ?.map((config) => ({
                    value: config?._id,
                    label: config?.name,
                  }))}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button type="button" onClick={handleSaveAttribute}>
            Save
          </Button>
          <Button type="button" className="bg-red-100 text-red-400">
            Delete
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AttributeLine;
