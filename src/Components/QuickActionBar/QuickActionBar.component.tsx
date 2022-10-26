import React, { useEffect, useMemo, useState } from "react";

import quickActions from "./quickActionBarConfig";
import QuickActionCard from "./Components/QuickActionCard.component";
import { getActivities } from "../../Queries";
import calculateAmount from "./helper/calculateAmount";

import "./QuickActionBar.style.scss";

type Props = {};

type Transaction = {
  title: string;
  amount: number;
  transactionType: string;
  category: string;
  budget: string;
  description: string;
  receiptImage: string[];
  createdAt: Date;
};

const QuickActionBar = (props: Props) => {
  const [transactions, setTransactions] = useState<null | Array<Transaction>>(
    null
  );

  const { balance, savings, inflow, outflow } = useMemo(
    () => calculateAmount(transactions),
    [transactions]
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await getActivities("634f17f5fbf2c4979f8839be");
        setTransactions(data?.data.data.transactions);
      } catch (err: any) {
        console.log(err.message);
      }
    })();
  }, []);

  const getAmount = (title: string) => {
    switch (title.toLowerCase()) {
      case "balance":
        return balance;
      case "savings":
        return savings;
      case "inflow":
        return inflow;
      case "outflow":
        return outflow;
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
