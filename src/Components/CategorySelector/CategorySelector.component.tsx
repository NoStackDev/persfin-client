import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../Hooks";
import Icons from "../Icons";
import "./CategorySelector.style.scss";

type Props = {
  categories: string[] | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
};

const CategorySelector = ({ categories, setSelectedCategory }: Props) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const categorySelectorRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(categorySelectorRef, setShowOptions);

  const handleClick = (category: string) => {
    setSelectedOption(category);
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (categories && categories.length > 0 && !selectedOption) {
      setSelectedOption(
        categories[0].charAt(0).toUpperCase() +
          categories[0].substring(1).toLowerCase()
      );
      setSelectedCategory(categories[0]);
    }
  }, [categories, setSelectedCategory, selectedOption]);

  return (
    <div
      className="category-selector"
      onClick={() => setShowOptions(!showOptions)}
      ref={categorySelectorRef}
    >
      <div className="selected-option">
        <div>
          {selectedOption
            ? (selectedOption?.split("")[0].toLocaleUpperCase() || "") +
              selectedOption?.slice(1)
            : null}
        </div>
        <Icons
          icon={"expand_more"}
          maxWidth={"24px"}
          showOptions={showOptions}
        />
      </div>

      {showOptions ? (
        <div className="options-container">
          {categories?.map((category, index) => {
            return category.toLowerCase() !== selectedOption?.toLowerCase() ? (
              <div
                className="options"
                onClick={() => handleClick(category)}
                key={index}
              >
                {category.charAt(0).toUpperCase() +
                  category.substring(1).toLowerCase()}
              </div>
            ) : null;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default CategorySelector;
