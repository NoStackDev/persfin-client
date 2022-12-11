import React, { useEffect, useMemo, useRef, useState } from "react";

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
import {
  CreateCategory,
  CreateInflow,
  CreateOutflow,
  CreateSavings,
} from "../../Mutations";
import Modal from "../Modal";
import Spinner from "../Spinners";
import { UseMutateFunction } from "react-query";

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
  const [showMainModal, setShowMainModal] = useState<boolean>(false);
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current || 0);
  }, []);

  // queries
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

  // mutations
  const mutationSavings = CreateSavings();
  const mutationInflow = CreateInflow();
  const mutationOutflow = CreateOutflow();
  const mutationCategory = CreateCategory();

  const mutations: Record<
    number,
    UseMutateFunction<any, unknown, any, unknown>
  > = {
    1: mutationSavings.mutate,
    2: mutationInflow.mutate,
    3: mutationOutflow.mutate,
    4: mutationCategory.mutate,
    5: mutationCategory.mutate,
  };

  let isLoading =
    mutationSavings.isLoading ||
    mutationInflow.isLoading ||
    mutationOutflow.isLoading ||
    mutationCategory.isLoading;
  let isError =
    mutationSavings.isError ||
    mutationInflow.isError ||
    mutationOutflow.isError ||
    mutationCategory.isError;
  let isSuccess =
    mutationSavings.isSuccess ||
    mutationInflow.isSuccess ||
    mutationOutflow.isSuccess ||
    mutationCategory.isSuccess;

  if (!showSpinner && isLoading) {
    setShowSpinner(true);
  }

  if (isSuccess || isError) {
    timerRef.current = window.setTimeout(() => {
      setShowSpinner(false);
      isSuccess = false;
      isError = false;
    }, 5000);
  }

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
    <>
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
                  setSelectedFormId={setSelectedFormId}
                  hasFixedDateFilter={quickAction.hasFixedDateFilter}
                  setShowMainModal={setShowMainModal}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </section>

      {showMainModal ? (
        <Modal
          quickActionId={selectedFormId}
          setShowMainModal={setShowMainModal}
          mutate={selectedFormId ? mutations[selectedFormId] : null}
        />
      ) : null}

      {showSpinner ? (
        <Spinner
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          message={quickActions[selectedFormId ? selectedFormId : 0]["title"]}
        />
      ) : null}
    </>
  );
};

export default QuickActionBar;
