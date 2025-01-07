import { Bell, Fullscreen, Mail, Menu } from "lucide-react";

import React, { FC } from "react";
import ProfileDropdown from "../headers/ProfileDropdown";
type Props = {
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
const AdminHeader: FC<Props> = ({ setIsToggle }) => {
  return (
    <header className="h-[60px]  bg-white px-3 top-0 sticky w-full flex justify-between items-center">
      <Menu
        className="cursor-pointer"
        onClick={() => setIsToggle((prev) => !prev)}
      />
      <ul className="flex gap-2 items-center">
        <li>
          <div className="w-10 h-10 relative flex items-center justify-center rounded-full bg-slate-100">
            <Fullscreen size={20} className="cursor-pointer" />
          </div>
        </li>
        <li>
          <div className="w-10 cursor-pointer h-10 relative flex items-center justify-center rounded-full bg-slate-100">
            <Bell size={18} />
            <span className="px-1 text-xs font-semibold text-white rounded-full bg-primary absolute -top-1 -right-1">
              9+
            </span>
          </div>
        </li>
        <li>
          <div className="w-10 cursor-pointer h-10 relative flex items-center justify-center rounded-full bg-slate-100">
            <Mail size={18} />
            <span className="px-1 text-xs font-semibold text-white rounded-full bg-primary absolute -top-1 -right-1">
              9+
            </span>
          </div>
        </li>
        <li>
          <ProfileDropdown />
        </li>
      </ul>
    </header>
  );
};

export default AdminHeader;
