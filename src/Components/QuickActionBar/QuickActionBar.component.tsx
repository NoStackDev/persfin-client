import React, { useEffect, useMemo, useState } from "react";

import quickActions from "./quickActionBarConfig";
import QuickActionCard from "./Components/QuickActionCard";
import {
  FetchSavings,
  FetchInflows,
  FetchOutflows,
  FetchCategories,
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

type Category = {
  _id: string;
  title: string;
  categoryType: string;
  description: string;
};

const QuickActionBar = (props: Props) => {
  const userId = "636ac4a250bbc5afa6004a8c";

  const {
    isLoading: isLoadingSavingsData,
    isSuccess: isSuccessSavingsData,
    data: savingsData,
  } = FetchSavings(userId);

  const {
    isLoading: isLoadingInflowsData,
    isSuccess: isSuccessInflowsData,
    data: inflowsData,
  } = FetchInflows(userId);

  const {
    isLoading: isLoadingOutflowsData,
    isSuccess: isSuccessOutflowsData,
    data: outflowsData,
  } = FetchOutflows(userId);

  const {
    isLoading: isLoadingCategoriesData,
    isSuccess: isSuccessCategoriesData,
    data: categoriesData,
  } = FetchCategories(userId);

  const balance = useMemo(() => {
    return calculateBalance(savingsData, inflowsData, outflowsData);
  }, [savingsData, inflowsData, outflowsData]);

  const savingsTotal = useMemo(() => {
    return calculateSavings(savingsData);
  }, [savingsData]);

  const { inflowCategories, outflowCategories } = useMemo(() => {
    return countCategories(categoriesData);
  }, [categoriesData]);

  const getAmount = (title: string) => {
    switch (title.toLowerCase().trim()) {
      case "balance":
        return balance;
      case "savings":
        return savingsTotal;
      case "inflow":
        return inflowsData;
      case "outflow":
        return outflowsData;
      case "inflow categories":
        return inflowCategories;
      case "outflow categories":
        return outflowCategories;
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
                id={quickAction.id}
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
