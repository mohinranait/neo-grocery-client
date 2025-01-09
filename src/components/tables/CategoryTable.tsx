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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const CategoryTable = () => {
  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <p className="font-semibold tracking-tight text-xl">All Categoris</p>
        <p className="text-sm text-muted-foreground">Manage your categoris</p>
      </div>
      <div className="p-6 pt-0">
        <div className="mb-4 flex items-center gap-4">
          <input
            type="text"
            placeholder="Filter categorie"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors   placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:opacity-50 md:text-sm"
          />
          <Select>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="cursor-pointer">
                All
              </SelectItem>
              <SelectItem value="Active" className="cursor-pointer">
                Active
              </SelectItem>
              <SelectItem value="Pending" className="cursor-pointer">
                Pending
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className=" overflow-y-auto">
          <div className="min-w-[550px] ">
            <Table className="w-full border  border-slate-100">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[20px]"></TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
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
                  <TableCell>10 Product</TableCell>
                  <TableCell>
                    <div className="flex">
                      <span className="inline-flex px-2 py-[2px] rounded bg-green-500 text-xs font-semibold text-white">
                        Active
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="pl-4">-</TableCell>

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
                  <TableCell>10 Product</TableCell>
                  <TableCell>
                    <div className="flex">
                      <span className="inline-flex px-2 py-[2px] rounded bg-red-500 text-xs font-semibold text-white">
                        Active
                      </span>
                    </div>
                  </TableCell>
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
  );
};

export default CategoryTable;
