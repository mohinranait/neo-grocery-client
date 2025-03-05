import React, { use, useEffect, useState } from "react";
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
import { TProduct, TVariation } from "@/types/product.type";
import SelectImageFromModal from "@/components/shared/SelectImageFromModal";
import { TMediaType } from "@/types/media.type";
import { addVariant, setIsModal } from "@/redux/features/mediaSlice";

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
  const [files, setFiles] = useState<TMediaType | null>(null);
  const [varIndex, setVarIndex] = useState<number | null>(null);
  // Local state
  const [selectAttribute, setSelectAttribute] = useState<string | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<
    TAttributeType[]
  >([]);

  const handleAddVariabtion = (type: "default" | "custom" = "default") => {
    // const find = attributes?.find((attr) => attr?._id === selectAttribute);
    const singleProduct: TProduct = { ...product };
    const variantId = new Date().getTime().toString().slice(-2);
    console.log({ variantId });

    if (type === "default") {
      const attrIds: string[] =
        singleProduct?.attributes
          ?.map((attr) => attr?.attribute)
          .filter((attr): attr is string => !!attr) ?? [];

      dispatch(
        setProduct({
          ...singleProduct,
          variations: [
            ...(singleProduct.variations || []),
            {
              variantId: variantId.toString(),
              attributes: attrIds,
              attributeConfigs: [],
              offerPirce: 0,
              productPrice: 0,
              description: "",
              image: "",
              sku: "",
              shipping: {
                weight: 0,
                length: 0,
                width: 0,
                height: 0,
              },
            },
          ],
        })
      );
    } else {
      // custom variabtion add here
    }
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

  // Add variant attribute value here
  const handleAddVariables = (
    id: string,
    variantIndex: number,
    attributeIndex: number
  ) => {
    // id = Attribute value id
    // variantIndex = variant index
    // attributeIndex = attribute index

    // This is existing product
    const singleProduct = { ...product };
    // Existing product variations
    const variations = [...singleProduct?.variations];
    // Existing product attribute configs
    let attributeConfigs = [...variations[variantIndex]?.attributeConfigs];
    const findIndex = attributeConfigs.findIndex(
      (attr) => attr?.attrIndex === attributeIndex
    );

    if (findIndex !== -1) {
      attributeConfigs[findIndex] = {
        ...attributeConfigs[findIndex],
        attrIndex: attributeIndex,
        value: id,
      };
    } else {
      attributeConfigs = [
        ...attributeConfigs,
        {
          attrIndex: attributeIndex,
          value: id,
        },
      ];
    }

    variations[variantIndex] = {
      ...variations[variantIndex],
      attributeConfigs,
    };

    dispatch(
      setProduct({
        ...singleProduct,
        variations: [...variations],
      })
    );
  };

  // handle remove variation
  const handleRemoveVariation = (index: number) => {
    const singleProduct = { ...product };
    const variations = [...singleProduct?.variations];
    variations.splice(index, 1);

    dispatch(
      setProduct({
        ...singleProduct,
        variations: [...variations],
      })
    );
  };

  // handle update variant
  const handleUpdateVariant = (
    value: string | number,
    index: number,
    parentKey: keyof TVariation | "shipping",
    childKey?: keyof TVariation["shipping"]
  ) => {
    console.log({ value, index, parentKey, childKey });

    const singleProduct = { ...product };
    const variations = [...singleProduct.variations];

    if (parentKey === "shipping" && childKey) {
      // Update nested shipping properties
      variations[index] = {
        ...variations[index],
        shipping: {
          ...variations[index].shipping,
          [childKey]: Number(value),
        },
      };
    } else {
      // Update top-level properties
      variations[index] = {
        ...variations[index],
        [parentKey]: value,
      };
    }

    dispatch(
      setProduct({
        ...singleProduct,
        variations,
      })
    );
  };

  // update image
  const handleUpdateImage = (url: string, index: number) => {
    const singleProduct = { ...product };
    const variations = [...singleProduct.variations];
    variations[index] = {
      ...variations[index],
      image: url,
    };

    dispatch(
      setProduct({
        ...singleProduct,
        variations,
      })
    );
  };

  useEffect(() => {
    if (files && varIndex !== null) {
      handleUpdateImage(files.fileUrl, varIndex);
    } else {
      setFiles(null);
      setVarIndex(null);
    }
  }, [files]);

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
            {existsAttributes?.map((attr, index) => (
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
          onClick={() => handleAddVariabtion("default")}
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
        {product?.variations?.length > 0 &&
          product?.variations?.map((variant, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-slate-100 overflow-auto px-3 border-b-0"
            >
              <AccordionTrigger className="hover:no-underline ">
                <div className="flex items-center justify-between w-full pr-6">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">#{variant?.variantId}</span>
                    {existsAttributes?.map((attr, attrIndex) => {
                      const matchConfigs = existsConfigs?.filter(
                        (config) => config?.attribute === attr?._id
                      );
                      return (
                        <Select
                          key={attr?._id}
                          value={
                            variant?.attributeConfigs?.find(
                              (config) => config?.attrIndex === attrIndex
                            )?.value
                          }
                          onValueChange={(e) =>
                            handleAddVariables(e, i, attrIndex)
                          }
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
                    <button
                      type="button"
                      onClick={() => handleRemoveVariation(i)}
                      className="text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="  py-3 w-full gap-5 min-h-[200px] ">
                <div className="  w-full ">
                  <div className="space-y-3 px-1">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-3">
                        <SelectImageFromModal singleFile={setFiles}>
                          <div
                            onClick={() => {
                              dispatch(setIsModal(true));
                              dispatch(addVariant("Single"));
                              setVarIndex(i);
                            }}
                            style={{
                              backgroundImage: `url('${variant?.image}')`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                            className="flex items-center justify-center w-[50px] h-[50px] border border-slate-300 cursor-pointer border-dashed rounded"
                          >
                            <UploadIcon />
                          </div>
                        </SelectImageFromModal>
                        <div className="flex items-center justify-center w-[50px] h-[50px] border border-dashed rounded">
                          <UploadIcon />
                        </div>
                      </div>
                      <div className="w-full">
                        <label htmlFor="" className="text-sm text-gray-600">
                          SKU (unique)
                        </label>
                        <input
                          id="SKU"
                          type="text"
                          min={0}
                          className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          value={variant?.sku}
                          onChange={(e) =>
                            handleUpdateVariant(e.target.value, i, "sku")
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="" className="text-sm text-gray-600">
                          Regular Price
                        </label>
                        <input
                          id="productPrice"
                          type="text"
                          min={0}
                          className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          value={variant?.productPrice}
                          onChange={(e) =>
                            handleUpdateVariant(
                              Number(e.target.value),
                              i,
                              "productPrice"
                            )
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="text-sm text-gray-600">
                          Offer Price
                        </label>
                        <input
                          id="offerPrice"
                          type="text"
                          min={0}
                          className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          value={variant?.offerPirce}
                          onChange={(e) =>
                            handleUpdateVariant(
                              Number(e.target.value),
                              i,
                              "offerPirce"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="" className="text-sm text-gray-600">
                          Weight (g)
                        </label>
                        <input
                          id="weight"
                          type="number"
                          min={0}
                          className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          value={variant?.shipping?.weight}
                          onChange={(e) =>
                            handleUpdateVariant(
                              e.target.value,
                              i,
                              "shipping",
                              "weight"
                            )
                          }
                        />
                      </div>
                      <div className="">
                        <div>
                          <label htmlFor="" className="text-sm text-gray-600">
                            Dimentions (L,W,H) (cm)
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              id="length"
                              type="number"
                              min={0}
                              placeholder="Length"
                              className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              value={variant?.shipping?.length}
                              onChange={(e) =>
                                handleUpdateVariant(
                                  e.target.value,
                                  i,
                                  "shipping",
                                  "length"
                                )
                              }
                            />
                            <input
                              id="width"
                              type="number"
                              min={0}
                              placeholder="Width"
                              className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              value={variant?.shipping?.width}
                              onChange={(e) =>
                                handleUpdateVariant(
                                  e.target.value,
                                  i,
                                  "shipping",
                                  "width"
                                )
                              }
                            />
                            <input
                              id="height"
                              type="number"
                              min={0}
                              placeholder="Height"
                              className="flex h-8 w-full bg-white rounded-md border border-input bg-transparent pr-3 pl-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              value={variant?.shipping?.height}
                              onChange={(e) =>
                                handleUpdateVariant(
                                  e.target.value,
                                  i,
                                  "shipping",
                                  "height"
                                )
                              }
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
                        onChange={(e) =>
                          handleUpdateVariant(e.target.value, i, "description")
                        }
                        value={variant?.description}
                        id=""
                      ></textarea>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default AttributeComponent;
