import React from "react";

const GeneralComponent = () => {
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center">
        <div className="w-[150px]">
          <label
            htmlFor="regularPrice"
            className="text-sm text-muted-foreground"
          >
            Regular Price (৳){" "}
          </label>
        </div>
        <div>
          <input
            id="regularPrice"
            type="text"
            className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Regular Price"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[150px]">
          <label htmlFor="sale_price" className="text-sm text-muted-foreground">
            Sale Price (৳){" "}
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            id="sale_price"
            type="text"
            className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Sale Price"
          />
          <span className="text-primary underline cursor-pointer text-sm">
            Schedule
          </span>
        </div>
      </div>
    </div>
  );
};

export default GeneralComponent;
