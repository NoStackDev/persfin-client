import React, { forwardRef, SetStateAction, useState } from "react";
import DateFilterDynamic from "../../../DateFiter/DateFilterDynamic";
import ModalContainer from "../ModalContainer";
import { TimeRangeInterface } from "../../../../TypeDefs";
import "./ModalDateFilter.style.scss";
import pb from "../../../../lib/pocketbase";
import DatePicker from "react-datepicker";

type Props = {
  setFilterRange: React.Dispatch<SetStateAction<TimeRangeInterface | null>>;
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

const ModalDateFilter = ({ setFilterRange }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(pb.authStore.model?.created || Date.now())
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <ModalContainer>
      <div className="custom-date-container">
        <div>
        <span>from</span>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
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
          onChange={(date) => setEndDate(date)}
          customInput={
            <CustomInput value={endDate?.toDateString()} onClick={(e) => {}} />
          }
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        </div>
        <button>apply</button>
        
      </div>
    </ModalContainer>
  );
};

export default ModalDateFilter;
