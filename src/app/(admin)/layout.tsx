"use client";
import AdminAside from "@/components/admin/shared/AdminAside";
import AdminHeader from "@/components/admin/shared/AdminHeader";
import React, { Suspense, useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isToggle, setIsToggle] = useState(false);
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="flex overflow-x-hidden min-h-screen ">
        <div>
          <AdminAside isToggle={isToggle} setIsToggle={setIsToggle} />
        </div>

        <div className="w-full bg-gray-100 h-full">
          <AdminHeader setIsToggle={setIsToggle} />
          <div>{children}</div>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminLayout;
