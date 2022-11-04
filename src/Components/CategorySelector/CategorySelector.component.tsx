import React, { SetStateAction, useState } from "react";
import "./CategorySelector.style.scss";

type SetSelectedCategory = {
  setSelectedCategory: React.Dispatch<SetStateAction<string>>;
};

type Props = {};

const CategorySelector = ({ setSelectedCategory }: SetSelectedCategory) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("Outflow");

  const handleClick = (category: string) => {
    setSelectedOption(category);
    setSelectedCategory(category);
  };

  return (
    <div
      className="category-selector"
      onClick={() => setShowOptions(!showOptions)}
    >
      <div className="selected-option">{selectedOption}</div>
      <div className="options-container">
        {showOptions ? (
          selectedOption.toLowerCase().trim() === "outflow" ? (
            <div className="options" onClick={() => handleClick("Inflow")}>
              Inflow
            </div>
          ) : (
            <div className="options" onClick={() => handleClick("Outflow")}>
              Outflow
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default CategorySelector;
