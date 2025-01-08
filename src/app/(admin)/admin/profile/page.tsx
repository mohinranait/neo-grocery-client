import { Button } from "@/components/ui/button";
import {
  Bell,
  CreditCard,
  Edit,
  Edit2,
  Lock,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfilePage = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className=" lg:min-w-[300px]  ">
          <div className="rounded-lg border bg-card text-card-foreground relative shadow">
            <ul className="p-6 pt-0 grid gap-5">
              <p className="text-xs px-3 py-1 rounded-xl bg-primary mt-3 font-semibold text-white absolute  text-center">
                Admin
              </p>
              <div className="py-5 border-b border-slate-100 px-2">
                <div className="w-[120px] h-[120px] mx-auto relative">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-slate-100 border shadow absolute bottom-4 -right-2 ring-2 ring-primary cursor-pointer ">
                    <Edit size={16} />
                  </span>
                  <Image
                    src={"/images/avater.jpg"}
                    width={120}
                    height={120}
                    alt="Avater"
                    className="w-[120px] h-[120px] ring-2 ring-offset-2 ring-primary rounded-full mx-auto"
                  />
                </div>

                <p className="text-lg mt-3  font-semibold text-gray-950  text-center">
                  Md. Mahir Shikder
                </p>
                <p className="text-sm text-gray-600 text-center">
                  mahir@gmail.com
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Link
                  href={"/"}
                  className="relative hover:bg-gray-100 cursor-pointer flex  select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
                >
                  <User size={16} />
                  My Profile
                </Link>

                <Link
                  href={"/"}
                  className="relative hover:bg-gray-100 cursor-pointer flex  select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
                >
                  <Lock size={16} />
                  Security
                </Link>

                <Link
                  href={"/"}
                  className="relative hover:bg-gray-100 cursor-pointer flex  select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
                >
                  <Bell size={16} />
                  Notification
                </Link>

                <Link
                  href={"/"}
                  className="relative hover:bg-gray-100 cursor-pointer flex  select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
                >
                  <CreditCard size={16} />
                  Billing
                </Link>

                <Link
                  href={"/"}
                  className="relative hover:bg-gray-100 cursor-pointer flex  select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
                >
                  <LogOut size={16} />
                  Logout
                </Link>
              </div>
            </ul>
          </div>
        </div>
        <div className=" lg:w-full flex flex-col gap-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex justify-between items-center">
                <p className="font-semibold leading-none tracking-tight">
                  Personal Information
                </p>
                <Button variant={"outline"} className="py-1 px-3 h-[30px]">
                  <Edit2 /> Edit
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-3 p-6 pt-0  pb-6">
              <div className="flex gap-3">
                <div className="min-w-[200px]">
                  <p className="text-slate-400 text-sm">First Name</p>
                  <p className="text-slate-800">Mohin </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Last Name</p>
                  <p className="text-slate-800">Rana </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[200px]">
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-slate-800">mahir@gmail.com </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <p className="text-slate-800">01728068200 </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex justify-between items-center">
                <p className="font-semibold leading-none tracking-tight">
                  Address
                </p>
                <Button variant={"outline"} className="py-1 px-3 h-[30px]">
                  <Edit2 /> Edit
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-3 p-6 pt-0  pb-6">
              <div className="flex gap-3">
                <div className="min-w-[200px]">
                  <p className="text-slate-400 text-sm">Country</p>
                  <p className="text-slate-800">Bangladesh </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">City/State</p>
                  <p className="text-slate-800">Dhaka </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[200px]">
                  <p className="text-slate-400 text-sm">Post Code</p>
                  <p className="text-slate-800">8700 </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">TAX ID</p>
                  <p className="text-slate-800">5454SF4 </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
