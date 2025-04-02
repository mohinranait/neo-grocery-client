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
import { TOrder } from "@/types/order.type";
import { Button } from "../ui/button";
import { format } from "date-fns";

type Props = {
  order: TOrder;
};
const OrderItemTable = ({ order }: Props) => {
  const totaoPrice = order.items?.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );
  return (
    <>
      <div className="  bg-white rounded-md shadow">
        <div className="flex pt-4 px-4 justify-between items-center">
          <div>
            <p className="text-base font-semibold text-black">Products</p>
            <p className="text-sm font-medium text-gray-500">
              Your order items
            </p>
          </div>
          <div>
            <Button
              className="h-[30px] px-2 rounded"
              variant={"outline"}
              type="button"
            >
              Download Invoice
            </Button>
          </div>
        </div>
        <div className="px-4 pt-4  ">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-4xl uppercase font-extrabold">Invoice</p>
              <p className=" uppercase font-semibold">#{order?.uid}</p>
            </div>
            <p className="text-gray-600">
              {" "}
              <span className="text-gray-900 font-semibold">Date:</span>{" "}
              {format(new Date(), "MMM dd, yyyy")}{" "}
            </p>
            <div className="grid grid-cols-2 pb-4 gap-2">
              <div className="">
                <p className="text-gray-600">
                  {order?.shippingAddress?.address}
                </p>
                <p className="text-gray-600">
                  {order?.shippingAddress?.city},
                  {order?.shippingAddress?.postalCode}
                </p>
                <p className="text-gray-600">
                  <span className="text-gray-900 font-semibold">Phone:</span>
                  {order?.phone}
                </p>
              </div>
              <div className="">
                <p className="text-gray-600 text-right">
                  {order?.shippingAddress?.address}
                </p>
                <p className="text-gray-600 text-right">
                  {order?.shippingAddress?.city},
                  {order?.shippingAddress?.postalCode}
                </p>
                <p className="text-gray-600 text-right">
                  <span className="text-gray-900 font-semibold">Phone:</span>
                  {order?.phone}
                </p>
              </div>
            </div>
          </div>

          <Table
            className="bg-gray-200 px-[2px] border-separate  "
            style={{ borderSpacing: "0 6px", border: "none" }}
          >
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
                <TableHead className="border-r border-gray-200">Tax</TableHead>
                <TableHead className="text-right border-r border-gray-200">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white ">
              {order?.items?.map((item, i) => (
                <TableRow key={i} className="">
                  <TableCell
                    className={`pl-0 pr-2 font-medium py-0 border-r border-gray-200`}
                  >
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="w-[50px] h-[50px]">
                          <Image
                            src={
                              item?.image ? item?.image : "/images/image.png"
                            }
                            width={50}
                            height={50}
                            alt="Image"
                            className="w-[50px] h-[50px]"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-700">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {" "}
                          {item?.attributes &&
                            Object.keys(item?.attributes)?.map(
                              (key) => `${key}:`
                            )}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className=" py-0 border-r border-gray-200">
                    {item?.quantity}
                  </TableCell>
                  <TableCell className="py-0 border-r border-gray-200 text-right">
                    ${item?.price}
                  </TableCell>
                  <TableCell className="py-0 border-r border-gray-200 text-right">
                    {/* {item?.tax} */}a
                  </TableCell>
                  <TableCell className="py-0 text-right">
                    ${item?.price * item?.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-white">
              <TableRow>
                <TableCell colSpan={4} className="border-r border-gray-200">
                  Total
                </TableCell>
                <TableCell className="text-right">${totaoPrice}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <div className="mt-5 pb-2">
            <p className="text-gray-600 ">
              <span className="text-gray-900 font-semibold">
                Payment Method:
              </span>
              Cash
            </p>
            <p className="text-gray-600 ">
              <span className="text-gray-900 font-semibold">Note:</span>
              Thank you for your purchase
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItemTable;
