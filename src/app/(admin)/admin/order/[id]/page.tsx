"use client";
import { Button } from "@/components/ui/button";
import { Home, Undo2, User } from "lucide-react";
import React from "react";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";
import Link from "next/link";
import { format } from "date-fns";
import OrderItemTable from "@/components/tables/OrderItemTable";
import OrderStatusSection from "@/components/pages/Order/OrderStatusSection";
import { TOrderStatus } from "@/types/order.type";

const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  const { orders } = useAppSelector((state) => state.order);
  const id = params?.id;
  const order = orders?.find((order) => order?._id === id);
  const totalTax =
    order?.items?.reduce((acc, item) => acc + (item?.tax || 0), 0) || 0;
  const totalShipping =
    order?.items?.reduce((acc, item) => acc + (item?.shippingCharge || 0), 0) ||
    0;
  const subTotal =
    order?.totalAmount &&
    order?.totalAmount - ((totalShipping || 0) + (totalTax || 0));
  console.log("order", order);

  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center gap-3 mb-3">
        <div className="flex gap-2 items-start">
          <button
            onClick={() => {
              router.back();
            }}
            className="p-1 border-gray-400 border rounded bg-gray-100 "
          >
            <Undo2 />
          </button>
          <div>
            <p className="text-2xl font-semibold text-black uppercase">
              #ORD-{order?.uid}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              Order Date -{" "}
              {order &&
                format(new Date(order.createdAt), "MMM dd, yyyy hh:mm a")}
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            size={"sm"}
            variant={"outline"}
            className="bg-red-50 hover:bg-red-50 border border-red-500 text-red-500 hover:text-red-500"
          >
            Delete Order
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="bg-gray-50 hover:bg-gray-50 border border-black text-black hover:text-black"
          >
            Track Order
          </Button>
          <Button size={"sm"}>
            <Link href={`/admin/order/edit/${id}`} target="_blank">
              Edit Order
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3  lg:grid-cols-3">
        <div className="space-y-3 col-span-2">
          <div className="p-4 bg-white rounded-md shadow">
            <div className="flex pb-3 justify-between items-center">
              <div>
                <p className="text-base font-semibold text-black">Progress</p>
                <p className="text-sm font-medium text-gray-500">
                  Current order status
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 bg-gray-100 p-2 rounded gap-2 ">
              {<OrderStatusSection status={order?.status as TOrderStatus} />}
            </div>
          </div>
          {order && <OrderItemTable order={order} />}
        </div>
        <div className="col-span-1 space-y-3">
          <div className="p-4 bg-white  rounded-md shadow">
            <div className="flex pb-3 justify-between items-center">
              <div>
                <p className="text-base font-semibold text-black">Payment</p>
                <p className="text-sm font-medium text-gray-500">
                  Final payment information
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 space-y-2 rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-500">Subtotal</p>
                <p className="text-sm font-semibold text-black">
                  ${subTotal?.toFixed(2)}
                </p>
              </div>
              {totalTax > 0 && (
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-500">Tax</p>
                  <p className="text-sm font-semibold text-black">
                    ${totalTax?.toFixed(2)}
                  </p>
                </div>
              )}

              {totalShipping > 0 && (
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-500">Shipping</p>
                  <p className="text-sm font-semibold text-black">
                    ${totalShipping?.toFixed(2)}
                  </p>
                </div>
              )}

              <span className="h-[1px] w-full bg-gray-300 inline-block"></span>
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-black">Total</p>
                <p className="text-sm font-semibold text-black">
                  ${order?.totalAmount?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white  rounded-md shadow">
            <div className="flex pb-3 justify-between items-center">
              <div>
                <p className="text-base font-semibold text-black">Customer</p>
                <p className="text-sm font-medium text-gray-500">
                  Customer information
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-2 space-y-3 rounded-md">
              <div className="flex p-3 rounded bg-white items-start gap-2">
                <div>
                  <Home size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">
                    Shipping Address
                  </p>
                  {order?.userId ? (
                    <ul className="list-disc mt-1 space-y-1 list-inside text-sm text-gray-500">
                      <li>
                        {order?.shippingAddressId?.firstName}{" "}
                        {order?.shippingAddressId?.lastName}
                      </li>
                      <li>{order?.phone}</li>
                      <li>
                        {order?.shippingAddressId?.address},{" "}
                        {order?.shippingAddressId?.city},{" "}
                        {order?.shippingAddressId?.postalCode}
                      </li>
                      <li>Pickup From: {order?.shippingAddressId?.type}</li>
                    </ul>
                  ) : (
                    <ul className="list-disc mt-1 space-y-1 list-inside text-sm text-gray-500">
                      <li>
                        {" "}
                        {order?.shippingAddress?.firstName}{" "}
                        {order?.shippingAddress?.lastName}
                      </li>
                      <li>{order?.phone}</li>
                      <li>
                        {order?.shippingAddress?.address},
                        {order?.shippingAddress?.city},{" "}
                        {order?.shippingAddress?.postalCode}
                      </li>
                      <li>Pickup From: {order?.shippingAddress?.type}</li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex p-3 rounded bg-white items-start gap-2">
                <div>
                  <Home size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">
                    Biling Address
                  </p>
                  <ul className="list-disc mt-1 space-y-1 list-inside text-sm text-gray-500">
                    <li>Same as shipping address</li>
                  </ul>
                </div>
              </div>
              <div className="flex p-3 rounded bg-white items-start gap-2">
                <div>
                  <User size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">
                    General Information
                  </p>
                  <ul className="list-disc mt-1 space-y-1 list-inside text-sm text-gray-500">
                    <li>user@gmail.com</li>
                    <li>+54215411</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
