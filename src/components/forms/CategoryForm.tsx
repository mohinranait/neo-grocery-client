"use client";
import { UploadCloudIcon } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createNewCategory } from "@/actions/categoriesApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCategory } from "@/redux/features/categorySlice";

// Category schema validation
const categorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum length 2 characters")
    .max(60, "Maximum length 60 characters")
    .required("Required field"),

  parent: Yup.string().notRequired(),
  catBanner: Yup.string().notRequired(),
  catThumbnail: Yup.mixed().notRequired(),
  catIcon: Yup.string().notRequired(),
});

const CategoryForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      parent: "",
      catBanner: "",
      catThumbnail: null,
      catIcon: "",
    },
    enableReinitialize: true,
    validationSchema: categorySchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await createNewCategory({ ...values, status: "Active" });
        if (data.success) {
          dispatch(addCategory({ data: data?.payload, type: "Single" }));
          toast.success("Category is created");
          resetForm();
        }
      } catch (error) {}
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="p-6 pt-0 grid gap-5">
      <div className="grid gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Category name
        </label>
        <input
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Name"
        />
        {formik.errors.name && formik.touched.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="slug"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Category slug
        </label>
        <input
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          id="slug"
          name="slug"
          placeholder="Slug"
        />
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="parent_id"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Parent
        </label>
        <Select
          onValueChange={(value) => formik.setFieldValue("parent", value)}
          value={formik.values.parent}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light" className="cursor-pointer">
              Light
            </SelectItem>
            <SelectItem value="dark" className="cursor-pointer">
              - Dark
            </SelectItem>
            <SelectItem value="system" className="cursor-pointer">
              System
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="thumbnail"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Thumbnail
        </label>
        <div className="flex gap-4">
          <div className="w-[80px] h-[80px] flex items-center justify-center border border-dashed rounded cursor-pointer hover:bg-slate-200">
            {/* {thumbnailPreview ? (
              <Image
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover rounded"
              />
            ) : ( */}
            <UploadCloudIcon />
            {/* )} */}
          </div>
        </div>
      </div>
      <div className="flex items-center p-6 pt-0">
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
          Save
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
