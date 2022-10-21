import React, { useEffect, useState } from "react";

import quickActions, { quickActionInterface } from "./quickActionBarConfig";
import QuickActionCard from "./Components/QuickActionCard.component";

import "./QuickActionBar.style.scss";
import { getActivities } from "../../Queries";

type Props = {};
type Transaction = {
  title: string;
  amount: number;
  transactionType: string;
  category: string;
  budget: string;
  description: string;
  receiptImage: string[];
}

const QuickActionBar = (props: Props) => {
  const [transactions, setTransactions] = useState<null|Array<Transaction>>(null)
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    (async () => {
      console.log("calling..");
      try {
        const data = await getActivities("634f17f5fbf2c4979f8839be");
        setTransactions(data?.data.data.transactions);
      } catch (err: any) {
        console.log(err.message);
      }
    })();
  }, []);

  const getAmount = (title: string) => {
    switch(title) {
      case 'balance':
        return balance
      default:
        return 0
    }
  }

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
