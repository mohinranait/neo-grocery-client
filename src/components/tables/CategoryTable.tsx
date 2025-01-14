import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";
import { deleteCategory } from "@/actions/categoriesApi";
import DeleteModal from "../modals/DeleteModal";
import { useDispatch } from "react-redux";
import {
  addCategory,
  setSelectedCategory,
} from "@/redux/features/categorySlice";
import toast from "react-hot-toast";
import CategoryUpdateModal from "../modals/CategoryUpdateModal";

const CategoryTable = () => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const { categories, selectedCategory } = useAppSelector(
    (state) => state.category
  );

  // State for filters and pagination
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<"All" | "Active" | "Inactive">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  // Filtered categories based on name and status
  const filteredCategories = categories.filter((cat) => {
    const matchName = name
      ? cat.name.toLowerCase().includes(name.toLowerCase())
      : true;
    const matchStatus = status === "All" ? true : cat.status === status;
    return matchName && matchStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / perPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async () => {
    if (!selectedCategory?._id) return;

    try {
      setDeleteLoading(true);
      // Delete category by ID
      const data = await deleteCategory(`${selectedCategory?._id}`);

      if (data.success) {
        const updatedCategories = categories.filter(
          (cat) => cat._id !== selectedCategory?._id
        );
        // Updae UI
        dispatch(addCategory({ data: updatedCategories, type: "Array" }));
        toast.success("Category is deleted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
      dispatch(setSelectedCategory(null));
      setDeleteLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <p className="font-semibold tracking-tight text-xl">All Categories</p>
        <p className="text-sm text-muted-foreground">Manage your categories</p>
      </div>
      <div className="p-6 pt-0">
        <div className="mb-4 flex items-center gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Filter categories"
            className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as "Active" | "All" | "Inactive")
            }
          >
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-y-auto">
          <Table className="w-full border border-slate-100">
            <TableHeader>
              <TableRow>
                <TableHead className="h-10"></TableHead>
                <TableHead className="h-10">Category</TableHead>
                <TableHead className="h-10">Total</TableHead>
                <TableHead className="h-10">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCategories?.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="bg-slate-200 m-3 rounded p-3 text-center"
                  >
                    Data not found
                  </td>
                </tr>
              )}

              {paginatedCategories
                ?.filter((f) => f.parent == null)
                ?.map((cat, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Image
                            src={"/images/avater.jpg"}
                            className="w-[50] h-[50px] rounded"
                            width={50}
                            height={50}
                            alt="cat image"
                          />

                          <div>
                            <p>{cat?.name}</p>
                            <div className="flex mt-[2px] gap-1 items-center">
                              <span
                                onClick={() => {
                                  dispatch(setSelectedCategory(cat));
                                  setCategoryModal(true);
                                }}
                                className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary"
                              >
                                Edit
                              </span>
                              <span className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary">
                                View
                              </span>
                              <span
                                onClick={() => {
                                  dispatch(setSelectedCategory(cat));
                                  setIsOpen(true);
                                }}
                                className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary"
                              >
                                Delete
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>10 Product</TableCell>
                      <TableCell>
                        <div className="flex">
                          {cat?.status === "Active" ? (
                            <span className="inline-flex px-2 py-[2px] rounded bg-green-500 text-xs font-semibold text-white">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex px-2 py-[2px] rounded bg-red-500 text-xs font-semibold text-white">
                              Active
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {paginatedCategories
                      ?.filter((f) => f.parent == cat?._id)
                      ?.map((sub, i) => (
                        <TableRow key={i}>
                          <TableCell>-</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Image
                                src={"/images/avater.jpg"}
                                className="w-[50] h-[50px] rounded"
                                width={50}
                                height={50}
                                alt="cat image"
                              />

                              <div>
                                <p>{sub?.name}</p>
                                <div className="flex mt-[2px] gap-1 items-center">
                                  <span
                                    onClick={() => {
                                      dispatch(setSelectedCategory(sub));
                                      setCategoryModal(true);
                                    }}
                                    className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary"
                                  >
                                    Edit
                                  </span>
                                  <span className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary">
                                    View
                                  </span>
                                  <span
                                    onClick={() => {
                                      dispatch(setSelectedCategory(sub));
                                      setIsOpen(true);
                                    }}
                                    className="text-xs text-slate-500 hover:underline cursor-pointer hover:text-primary"
                                  >
                                    Delete
                                  </span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>10 Product</TableCell>
                          <TableCell>
                            <div className="flex">
                              {cat?.status === "Active" ? (
                                <span className="inline-flex px-2 py-[2px] rounded bg-green-500 text-xs font-semibold text-white">
                                  Active
                                </span>
                              ) : (
                                <span className="inline-flex px-2 py-[2px] rounded bg-red-500 text-xs font-semibold text-white">
                                  Active
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 pt-4">
          <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
        isLoading={deleteLoading}
      />
      <CategoryUpdateModal
        isOpen={categoryModal}
        setIsOpen={setCategoryModal}
      />
    </div>
  );
};

export default CategoryTable;
