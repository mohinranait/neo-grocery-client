import { Calendar, LayoutDashboard, ShoppingBasket, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
const AdminAside = () => {
  return (
    <div className="sticky h-screen overflow-y-auto overflow-x-hidden top-0 bottom-0">
      <Sidebar collapsed={false} toggled={true}>
        <div className="pl-5">
          <Link href={"/admin/dashboard"} className="text-2xl font-extralight ">
            Neo Grocery
          </Link>
        </div>
        <Menu closeOnClick={true}>
          <MenuItem
            icon={<LayoutDashboard />}
            component={<Link href="/admin/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <SubMenu icon={<ShoppingBasket />} label="E-commarce">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu icon={<Users />} label="Users">
            <MenuItem> Active User </MenuItem>
            <MenuItem> Pending User </MenuItem>
            <MenuItem> Pending User </MenuItem>
          </SubMenu>
          <MenuItem icon={<Calendar />}> Calendar </MenuItem>
          <MenuItem
            icon={<LayoutDashboard />}
            component={<Link href="/admin/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <SubMenu icon={<ShoppingBasket />} label="E-commarce">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu icon={<Users />} label="Users">
            <MenuItem> Active User </MenuItem>
            <MenuItem> Pending User </MenuItem>
            <MenuItem> Pending User </MenuItem>
          </SubMenu>
          <MenuItem icon={<Calendar />}> Calendar </MenuItem>
          <MenuItem
            icon={<LayoutDashboard />}
            component={<Link href="/admin/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <SubMenu icon={<ShoppingBasket />} label="E-commarce">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu icon={<Users />} label="Users">
            <MenuItem> Active User </MenuItem>
            <MenuItem> Pending User </MenuItem>
            <MenuItem> Pending User </MenuItem>
          </SubMenu>
          <MenuItem icon={<Calendar />}> Calendar </MenuItem>
          <MenuItem
            icon={<LayoutDashboard />}
            component={<Link href="/admin/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <SubMenu icon={<ShoppingBasket />} label="E-commarce">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu icon={<Users />} label="Users">
            <MenuItem> Active User </MenuItem>
            <MenuItem> Pending User </MenuItem>
            <MenuItem> Pending User </MenuItem>
          </SubMenu>
          <MenuItem icon={<Calendar />}> Calendar </MenuItem>
          <MenuItem
            icon={<LayoutDashboard />}
            component={<Link href="/admin/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <SubMenu icon={<ShoppingBasket />} label="E-commarce">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu icon={<Users />} label="Users">
            <MenuItem> Active User </MenuItem>
            <MenuItem> Pending User </MenuItem>
            <MenuItem> Pending User </MenuItem>
          </SubMenu>
          <MenuItem icon={<Calendar />}> Calendar </MenuItem>
          <MenuItem
            icon={<LayoutDashboard />}
            component={<Link href="/admin/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <SubMenu icon={<ShoppingBasket />} label="E-commarce">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu icon={<Users />} label="Users">
            <MenuItem> Active User </MenuItem>
            <MenuItem> Pending User </MenuItem>
            <MenuItem> Pending User </MenuItem>
          </SubMenu>
          <MenuItem icon={<Calendar />}> Calendar </MenuItem>
          <MenuItem
            icon={<LayoutDashboard />}
            component={<Link href="/admin/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <SubMenu icon={<ShoppingBasket />} label="E-commarce">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu icon={<Users />} label="Users">
            <MenuItem> Active User </MenuItem>
            <MenuItem> Pending User </MenuItem>
            <MenuItem> Pending User </MenuItem>
          </SubMenu>
          <MenuItem icon={<Calendar />}> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default AdminAside;
