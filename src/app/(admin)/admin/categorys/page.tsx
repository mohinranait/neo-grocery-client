"use client";
import React, { useState } from "react";

const CategorisPage = () => {
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    parent: null,
  });

  return (
    <div>
      <div className="flex ">
        <div>
          <form action="">
            <div>
              <label
                htmlFor="category_name"
                className="text-gray-600 text-base"
              >
                Category Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="category_name"
                  name="name"
                  onChange={(e) =>
                    setCategory((prev) => ({ ...prev, name: e.target.value }))
                  }
                  value={category?.name}
                  className="w-full py-1  pl-2 pr-1 border-2 border-gray-200 rounded focus-visible:outline-primary"
                  placeholder="Name"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="category_slug"
                className="text-gray-600 text-base"
              >
                Slug Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="category_slug"
                  name="slug"
                  onChange={(e) =>
                    setCategory((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  value={category?.slug}
                  className="w-full py-1  pl-2 pr-1 border-2 border-gray-200 rounded focus-visible:outline-primary"
                  placeholder="Slug"
                />
              </div>
            </div>
          </form>
        </div>
        <div>table</div>
      </div>
    </div>
  );
};

export default CategorisPage;
