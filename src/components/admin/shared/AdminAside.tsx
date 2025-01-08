"use client";
import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  ShoppingBasket,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
type Props = {
  isToggle: boolean;
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
const AdminAside: FC<Props> = ({ isToggle }) => {
  return (
    <>
      <Sidebar collapsed={isToggle} toggled={true} className="bg-white">
        <div className="pl-5 h-[60px] flex items-center ">
          {isToggle ? (
            <span className="text-xl font-bold">Neo</span>
          ) : (
            <Link
              href={"/admin/dashboard"}
              className="text-2xl  font-extralight "
            >
              Neo Grocery
            </Link>
          )}
        </div>
        <Menu
          closeOnClick={true}
          className={`overflow-y-auto h-[calc(100vh-60px)]  scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100 `}
        >
          <MenuItem
            icon={<LayoutDashboard />}
            component={<Link href="/admin/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <SubMenu icon={<ShoppingBasket />} label="E-commarce">
            <MenuItem component={<Link href={"/admin/orders"} />}>
              Orders
            </MenuItem>
            <MenuItem component={<Link href={"/admin/customers"} />}>
              Customers
            </MenuItem>
            <MenuItem>Setting</MenuItem>
          </SubMenu>
          <SubMenu icon={<CreditCard />} label="Products">
            <MenuItem component={<Link href={"/admin/all-products"} />}>
              All Products
            </MenuItem>
            <MenuItem component={<Link href={"/admin/product"} />}>
              New Product
            </MenuItem>
            <MenuItem component={<Link href={"/admin/attribute"} />}>
              Attribute
            </MenuItem>
            <MenuItem component={<Link href={"/admin/categorys"} />}>
              Categorys
            </MenuItem>
            <MenuItem component={<Link href={"/admin/brands"} />}>
              Brands
            </MenuItem>
          </SubMenu>
          <SubMenu icon={<Users />} label="Users">
            <MenuItem> Active User </MenuItem>
            <MenuItem> Pending User </MenuItem>
            <MenuItem> Pending User </MenuItem>
          </SubMenu>
          <MenuItem icon={<Calendar />}> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default AdminAside;
