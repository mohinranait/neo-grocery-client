"use client";
import AdminAside from "@/components/admin/shared/AdminAside";
import AdminHeader from "@/components/admin/shared/AdminHeader";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isToggle, setIsToggle] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const pathName = usePathname();
  const tablate = useMediaQuery({ maxWidth: 768 });

  // This useEffect call when change route for mobile
  useEffect(() => {
    if (tablate) {
      setIsMobileMenu(false);
    }
  }, [pathName, tablate]);
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="flex  min-h-screen ">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <div className="sticky h-screen  overflow-x-hidden top-0 bottom-0">
            <AdminAside isToggle={isToggle} setIsToggle={setIsToggle} />
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`md:hidden transition-all duration-500 fixed  ${
            isMobileMenu ? "translate-x-0" : "-translate-x-full overflow-hidden"
          }  z-10  bottom-0 h-screen top-0  bg-black left-0`}
        >
          <span
            onClick={() => setIsMobileMenu(false)}
            className="absolute top-3 right-3 z-20"
          >
            <X />
          </span>
          <AdminAside isToggle={false} setIsToggle={setIsToggle} />
        </div>

        {/* Main body for admin dashboard */}
        <div className="w-full bg-gray-100 h-full">
          {/* Admin header  */}
          <AdminHeader
            setIsToggle={setIsToggle}
            setIsMobileMenu={setIsMobileMenu}
          />
          {/* Children for render all page here */}
          <div>{children}</div>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminLayout;
