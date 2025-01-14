"use client";
import React, { useState } from "react";
import ImageCard from "./ImageCard";
import { X } from "lucide-react";
import ImageDetailsModal from "@/components/modals/ImageDetailsModal";

const MediaWrapper = () => {
  const [isUploadSection, setIsUploadSection] = useState<boolean>(false);
  const [imageDetails, setImageDetails] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3  items-center">
        <p className="text-xl font-medium">Media Library</p>
        <button
          onClick={() => setIsUploadSection(!isUploadSection)}
          className="py-1 px-2 text-sm rounded border border-primary text-primary"
        >
          Add new media file
        </button>
      </div>
      {isUploadSection && (
        <div className="relative h-[150px]">
          <span
            onClick={() => setIsUploadSection(false)}
            className="absolute h-[30px] w-[30px] top-3 right-3 cursor-pointer"
          >
            <X size={22} className="text-slate-700" />
          </span>
          <label
            htmlFor="upload_files"
            className="border-2 bg-white  h-[150px] w-full flex items-center justify-center border-slate-300 border-dashed"
          >
            <div className="border border-primary rounded py-1 px-2 cursor-pointer">
              Select files
            </div>
            <input type="file" hidden id="upload_files" />
          </label>
        </div>
      )}
      <div>
        <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {[1, 2, 3, 4, 5, 5, 6]?.map((image, index) => (
            <ImageCard
              key={index}
              onCallBack={() => {
                setImageDetails(index);
                setIsOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <ImageDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MediaWrapper;
