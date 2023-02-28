import React, { forwardRef, SetStateAction, useRef, useState } from "react";
import DateFilterDynamic from "../../../DateFiter/DateFilterDynamic";
import ModalContainer from "../ModalContainer";
import { TimeRangeInterface } from "../../../../TypeDefs";
import "./ModalDateFilter.style.scss";
import pb from "../../../../lib/pocketbase";
import DatePicker from "react-datepicker";
import { useOnClickOutside } from "../../../../Hooks";

type Props = {
  setFilterRange: React.Dispatch<SetStateAction<TimeRangeInterface | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomInput = forwardRef<HTMLButtonElement, childProps>(
  ({ value, onClick }, ref) => (
    <button className="custom-date-input" ref={ref} onClick={onClick}>
      {value}
    </button>
  )
);

type childProps = {
  value: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const ModalDateFilter = ({ setFilterRange, setShowModal }: Props) => {
  const [startDate, setStartDate] = useState<Date>(
    new Date(pb.authStore.model?.created || Date.now())
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const customDateContainerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(customDateContainerRef, setShowModal);

  const handleApplyClick = () => {
    setFilterRange({
      id: "custom",
      title: "Custom Date",
      range: () => {
        return { min: startDate, max: endDate };
      },
    });
    setShowModal(false);
  };

  return (
    <ModalContainer>
      <div className="custom-date-container" ref={customDateContainerRef}>
        <div>
          <span>from</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date || startDate)}
            customInput={
              <CustomInput
                value={startDate?.toDateString()}
                onClick={(e) => {}}
              />
            }
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          <span>to</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date || endDate)}
            customInput={
              <CustomInput
                value={endDate?.toDateString()}
                onClick={(e) => {}}
              />
            }
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <button onClick={handleApplyClick}>apply</button>
      </div>
    </ModalContainer>
  );
};

export default ModalDateFilter;
