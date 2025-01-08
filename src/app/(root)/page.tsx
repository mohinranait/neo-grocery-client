"use client";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function Home() {
  const [isShowPass, setIsShowPass] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(values);

      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="w-full h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full sm:max-w-[400px] relative bg-white rounded border border-gray-100 p-5">
        <div>
          <div className="w-[100px] h-[100px] left-2/4 -translate-x-2/4 absolute p-1 border border-gray-100 overflow-hidden rounded-full bg-white -top-12">
            <Image
              src={"/images/avater.jpg"}
              alt="Image"
              width={100}
              height={100}
              className="rounded-full bg-white"
            />
          </div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col pt-6 gap-4"
        >
          <div className="">
            <p className="text-lg font-semibold text-gray-900 ">Login</p>
            <p className="text-slate-600 ">
              This panel for admin or app authority
            </p>
          </div>
          <div>
            <label htmlFor="email" className="text-gray-600 text-base">
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute text-gray-500 left-2 top-2/4 -translate-y-2/4"
              />
              <input
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full py-1  pl-8 pr-1 border-2 border-gray-200 rounded focus-visible:outline-primary"
                placeholder="Email"
              />
            </div>
            {formik.errors.email && formik.touched.email ? (
              <p className="text-red-500 text-xs font-medium">
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="password" className="text-gray-600 text-base">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute text-gray-500 left-2 top-2/4 -translate-y-2/4"
              />
              {isShowPass ? (
                <EyeOff
                  onClick={() => setIsShowPass(false)}
                  size={18}
                  className="absolute text-gray-500 cursor-pointer right-2 top-2/4 -translate-y-2/4"
                />
              ) : (
                <Eye
                  onClick={() => setIsShowPass(true)}
                  size={18}
                  className="absolute text-gray-500 cursor-pointer right-2 top-2/4 -translate-y-2/4"
                />
              )}

              <input
                type={isShowPass ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full py-1 pl-8 pr-6 border-2 border-gray-200 rounded focus-visible:outline-primary"
                placeholder="Password"
              />
            </div>
            {formik.errors.password && formik.touched.password ? (
              <p className="text-red-500 text-xs font-medium">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <div className="flex justify-between">
            <Button className="px-6">Login</Button>
            <Link
              href={"/forgot"}
              className="text-nowrap text-gray-700 hover:underline"
            >
              Forgot password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
