import React, { SetStateAction, useEffect, useRef, useState } from "react";
import createdRange from "./dateFilterFixedConfig";

import "./DateFilterFixed.style.scss";

import { TimeRangeInterface } from "../../../TypeDefs";
import { useOnClickOutside } from "../../../Hooks";
import Icons from "../../Icons";

type SetFilterRange = {
  setFilterRange: React.Dispatch<SetStateAction<TimeRangeInterface | null>>;
};

const DateFilterFixed = ({ setFilterRange }: SetFilterRange) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<TimeRangeInterface>(
    createdRange[0]
  );
  const dateFilterFixedRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dateFilterFixedRef, setShowOptions);

  useEffect(() => {
    setFilterRange(createdRange[0]);
  }, [setFilterRange]);

  const handleClick = (createdRangeObj: TimeRangeInterface) => {
    setSelectedOption(createdRangeObj);
    setFilterRange(createdRangeObj);
  };

  return (
    <div
      onClick={() => setShowOptions(!showOptions)}
      className="date-filter-fixed"
      ref={dateFilterFixedRef}
    >
      <div className="selected-option">
        <div>{selectedOption.title}</div>
        <Icons icon={"expand_more"} />
        {/* <span className={`material-icons ${showOptions ? "open" : null}`}>
          expand_more
        </span> */}
      </div>
      {showOptions ? (
        <div className="filter-option-container">
          {createdRange.map((createdObj) => {
            return selectedOption.id === createdObj.id ? null : (
              <div
                onClick={() => handleClick(createdObj)}
                key={createdObj.id}
                className="filter-option"
              >
                {createdObj.title}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default DateFilterFixed;
