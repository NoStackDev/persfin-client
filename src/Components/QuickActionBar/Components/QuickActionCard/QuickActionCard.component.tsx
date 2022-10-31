import React, { useEffect, useMemo, useState } from "react";

import DateFilterFixed from "../../../DateFiter/DateFilterFixed";
import "./QuickActionCard.style.scss";
import calculateFilteredAmount from "./helper";

type Props = {
  icon: string;
  title: string;
  showCurrency: boolean;
  amount: number | Transaction[] | null;
  hasBtn: boolean;
  btnText: string | null;
  hasFixedDateFilter: boolean;
};

type Transaction = {
  _id: string;
  title: string;
  amount: number;
  category: {
    _id: string;
    title: string;
    categoryType: string;
  };
  budget: string;
  description: string;
  receiptImage: string[];
  time: string;
  createdAt: Date;
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

const QuickActionCard = ({
  title,
  icon,
  showCurrency,
  amount,
  hasBtn,
  btnText,
  hasFixedDateFilter,
}: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [filteredDataArr, setFilteredDataArr] = useState<Transaction[] | null>(
    null
  );

  const filteredTotal = useMemo(
    () => calculateFilteredAmount(filteredDataArr),
    [filteredDataArr]
  );

  useEffect(() => {
    if (typeof amount === "object" && filterRange) {
      const filteredArr = amount?.filter((ele) => {
        const range = filterRange?.range();

        return (
          range.min <= new Date(Number(ele.time)) &&
          new Date(Number(ele.time)) <=
            new Date(
              range.max.getTime() +
                (1000 * 60 * 60 * 22 + 1000 * 60 * 59 + 1000 * 59)
            )
        );
      });
      setFilteredDataArr(filteredArr || null);
    }
  }, [filterRange, amount]);

  const filteredAmount = typeof amount === "number" ? amount : filteredTotal;

  return (
    <div className={"card " + title.toLowerCase()}>
      <div className="card-top">
        <div className={"icon-wrapper " + title.toLowerCase()}>
          <span className="material-icons ">{icon}</span>
        </div>
        {hasFixedDateFilter ? (
          <DateFilterFixed setFilterRange={setFilterRange} />
        ) : null}
      </div>

      <div className="action-info">
        <h2>{title}</h2>
        <h3 className="amount">
          {showCurrency ? <>&#x20A6;</> : null}{" "}
          {new Intl.NumberFormat().format(filteredAmount)}
        </h3>
      </div>
      {hasBtn ? (
        <button className={title.toLowerCase()}>{btnText}</button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuickActionCard;
