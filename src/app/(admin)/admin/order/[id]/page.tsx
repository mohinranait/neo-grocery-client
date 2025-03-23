"use client";
import { Button } from "@/components/ui/button";
import { Home, Undo2, User } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";

const OrderDetailsPage = () => {
  const router = useRouter();
  const items = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Electronics - Small",
      status: "Ready",
      quantity: 3,
      price: "$20.00",
      tax: "$3.00",
      amount: "$57.00",
      image: "/images/image.png",
    },
    {
      id: 2,
      name: "ASUS ZenBook",
      category: "Electronics - Large",
      status: "Packaging",
      quantity: 1,
      price: "$2,499.99",
      tax: "$187.50",
      amount: "$2,687.49",
      image: "/images/image.png",
    },
    {
      id: 3,
      name: "Modern Toaster",
      category: "Kitchen - Small",
      status: "Packaging",
      quantity: 2,
      price: "$129.99",
      tax: "$9.74",
      amount: "$269.72",
      image: "/images/image.png",
    },
    {
      id: 4,
      name: "Kindle Paperwhite",
      category: "Electronics - Large",
      status: "Ready",
      quantity: 2,
      price: "$139.99",
      tax: "$21.00",
      amount: "$300.98",
      image: "/images/image.png",
    },
  ];

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
            <p className="text-2xl font-semibold text-black">#S-454as</p>
            <p className="text-sm text-gray-500 font-medium">
              Order history / Order Details - Apr 2, 2025{" "}
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
          <Button size={"sm"}>Edit Order</Button>
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
              <div className="bg-white flex  rounded p-4 flex-col gap-2 items-center">
                <div className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full">
                  <p className="text-lg font-semibold text-gray-500">1</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-center font-medium text-gray-500">
                    Pending
                  </p>
                </div>
              </div>
              <div className="bg-white flex  rounded p-4 flex-col gap-2 items-center">
                <div className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full">
                  <p className="text-lg font-semibold text-gray-500">2</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-center font-medium text-gray-500">
                    Processing
                  </p>
                </div>
              </div>
              <div className="bg-white flex rounded p-4 flex-col gap-2 items-center">
                <div className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full">
                  <p className="text-lg font-semibold text-gray-500">3</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-center font-medium text-gray-500">
                    Shipped
                  </p>
                </div>
              </div>
              <div className="bg-white flex rounded p-4 flex-col gap-2 items-center">
                <div className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full">
                  <p className="text-lg font-semibold text-gray-500">4</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-center font-medium text-gray-500">
                    Delivery
                  </p>
                </div>
              </div>
              <div className="bg-white flex rounded p-4 flex-col gap-2 items-center">
                <div className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full">
                  <p className="text-lg font-semibold text-gray-500">5</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-center font-medium text-gray-500">
                    Cancel
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-md shadow">
            <div className="flex pb-3 justify-between items-center">
              <div>
                <p className="text-base font-semibold text-black">Products</p>
                <p className="text-sm font-medium text-gray-500">
                  Your order items
                </p>
              </div>
            </div>
            <div>
              <Table
                className="bg-gray-200 px-[2px] border-separate  "
                style={{ borderSpacing: "0 6px", border: "none" }}
              >
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader className="bg-white ">
                  <TableRow>
                    <TableHead className="min-w-[250px] border-r border-gray-200">
                      Items
                    </TableHead>
                    <TableHead className="border-r border-gray-200">
                      Quantity
                    </TableHead>
                    <TableHead className="border-r border-gray-200">
                      Price
                    </TableHead>
                    <TableHead className="border-r border-gray-200">
                      Tax
                    </TableHead>
                    <TableHead className="text-right border-r border-gray-200">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white ">
                  {items.map((item, i) => (
                    <TableRow key={i} className="">
                      <TableCell
                        className={`pl-0 pr-2 font-medium py-0 border-r border-gray-200`}
                      >
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="w-[50px] h-[50px]">
                              <Image
                                src={item?.image}
                                width={50}
                                height={50}
                                alt="Image"
                                className="w-[50px] h-[50px]"
                              />
                            </div>
                          </div>
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell className=" py-0 border-r border-gray-200">
                        {item?.quantity}
                      </TableCell>
                      <TableCell className="py-0 border-r border-gray-200 text-right">
                        {item?.price}
                      </TableCell>
                      <TableCell className="py-0 border-r border-gray-200 text-right">
                        {item?.tax}
                      </TableCell>
                      <TableCell className="py-0 text-right">
                        {item?.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="bg-white">
                  <TableRow>
                    <TableCell colSpan={4} className="border-r border-gray-200">
                      Total
                    </TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
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
                <p className="text-sm font-semibold text-black">$10</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-500">Discount</p>
                <p className="text-sm font-semibold text-black">5%</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-500">Tax</p>
                <p className="text-sm font-semibold text-black">$80</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-500">Shipping</p>
                <p className="text-sm font-semibold text-black">$10</p>
              </div>
              <span className="h-[1px] w-full bg-gray-300 inline-block"></span>
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-black">Total</p>
                <p className="text-sm font-semibold text-black">$100</p>
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
                  <ul className="list-disc mt-1 space-y-1 list-inside text-sm text-gray-500">
                    <li>Mahir Shikder</li>
                    <li>01246787445</li>
                    <li>Barguna, Barishal, Dhaka</li>
                    <li>Zip: 44545</li>
                  </ul>
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
