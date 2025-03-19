"use client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-medium">Orders</p>
          <p className="text-sm text-slate-500">Manage all orders</p>
        </div>
        <Link
          href={"/admin/product"}
          className="border border-slate-100 gap-1 bg-primary text-white rounded-[60px] inline-flex items-center justify-center py-1 text-sm  px-1 pl-2"
        >
          Custom Order
          <span className="inline-flex items-center justify-center p-2 rounded-full w-[30px] h-[30px] bg-white text-slate-900">
            <PlusIcon />
          </span>
        </Link>
      </div>
      <div className=" flex mt-2 justify-between items-center">
        <div className="space-x-3">
          <Link href={"/admin/orders"} className="text-sm py-1 relative ">
            All
          </Link>
          <Link
            href={"/admin/orders/pending"}
            className="text-sm py-1 relative "
          >
            Pending (4)
          </Link>
          <Link
            href={"/admin/orders/processing"}
            className="text-sm py-1 relative "
          >
            Processing (4)
          </Link>
          <Link
            href={"/admin/orders/delivered"}
            className="text-sm py-1 relative "
          >
            Complated
          </Link>
          <Link
            href={"/admin/orders/cancelled"}
            className="text-sm py-1 relative "
          >
            Cancel
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default OrderLayout;
