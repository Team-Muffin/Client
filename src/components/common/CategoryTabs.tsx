import React from "react";

interface CategoryTabsProps {
  categories: string[];
  userCategory: string;
  handleUserCategoryClick: (selection: string) => void;
  width?: number;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  userCategory,
  handleUserCategoryClick,
  width,
}) => {
  const selectedUserCategoryCss = `px-[1.2vw] text-C333333 border-solid border-b-2 border-C748BFF w-[${width}vw] text-center`;
  const defaultUserCategoryCss = `px-[1.2vw] text-C333333  w-[${width}vw] text-center`;

  return (
    <div className="flex justify-around text-sm">
      {categories.map((cat, index) => (
        <p
          key={index}
          className={`${
            userCategory === cat
              ? selectedUserCategoryCss
              : defaultUserCategoryCss
          } cursor-pointer`}
          onClick={() => handleUserCategoryClick(cat)}
        >
          {cat}
        </p>
      ))}
    </div>
  );
};

export default CategoryTabs;
