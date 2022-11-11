import React, { SetStateAction, useRef, useState } from "react";

import "./DateFilterDynamic.style.scss";

type Props = {
  setFilterRange: React.Dispatch<SetStateAction<TimeRangeInterface | null>>;
};

interface rangeInterface {
  min: Date;
  max: Date;
}

interface TimeRangeInterface {
  id: string;
  title: string;
  range(): rangeInterface;
}

const DateFilterDynamic = ({ setFilterRange }: Props) => {
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const startRef = useRef<HTMLInputElement | null>(null);
  const endRef = useRef<HTMLInputElement | null>(null);

  const handleOnChange = () => {
    if (startRef.current?.value && endRef.current?.value) {
      const startValue = startRef.current.value;
      const endValue = endRef.current.value;
      setStart(startValue);
      setEnd(endValue);
      setFilterRange({
        id: startValue + endValue,
        title: startValue + " to " + endValue,
        range: () => {
          return {
            min: new Date(startValue),
            max: new Date(endValue),
          };
        },
      });
    }
  };

  return (
    <div className="date-selector">
      <input
        type="date"
        name=""
        id=""
        ref={startRef}
        onChange={handleOnChange}
      />
      <span> - </span>
      <input type="date" name="" id="" ref={endRef} onChange={handleOnChange} />
    </div>
  );
};

export default DateFilterDynamic;
