import React, { SetStateAction, useEffect, useState } from "react";
import timeRange from "./dateFilterFixedConfig";

import "./DateFilterFixed.style.scss";

import { TimeRangeInterface } from "../../../TypeDefs";

type SetFilterRange = {
  setFilterRange: React.Dispatch<SetStateAction<TimeRangeInterface | null>>;
};

const DateFilterFixed = ({setFilterRange}: SetFilterRange) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<TimeRangeInterface>(
    timeRange[0]
  );

  useEffect(() => {
    setFilterRange(timeRange[0]);
  }, [setFilterRange]);

  const handleClick = (timeRangeObj: TimeRangeInterface) => {
    setSelectedOption(timeRangeObj);
    setFilterRange(timeRangeObj);
  };

  return (
    <div
      onClick={() => setShowOptions(!showOptions)}
      className="date-filter-fixed"
    >
      <div className="selected-option">{selectedOption.title}</div>
      {showOptions ? (
        <div className="filter-option-container">
          {timeRange.map((timeObj) => {
            return selectedOption.id === timeObj.id ? null : (
              <div
                onClick={() => handleClick(timeObj)}
                key={timeObj.id}
                className="filter-option"
              >
                {timeObj.title}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default DateFilterFixed;
