"use client";
import { userLogout } from "@/actions/authApi";
import { getAllProducts } from "@/actions/productApi";
import AdminAuthLayout from "@/components/admin/AdminAuthLayout";
import useAxios from "@/hooks/useAxios";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  logoutUser,
  setAuthUser,
  setLoading,
} from "@/redux/features/authSlice";
import { setProducts } from "@/redux/features/productSlice";
import React, { Suspense, useEffect } from "react";
import toast from "react-hot-toast";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`/user`);
        if (data?.success) {
          dispatch(setAuthUser(data.payload));
        } else {
          await userLogout();
          dispatch(logoutUser());
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        // Call API for get all Products
        const data = await getAllProducts("accessBy=Admin");
        if (data?.success) {
          dispatch(setProducts(data?.payload?.products));
        }
      } catch (error: unknown) {
        toast.error(`${error}`);
      }
    })();
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <AdminAuthLayout component={children} />
    </Suspense>
  );
};

export default AdminLayout;
