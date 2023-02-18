import React, {
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./DateFilterDynamic.style.scss";


import { TimeRangeInterface } from "../../../TypeDefs";
import pb from "../../../lib/pocketbase";

type Props = {
  setFilterRange: React.Dispatch<SetStateAction<TimeRangeInterface | null>>;
};

type childProps = {
  value: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const CustomInput = forwardRef<HTMLButtonElement, childProps>(
  ({ value, onClick }, ref) => (
    <button className="custom-date-input"  ref={ref} onClick={onClick}>
      {value}
    </button>
  )
);

const DateFilterDynamic = ({ setFilterRange }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(pb.authStore.model?.created || Date.now())
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <div className="custom-date-container">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={
          <CustomInput
            value={startDate?.toDateString()}
            onClick={(e) => console.log(e)}
          />
        }
      />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={
          <CustomInput
            value={startDate?.toDateString()}
            onClick={(e) => console.log(e)}
          />
        }
      />
    </div>
  );
};

export default DateFilterDynamic;
