"use client";
import React, { useEffect } from "react";

import BrandTable from "@/components/tables/BrandTable";
import BrandForm from "@/components/forms/BrandForm";
import { useAppDispatch } from "@/hooks/useRedux";
import { getAllBrands } from "@/actions/brandApi";
import { addBrand } from "@/redux/features/brandSlice";
import toast from "react-hot-toast";

const BrandPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      try {
        // Call API for load all brands
        const data = await getAllBrands();
        if (data?.success) {
          dispatch(addBrand({ data: data?.payload, type: "Array" }));
        }
      } catch (error: unknown) {
        toast.error(`${error}`);
      }
    })();
  }, [dispatch]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className=" lg:min-w-[350px]  ">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="flex flex-col  p-6">
              <div className="font-semibold tracking-tight text-xl">
                Create new Brand
              </div>
              <div className="text-sm text-muted-foreground">
                Create and update all brand information
              </div>
            </div>
            <div className="p-6 pt-0">
              <BrandForm />
            </div>
          </div>
        </div>
        <div className=" lg:w-full">
          <BrandTable />
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
