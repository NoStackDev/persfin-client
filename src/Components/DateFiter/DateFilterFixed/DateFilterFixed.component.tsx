import React, { SetStateAction, useEffect, useState } from "react";
import createdRange from "./dateFilterFixedConfig";

import "./DateFilterFixed.style.scss";

import { TimeRangeInterface } from "../../../TypeDefs";

type SetFilterRange = {
  setFilterRange: React.Dispatch<SetStateAction<TimeRangeInterface | null>>;
};

const DateFilterFixed = ({setFilterRange}: SetFilterRange) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<TimeRangeInterface>(
    createdRange[0]
  );

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
    >
      <div className="selected-option">{selectedOption.title}</div>
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
