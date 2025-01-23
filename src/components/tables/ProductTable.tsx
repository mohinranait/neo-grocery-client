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
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { TProduct } from "@/types/product.type";
import ProductRow from "./ProductRow";
import DeleteModal from "../modals/DeleteModal";
import { deleteProduct, getAllProducts } from "@/actions/productApi";
import toast from "react-hot-toast";

import {
  setSelectedProduct,
  setProducts as setProductsRedux,
  setProducts,
} from "@/redux/features/productSlice";

type TFilterType = {
  search: string;
  status: string;
  features: string;
  firstDate: string;
  lastDate: string;
};

const generateQuery = (
  params: Record<string, string | string[] | Date>
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v !== undefined && v !== null && v !== "") {
            searchParams.append(key, v);
          }
        });
      } else {
        searchParams.append(key, value as string);
      }
    }
  });

  return searchParams.toString();
};

const ProductTable = () => {
  // Redux State
  const { products, selectedProduct } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();

  // Local State
  // const [products, setProducts] = useState<TProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  // filter state
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [features, setFeatures] = useState<string>("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  console.log({ date });

  // filter products
  const handleFilterProducts = async ({
    search,
    status,
    features,
    firstDate,
    lastDate,
  }: TFilterType) => {
    const query = {
      search,
      accessBy: "Admin",
      features: features == "All Feature" ? "All" : features,
      status: status == "All Status" ? "All" : status,
      firstDate,
      lastDate,
    };

    const qr = generateQuery(query);

    try {
      const data = await getAllProducts(qr);
      dispatch(setProducts(data?.payload?.products));
    } catch (error) {}
  };

  useEffect(() => {
    const fd: string = date?.from ? format(date.from, "yyyy-MM-dd") : "";
    const ld: string = date?.to ? format(date.to, "yyyy-MM-dd") : "";
    handleFilterProducts({
      search,
      status,
      features,
      firstDate: fd,
      lastDate: ld,
    });
  }, [search, status, features, date]);

  // Handle delete product by ID
  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const data = await deleteProduct(selectedProduct?._id as string);
      if (data?.success) {
        const arr = [...products];
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

  return (
    <div className="p-6 pt-0">
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Filter products"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="flex h-9  rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors   placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:opacity-50 md:text-sm"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] h-9 justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select onValueChange={(e) => setStatus(e)}>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="All Status" className="cursor-pointer">
                All
              </SelectItem>
              <SelectItem value="Active" className="cursor-pointer">
                Active
              </SelectItem>
              <SelectItem value="Inactive" className="cursor-pointer">
                Pending
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(e) => setFeatures(e)}>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="All Feature" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Features</SelectLabel>
              <SelectItem value="All Feature" className="cursor-pointer">
                All
              </SelectItem>
              <SelectItem value="Active" className="cursor-pointer">
                Active
              </SelectItem>
              <SelectItem value="Inactive" className="cursor-pointer">
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
