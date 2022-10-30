import React, { useEffect, useMemo, useState } from "react";

import quickActions from "./quickActionBarConfig";
import QuickActionCard from "./Components/QuickActionCard";
import {
  getInflows,
  getOutflows,
  getSavings,
  getCategories,
} from "../../Queries";
import { calculateBalance, calculateSavings, countCategories } from "./helper";

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

type Category = {
  _id: string;
  title: string;
  categoryType: string;
  description: string;
};

const QuickActionBar = (props: Props) => {
  const [savings, setSavings] = useState<Savings[] | null>(null);
  const [inflows, setInflows] = useState<Transaction[] | null>(null);
  const [outflows, setOutflows] = useState<Transaction[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const balance = useMemo(() => {
    return calculateBalance(savings, inflows, outflows);
  }, [savings, inflows, outflows]);

  const savingsTotal = useMemo(() => {
    return calculateSavings(savings);
  }, [savings]);

  const {inflowCategories, outflowCategories} = useMemo(()=> {
    return countCategories(categories)
  }, [categories])

  useEffect(() => {
    (async () => {
      try {
        const inflowsArr = await getInflows("635c5be0060a6ab16c47637f");
        const outflowsArr = await getOutflows("635c5be0060a6ab16c47637f");
        const savingsArr = await getSavings("635c5be0060a6ab16c47637f");
        const categoriesArr = await getCategories("635c5be0060a6ab16c47637f");

        setInflows(inflowsArr);
        setOutflows(outflowsArr);
        setSavings(savingsArr);
        setCategories(categoriesArr);
      } catch (err: any) {
        console.log(err.message);
      }
    })();
  }, []);

  const getAmount = (title: string) => {
    switch (title.toLowerCase().trim()) {
      case "balance":
        return balance;
      case "savings":
        return savingsTotal;
      case "inflow":
        return inflows;
      case "outflow":
        return outflows;
      case "inflow categories":
        return inflowCategories
      case "outflow categories":
        return outflowCategories
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
                showCurrency={quickAction.showCurrency}
                amount={getAmount(quickAction.title)}
                hasBtn={quickAction.hasBtn}
                btnText={quickAction.btnText}
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
