import React, { useRef, useState } from "react";
import timeRange from "./dateFilterFixedConfig";

import "./DateFilterFixed.style.scss";

type Props = {};

interface rangeInterface {
  min: number;
  max: number;
}

const DateFilterFixed = (props: Props) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleClick = ({ min, max }: rangeInterface) => {
    console.log("min: ", new Date(min));
    console.log("max: ", new Date(max));
  };

  return (
    <div
      onClick={() => setShowOptions(!showOptions)}
      className="date-filter-fixed"
    >
      <div className="selected-option">Last Month</div>
      {showOptions ? (
        <div className="filter-option-container">
          {timeRange.map((timeObj, index) => {
            return (
              <div
                onClick={() => handleClick(timeObj.range())}
                key={index}
                className="filter-option"
              >
                {timeObj.title}
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DateFilterFixed;
