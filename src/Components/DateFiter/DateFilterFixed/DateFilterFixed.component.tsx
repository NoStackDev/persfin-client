import React, { SetStateAction, useEffect, useRef, useState } from "react";
import createdRange from "./dateFilterFixedConfig";

import "./DateFilterFixed.style.scss";

import { TimeRangeInterface } from "../../../TypeDefs";
import { useOnClickOutside } from "../../../Hooks";
import Icons from "../../Icons";
import pb from "../../../lib/pocketbase";
import ModalDateFilter from "../../Modal/Components/ModalDateFilter";

type SetFilterRange = {
  setFilterRange: React.Dispatch<SetStateAction<TimeRangeInterface | null>>;
};

const DateFilterFixed = ({ setFilterRange }: SetFilterRange) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TimeRangeInterface>(
    createdRange[0]
  );
  const [customStartDate, setCustomStartDate] = useState<Date>(
    new Date(Number(pb.authStore.model?.created)) || new Date()
  );
  const [customEndDate, setCustomEndDate] = useState<Date>(new Date());
  const dateFilterFixedRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dateFilterFixedRef, setShowOptions);

  useEffect(() => {
    setFilterRange(createdRange[0]);
  }, [setFilterRange]);

  const handleClick = (
    createdRangeObj: TimeRangeInterface,
    id: string | null = null
  ) => {
    if (id && id === "custom") {
      setShowModal(true);
      setSelectedOption(createdRangeObj);
      setFilterRange(createdRangeObj);
      return
    }
    setSelectedOption(createdRangeObj);
    setFilterRange(createdRangeObj);
  };

  return (
    <>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className="date-filter-fixed"
        ref={dateFilterFixedRef}
      >
        <div className="selected-option">
          <div>{selectedOption.title}</div>
          <Icons icon={"expand_more"} showOptions={showOptions} />
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
            <div
              onClick={() =>
                handleClick({
                  id: "custom",
                  title: "Custom Date",
                  range: () => {
                    return { min: customStartDate, max: customEndDate };
                  },
                }, 'custom')
              }
              className="filter-option"
            >
              custom date
            </div>
          </div>
        ) : null}
      </div>
      {showModal ? <ModalDateFilter setFilterRange={setFilterRange} /> : null}
    </>
  );
};

export default DateFilterFixed;
