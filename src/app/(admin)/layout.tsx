"use client";
import AdminAside from "@/components/admin/shared/AdminAside";
import AdminHeader from "@/components/admin/shared/AdminHeader";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-blue-400">
      <div>
        <AdminAside />
      </div>

      <div className="w-full bg-gray-300 h-full">
        <AdminHeader />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
