import React, { useEffect, useMemo, useState } from "react";

import quickActions from "./quickActionBarConfig";
import QuickActionCard from "./Components/QuickActionCard.component";
import { getInflows, getOutflows, getSavings } from "../../Queries";
import calclulateBalance from "./helper"

import "./QuickActionBar.style.scss";

type Props = {};

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

type Savings = {
  _id: string;
  amount: number;
  time: string;
};

const QuickActionBar = (props: Props) => {
  const [savings, setSavings] = useState<Savings[] | null>(null);
  const [inflows, setInflows] = useState<Transaction[] | null>(null);
  const [outflows, setOutflows] = useState<Transaction[] | null>(null);

  const balance = useMemo(()=> {
     return calclulateBalance(savings, inflows, outflows)
  }, [savings, inflows, outflows])

  useEffect(() => {
    (async () => {
      try {
        const inflowsArr = await getInflows("635c5be0060a6ab16c47637f");
        const outflowsArr = await getOutflows("635c5be0060a6ab16c47637f");
        const savingsArr = await getSavings("635c5be0060a6ab16c47637f");

        setInflows(inflowsArr);
        setOutflows(outflowsArr);
        setSavings(savingsArr);
      } catch (err: any) {
        console.log(err.message);
      }
    })();
  }, []);

  console.log(inflows)

  const getAmount = (title: string) => {
    switch (title.toLowerCase()) {
      case "balance":
        return balance;
      case "savings":
        return 0;
      case "inflow":
        return inflows;
      case "outflow":
        return outflows;
      default:
        return 0;
    }
  };

  return (
    <section className="quick-action-bar">
      <div className="carousel-container">
        <div className="carousel">
          {quickActions.map((quickAction, index) => {
            return (
              <QuickActionCard
                icon={quickAction.icon}
                title={quickAction.title}
                hasBtn={quickAction.hasBtn}
                amount={getAmount(quickAction.title)}
                hasFixedDateFilter={quickAction.hasFixedDateFilter}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickActionBar;
