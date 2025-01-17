import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppSelector } from "@/hooks/useRedux";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from "@/components/forms/CategoryForm";

type TBuildTree = {
  _id: string;
  name: string;
  parent: string;
};

export type TTreeNode = TBuildTree & {
  children?: TBuildTree[];
  createdAt?: string;
};

function buildTree(items: TBuildTree[]): TTreeNode[] {
  const map = new Map();
  items?.forEach((item) => {
    map.set(item?._id, { ...item, children: [] });
  });

  const result: TTreeNode[] = [];

  items?.forEach((item) => {
    if (item.parent) {
      const parent = map.get(item.parent);
      if (parent) {
        parent?.children.push(map.get(item._id));
      }
    } else {
      result.push(map.get(item._id));
    }
  });

  return result;
}

const ManageCategory = () => {
  const { categories } = useAppSelector((state) => state.category);

  // Local State
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<TTreeNode[]>([]);

  useEffect(() => {
    const formate = categories?.map((d) => ({
      _id: d?._id,
      name: d.name,
      parent: d.parent,
    }));

    const categoryFormateForTree = buildTree(formate as TBuildTree[]);

    setShowCategories(categoryFormateForTree);
  }, [categories]);

  const renderCategories = (categories: TTreeNode[], level = 0) => {
    return categories.map((category, index) => {
      const id = `level_${level}_cat_${category._id}`;
      return (
        <React.Fragment key={category._id}>
          <li className={`flex pl-${level * 4} items-center space-x-2`}>
            <Checkbox id={id} />
            <label
              htmlFor={id}
              className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category.name}
            </label>
          </li>
          {category.children &&
            category.children.length > 0 &&
            renderCategories(category.children, level + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <React.Fragment>
      <div className=" bg-white rounded border border-l-slate-100 bg-card text-card-foreground ">
        <div className="py-2 px-4 border-b border-l-slate-200">
          <p className="text-base font-semibold">Categorys</p>
        </div>
        <div className="px-4 py-2 space-y-4">
          <div className="max-h-[200px] overflow-y-auto border border-slate-200 p-3">
            <ul className="space-y-2  ">{renderCategories(showCategories)}</ul>
          </div>
        </div>
        <div className="px-4 py-2 border-t border-slate-100">
          <Button
            type="button"
            variant={"secondary"}
            className="px-3 h-[30px] hover:underline rounded-xl flex "
            onClick={() => setOpenForm(!openForm)}
          >
            <Plus />
            Add Category
          </Button>
        </div>
      </div>

      <Dialog onOpenChange={setOpenForm} open={openForm}>
        <DialogContent className="w-[350px]">
          <DialogHeader>
            <DialogTitle>Create new Category </DialogTitle>
            <DialogDescription>You want to create a category</DialogDescription>
          </DialogHeader>
          <DialogDescription>
            <CategoryForm closeModal={setOpenForm} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ManageCategory;
