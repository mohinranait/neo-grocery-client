"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { TProduct } from "@/types/product.type";
import ProductRow from "./ProductRow";
import DeleteModal from "../modals/DeleteModal";
import { deleteProduct } from "@/actions/productApi";
import toast from "react-hot-toast";
import {
  setSelectedProduct,
  setProducts as setProductsRedux,
} from "@/redux/features/productSlice";
const ProductTable = () => {
  // Redux State
  const { products: getAllProducts, selectedProduct } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();

  // Local State
  const [products, setProducts] = useState<TProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // Handle delete product by ID
  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const data = await deleteProduct(selectedProduct?._id as string);
      if (data?.success) {
        const arr = [...getAllProducts];
        const filter = arr?.filter(
          (product) => product?._id !== selectedProduct?._id
        );
        dispatch(setProductsRedux(filter));
        toast.success("Delete successfull");
      } else {
        toast.error("Somthing wrong");
      }
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
      dispatch(setSelectedProduct(null));
    }
  };

  useEffect(() => {
    setProducts(getAllProducts);
  }, [getAllProducts]);

  return (
    <div className="p-6 pt-0">
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Filter products"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors   placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:opacity-50 md:text-sm"
        />
        <Select>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="All" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Features</SelectLabel>
              <SelectItem value="All" className="cursor-pointer">
                All
              </SelectItem>
              <SelectItem value="Active" className="cursor-pointer">
                Active
              </SelectItem>
              <SelectItem value="Pending" className="cursor-pointer">
                Pending
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="All" className="cursor-pointer">
                All
              </SelectItem>
              <SelectItem value="Active" className="cursor-pointer">
                Active
              </SelectItem>
              <SelectItem value="Pending" className="cursor-pointer">
                Pending
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className=" overflow-y-auto">
        <div className="min-w-[550px] ">
          <Table className="w-full border  border-slate-100">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU ID</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Feature</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product, index) => (
                <ProductRow
                  key={index}
                  product={product}
                  products={products}
                  setIsOpen={setIsOpen}
                />
              ))}
            </TableBody>
          </Table>{" "}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          0 of 4 row(s) selected.
        </div>
        <div className="space-x-2">
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
            disabled={true}
          >
            Previous
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
            disabled={true}
          >
            Next
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
        isLoading={deleteLoading}
      />
    </div>
  );
};

export default ProductTable;
