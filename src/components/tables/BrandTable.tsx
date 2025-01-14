"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import DeleteModal from "../modals/DeleteModal";
import { deleteBrand } from "@/actions/brandApi";
import { addBrand, setSelectedBrand } from "@/redux/features/brandSlice";
import toast from "react-hot-toast";
import BrandUpdateModal from "../modals/BrandUpdateModal";

const BrandTable = () => {
  const dispatch = useAppDispatch();
  const { brands, selectedBrand } = useAppSelector((state) => state.brand);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [brandEditModal, setBrandEditModal] = useState<boolean>(false);
  /**
   * Delete Brand Using API
   */
  const handleDelete = async () => {
    if (!selectedBrand?._id) return;

    try {
      setDeleteLoading(true);
      // Call API for Delete brand by ID
      const data = await deleteBrand(`${selectedBrand?._id}`);

      if (data.success) {
        const updatedBrands = brands.filter(
          (brand) => brand._id !== selectedBrand?._id
        );
        // Update UI
        dispatch(addBrand({ data: updatedBrands, type: "Array" }));
        toast.success("Brand is deleted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
      dispatch(setSelectedBrand(null));
      setDeleteLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <p className="font-semibold tracking-tight text-xl">All Brands</p>
        <p className="text-sm text-muted-foreground">Manage your brands</p>
      </div>
      <div className="p-6 pt-0">
        <div className="mb-4 flex items-center gap-4">
          <input
            type="text"
            placeholder="Filter brands"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors   placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:opacity-50 md:text-sm"
          />
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 ml-auto"
            type="button"
            id="radix-:r71:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            Columns{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chevron-down "
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
        </div>
        <Table className="w-full border border-slate-100">
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands?.map((brand, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex gap-2">
                    <Image
                      src={"/images/avater.jpg"}
                      className="w-[50] h-[50px] rounded"
                      width={50}
                      height={50}
                      alt="cat image"
                    />

                    <div>
                      <p>{brand?.name}</p>
                      <div className="flex mt-[2px] gap-1 items-center">
                        <span
                          onClick={() => {
                            dispatch(setSelectedBrand(brand));
                            setBrandEditModal(true);
                          }}
                          className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary"
                        >
                          Edit
                        </span>
                        <span className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary">
                          View
                        </span>
                        <span
                          onClick={() => {
                            dispatch(setSelectedBrand(brand));
                            setIsOpen(true);
                          }}
                          className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary"
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>10 Product</TableCell>
                <TableCell>
                  <div className="flex">
                    {brand?.status === "Active" ? (
                      <span className="inline-flex px-2 py-[2px] rounded bg-green-500 text-xs font-semibold text-white">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-[2px] rounded bg-red-500 text-xs font-semibold text-white">
                        Inactive
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 pt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            0 of 4 row(s) selected.
          </div>
          <div className="space-x-2">
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
              disabled={true}
            >
              Previous
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
              disabled={true}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
        isLoading={deleteLoading}
      />
      <BrandUpdateModal isOpen={brandEditModal} setIsOpen={setBrandEditModal} />
    </div>
  );
};

export default BrandTable;
