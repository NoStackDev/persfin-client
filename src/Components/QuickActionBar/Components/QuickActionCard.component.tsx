import React, { useEffect, useMemo, useState } from "react";

import DateFilterFixed from "../../DateFiter/DateFilterFixed";
import "./QuickActionCard.style.scss";
import calculateFilteredAmount from "./helper"

type Props = {
  icon: string;
  title: string;
  amount: number | Transaction[] | null;
  hasBtn: boolean;
  hasFixedDateFilter: boolean | undefined;
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
  amount,
  hasBtn,
  hasFixedDateFilter,
}: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface|undefined>(undefined)
  const [filteredDataArr, setFilteredDataArr] = useState<Transaction[] | undefined>(
    undefined
  );

const total = useMemo(()=> {
    return  calculateFilteredAmount(filteredDataArr)

  }, [filteredDataArr])
  
  useEffect(() => {
    if (typeof amount === 'object') {
    
      if (filterRange && amount) {
        const filteredArr = amount?.filter(ele => {
          const range = filterRange?.range()
          return new Date(`${range?.min.getFullYear()}-${range?.min.getMonth()}-${range?.min.getDate()}`) <= new Date(Number(ele.time)) && new Date(Number(ele.time)) <= new Date(`${range?.max.getFullYear()}-${range?.max.getMonth()}-${range?.max.getDate()}`)
        } )
        // console.log('filtered ', title, ': ', filteredArr)
        setFilteredDataArr(filteredArr)
      }
  
    }
  }, [filterRange])
  

  // console.log(title, ': ', total)

  const filteredAmount = typeof amount === "number" ? amount : 500;

  return (
    <div className={"card " + title.toLowerCase()}>
      <div className="card-top">
        <div className={"icon-wrapper " + title.toLowerCase()}>
          <span className="material-icons ">{icon}</span>
        </div>
        {hasFixedDateFilter ? <DateFilterFixed setFilterRange={setFilterRange}/> : <></>}
      </div>

      <div className="action-info">
        <h2>{title}</h2>
        <h3 className="amount">
          &#x20A6; {new Intl.NumberFormat().format(filteredAmount)}
        </h3>
      </div>
      {hasBtn ? (
        <button className={title.toLowerCase()}>Add {title}</button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuickActionCard;
