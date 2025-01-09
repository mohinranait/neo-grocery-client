import React from "react";
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
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const AllProducts = () => {
  return (
    <div>
      <div className="w-full rounded-lg border bg-card text-card-foreground shadow">
        <div className="p-6 flex justify-between">
          <div>
            <p className="font-semibold tracking-tight text-xl">All Products</p>
            <p className="text-sm text-muted-foreground">Manage your product</p>
          </div>
          <div>
            <Link
              href={"/admin/product"}
              className="border border-slate-100 gap-1 bg-primary text-white rounded-[60px] inline-flex items-center justify-center py-1 text-sm  px-1 pl-2"
            >
              Add New
              <span className="inline-flex items-center justify-center p-2 rounded-full w-[30px] h-[30px] bg-white text-slate-900">
                <PlusIcon />
              </span>
            </Link>
          </div>
        </div>
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
                    <TableHead>Price</TableHead>
                    <TableHead>Feature</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
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
                          <p>Testyfy lucy</p>
                          <div className="flex mt-[2px] gap-1 items-center">
                            <span className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary">
                              Edit
                            </span>
                            <span className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary">
                              View
                            </span>
                            <span className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary">
                              Delete
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>100 BDT</TableCell>
                    <TableCell>
                      <div className="flex">
                        <span className="inline-flex px-2 py-[2px] rounded bg-green-500 text-xs font-semibold text-white">
                          Active
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="flex">
                      <div className="flex gap-2">
                        <Image
                          src={"/images/avater.jpg"}
                          className="w-[50] h-[50px] rounded"
                          width={50}
                          height={50}
                          alt="cat image"
                        />

                        <div>
                          <p>Testyfy lucy</p>
                          <div className="flex mt-[2px] gap-1 items-center">
                            <span className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary">
                              Edit
                            </span>
                            <span className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary">
                              View
                            </span>
                            <span className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary">
                              Delete
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-slate-800">Price: 110 BDT</p>
                      <p className="text-slate-500 text-sm">
                        Offer Price: 110 BDT
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        <span className="inline-flex px-2 py-[2px] rounded bg-red-500 text-xs font-semibold text-white">
                          Active
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex">
                        <span className="inline-flex px-2 py-[2px] rounded bg-red-500 text-xs font-semibold text-white">
                          Active
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>2 Qty</TableCell>
                  </TableRow>
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
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
