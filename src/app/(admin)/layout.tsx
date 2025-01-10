"use client";
import { userLogout } from "@/actions/authApi";
import AdminAuthLayout from "@/components/admin/AdminAuthLayout";
import useAxios from "@/hooks/useAxios";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  logoutUser,
  setAuthUser,
  setLoading,
} from "@/redux/features/authSlice";
import React, { Suspense, useEffect } from "react";

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

  return (
    <Suspense fallback={<div>Loading</div>}>
      <AdminAuthLayout component={children} />
    </Suspense>
  );
};

export default AdminLayout;
