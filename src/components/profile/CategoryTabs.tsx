import React from "react";

interface CategoryTabsProps {
  categories: string[];
  userCategory: string;
  handleUserCategoryClick: (selection: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  userCategory,
  handleUserCategoryClick,
}) => {
  const selectedUserCategoryCss =
    "px-[1.2vw] text-C333333 border-solid border-b-2 border-C748BFF";
  const defaultUserCategoryCss = "px-[1.2vw] text-C333333";

  return (
    <div className="flex justify-around text-sm">
      {categories.map((cat) => (
        <p
          key={cat}
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
