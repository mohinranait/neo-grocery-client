import { Menu } from "lucide-react";
import React from "react";

const AdminHeader = () => {
  return (
    <header className="h-[60px] bg-red-500 top-0 sticky w-full flex items-center">
      <Menu />
      Header
    </header>
  );
};

export default AdminHeader;
